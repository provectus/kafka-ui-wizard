import ShortUniqueId from 'short-unique-id';
import type { ClusterConfiguration } from 'src/lib/clusterConfigurationSchema';
import { derived, writable } from 'svelte/store';

const LOCAL_STORAGE_KEY = 'uiForApacheKafkaWizard';

export const NEW_CLUSTER_CONFIG: ClusterConfiguration = {
  clusterName: '',
  readonly: false,
  bootstrapServers: [
    {
      host: '',
      port: 9092
    }
  ],
  sharedConfluentCloudCluster: false,
  securedWithSSL: false,
  selfSignedCA: false,
  selfSignedCASsl: {},
  authMethod: 'None',
  saslJaasConfig: undefined,
  saslMechanism: undefined,
  saslSSL: {},
  useSpecificIAMProfile: false,
  IAMProfile: undefined,
  kerberosServiceName: undefined,
  schemaRegistryEnabled: false,
  schemaRegistryURL: undefined,
  schemaRegistrySecuredWithAuth: false,
  schemaRegistryUsername: undefined,
  schemaRegistryPassword: undefined,
  kafkaConnects: [],
  jmxEnabled: false,
  jmxPort: undefined,
  jmxSslEnabled: false,
  jmxSsl: {},
  jmxSecuredWithAuth: false,
  jmxUsername: undefined,
  jmxPassword: undefined
};

const generateUniqId = new ShortUniqueId({ length: 6 });

interface ClusterConfigurationEntity extends ClusterConfiguration {
  id: string;
}

let stored: ClusterConfigurationEntity[] = [];
try {
  const storedString = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedString) {
    stored = JSON.parse(storedString);
  }
} catch (e) {
  // do nothing
}

const { update, subscribe } = writable<ClusterConfigurationEntity[]>(stored);

const clustersStore = {
  subscribe,
  addNew: (newItem: ClusterConfiguration) =>
    update((items) => [...items, { ...newItem, id: generateUniqId() }]),
  copy: (clusterId: string) => {
    const id = generateUniqId();
    update((items) => {
      const itemToCopy = items.find(({ id }) => id === clusterId);
      if (itemToCopy) {
        const clusterName = `${itemToCopy.clusterName}_${generateUniqId()}`;
        return [...items, { ...itemToCopy, id, clusterName }];
      }
      return items;
    });
    return id;
  },
  remove: (id: string) => update((items) => items.filter((item) => item.id !== id)),
  update: (id: string, updatedItem: ClusterConfiguration) =>
    update((items) => items.map((item) => (item.id === id ? { ...updatedItem, id } : item)))
};

clustersStore.subscribe((value) => {
  localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(value);
});

