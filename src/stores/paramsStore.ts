import { derived } from 'svelte/store';
import clustersStore from './clustersStore';

export const paramsStore = derived(clustersStore, ($clusters) => {
  const env: Record<string, string | undefined | number> = {};
  const javaOpts: string[] = [];
  const volumes: string[] = [];

  $clusters.forEach((cl, index) => {
    const propertyPrefix = `KAFKA_CLUSTERS_${index}`;
    env[`${propertyPrefix}_NAME`] = cl.clusterName;
    if (cl.readonly) {
      env[`${propertyPrefix}_READONLY`] = 'true';
    }
    if (cl.sharedConfluentCloudCluster) {
      env[`${propertyPrefix}_DISABLELOGDIRSCOLLECTION`] = 'true';
    }
    const bootstrapServers = cl.bootstrapServers
      .map(({ host, port }) => `${host}:${port}`)
      .join(',');
    env[`${propertyPrefix}_BOOTSTRAPSERVERS`] = bootstrapServers;

    // SSL
    if (cl.securedWithSSL) {
      env[`${propertyPrefix}_PROPERTIES_SECURITY_PROTOCOL`] = 'SSL';
    }

    const selfSignedCAPrefix = `${propertyPrefix}_PROPERTIES_SSL`;
    const { truststoreLocation, truststorePassword, keystoreLocation, keystorePassword } =
      cl.selfSignedCASsl;
    env[`${selfSignedCAPrefix}_TRUSTSTORE_LOCATION`] = truststoreLocation;
    env[`${selfSignedCAPrefix}_TRUSTSTORE_PASSWORD`] = truststorePassword;
    env[`${selfSignedCAPrefix}_KEYSTORE_LOCATION`] = keystoreLocation;
    env[`${selfSignedCAPrefix}_KEYSTORE_PASSWORD`] = keystorePassword;

    // Auth
    if (cl.authMethod !== 'None') {
      env[`${propertyPrefix}_PROPERTIES_SECURITY_PROTOCOL`] = cl.authMethod;
    }

    const saslAuthPrefix = `${propertyPrefix}_PROPERTIES_SASL`;
    env[`${saslAuthPrefix}_MECHANISM`] = cl.saslMechanism;
    env[`${saslAuthPrefix}_KERBEROS_SERVICE_NAME`] = cl.kerberosServiceName;
    env[`${saslAuthPrefix}_JAAS_CONFIG`] = cl.saslJaasConfig;

    if (cl.saslMechanism === 'AWS_MSK_IAM') {
      env[`${saslAuthPrefix}_CLIENT_CALLBACK_HANDLER_CLASS`] =
        'software.amazon.msk.auth.iam.IAMClientCallbackHandler';
      if (cl.IAMProfile) {
        const profile = `software.amazon.msk.auth.iam.IAMLoginModule required awsProfileName="${cl.IAMProfile}"`;
        env[`${saslAuthPrefix}_JAAS_CONFIG`] = profile;
      }
    }

    // Schema Registry
    env[`${propertyPrefix}_SCHEMAREGISTRY`] = cl.schemaRegistryURL;
    env[`${propertyPrefix}_SCHEMAREGISTRYAUTH_USERNAME`] = cl.schemaRegistryUsername;
    env[`${propertyPrefix}_SCHEMAREGISTRYAUTH_PASSWORD`] = cl.schemaRegistryPassword;

    // Kafka Connect
    cl.kafkaConnects.forEach((connect, idx) => {
      const connectPrefix = `${propertyPrefix}_KAFKACONNECT_${idx}`;
      env[`${connectPrefix}_NAME`] = connect.name;
      env[`${connectPrefix}_ADDRESS`] = connect.url;
      env[`${connectPrefix}_USERNAME`] = connect.username;
      env[`${connectPrefix}_PASSWORD`] = connect.password;
    });

    env[`${propertyPrefix}_JMXPORT`] = cl.jmxPort;

    if (cl.jmxSslEnabled) {
      env[`${propertyPrefix}_JMXSSL`] = 'true';

      volumes.push(`./jmx/clienttruststore:${cl.jmxSsl.truststoreLocation}`);
      javaOpts.push(`-Djavax.net.ssl.trustStore=${cl.jmxSsl.truststoreLocation}`);
      javaOpts.push(`-Djavax.net.ssl.trustStorePassword=${cl.jmxSsl.truststorePassword}`);

      volumes.push(`./jmx/clientkeystore:${cl.jmxSsl.keystoreLocation}`);
      javaOpts.push(`-Djavax.net.ssl.keyStore=${cl.jmxSsl.keystoreLocation}`);
      javaOpts.push(`-Djavax.net.ssl.keyStorePassword=${cl.jmxSsl.keystorePassword}`);
    }
    env[`${propertyPrefix}_JMXUSERNAME`] = cl.jmxUsername;
    env[`${propertyPrefix}_JMXPASSWORD`] = cl.jmxPassword;
  });

  return {
    env,
    javaOpts,
    volumes
  };
});