export const paramsStore = derived(clustersStore, ($clusters) => {
  const env: Record<string, string | undefined> = {};
  const javaOpts: string[] = [];
  const volumes: string[] = [];

  $clusters.forEach((cl, index) => {
    const propertyPrefix = `KAFKA_CLUSTERS_${index}`;
    env[`${propertyPrefix}_NAME`] = cl.clusterName;
    if (cl.readonly) {
      env[`${propertyPrefix}_READONLY`] = 'true';
    }
    const bootstrapServers = cl.bootstrapServers
      .map(({ host, port }) => `${host}:${port}`)
      .join(',');
    env[`${propertyPrefix}_BOOTSTRAPSERVERS`] = bootstrapServers;

    // SSL
    if (cl.securedWithSSL) {
      env[`${propertyPrefix}_PROPERTIES_SECURITY_PROTOCOL`] = 'SSL';
      if (cl.selfSignedCA) {
        const selfSignedCAPrefix = `${propertyPrefix}__PROPERTIES_SSL`;
        const { truststoreLocation, truststorePassword, keystoreLocation, keystorePassword } =
          cl.selfSignedCASsl;
        env[`${selfSignedCAPrefix}_TRUSTSTORE_LOCATION`] = truststoreLocation;
        env[`${selfSignedCAPrefix}_TRUSTSTORE_PASSWORD`] = truststorePassword;
        env[`${selfSignedCAPrefix}_KEYSTORE_LOCATION`] = keystoreLocation;
        env[`${selfSignedCAPrefix}_KEYSTORE_PASSWORD`] = keystorePassword;
      }
    }

    // Auth
    if (cl.authMethod === 'SASL_PLAINTEXT') {
      const saslAuthPrefix = `${propertyPrefix}__PROPERTIES_SASL`;
      env[`${saslAuthPrefix}_MECHANISM}`] = cl.saslMechanism;
      if (cl.saslMechanism === 'GSSAPI') {
        env[`${saslAuthPrefix}_KERBEROS_SERVICE_NAME`] = cl.kerberosServiceName;
      }
      if (cl.saslMechanism === 'AWS_MSK_IAM') {
        env[`${saslAuthPrefix}_CLIENT_CALLBACK_HANDLER_CLASS`] =
          'software.amazon.msk.auth.iam.IAMClientCallbackHandler';
        if (cl.useSpecificIAMProfile) {
          env[
            `${saslAuthPrefix}_JAAS_CONFIG`
          ] = `software.amazon.msk.auth.iam.IAMLoginModule required awsProfileName="${cl.IAMProfile}"`;
        }
      } else {
        env[`${saslAuthPrefix}_JAAS_CONFIG`] = cl.saslJaasConfig;
      }
    }

    // Schema Registry
    if (cl.schemaRegistryEnabled) {
      env[`${propertyPrefix}_SCHEMAREGISTRY`] = cl.schemaRegistryURL;
      if (cl.schemaRegistrySecuredWithAuth) {
        const schemaRegistryAuthPrefix = `${propertyPrefix}_SCHEMAREGISTRYAUTH`;
        env[`${schemaRegistryAuthPrefix}_USERNAME`] = cl.schemaRegistryUsername;
        env[`${schemaRegistryAuthPrefix}_PASSWORD`] = cl.schemaRegistryPassword;
      }
    }

    // Kafka Connect
    cl.kafkaConnects.forEach((connect, idx) => {
      const connectPrefix = `${propertyPrefix}_KAFKACONNECT_${idx}`;
      env[`${connectPrefix}_NAME`] = connect.name;
      env[`${connectPrefix}_ADDRESS`] = connect.url;
      if (connect.securedWithAuth) {
        env[`${connectPrefix}_USERNAME`] = connect.username;
        env[`${connectPrefix}_PASSWORD`] = connect.password;
      }
    });

    if (cl.jmxEnabled) {
      env[`${propertyPrefix}_JMXPORT`] = `${cl.jmxPort}`;

      if (cl.jmxSslEnabled) {
        env[`${propertyPrefix}_JMXSSL`] = 'true';
        volumes.push(`./jmx/clienttruststore:${cl.jmxSsl.truststoreLocation}`);
        javaOpts.push(`-Djavax.net.ssl.trustStore=${cl.jmxSsl.truststoreLocation}`);
        javaOpts.push(`-Djavax.net.ssl.trustStorePassword=${cl.jmxSsl.truststorePassword}`);

        volumes.push(`./jmx/clientkeystore:${cl.jmxSsl.keystoreLocation}`);
        javaOpts.push(`-Djavax.net.ssl.keyStore=${cl.jmxSsl.keystoreLocation}`);
        javaOpts.push(`-Djavax.net.ssl.keyStorePassword=${cl.jmxSsl.keystorePassword}`);
      }
      if (cl.jmxSecuredWithAuth) {
        env[`${propertyPrefix}_JMXUSERNAME`] = cl.jmxUsername;
        env[`${propertyPrefix}_JMXPASSWORD`] = cl.jmxPassword;
      }
    }
  });

  return {
    env,
    javaOpts,
    volumes
  };
});

export default clustersStore;
