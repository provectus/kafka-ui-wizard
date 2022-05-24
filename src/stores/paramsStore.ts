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

export const dockerCommandStore = derived(paramsStore, ({ env, javaOpts, volumes }) => {
  let cmd = 'docker run -p 8080:8080 \\\n';
  cmd += '\t\t-d provectuslabs/kafka-ui:latest \\\n';

  Object.entries(env).forEach(([key, value]) => {
    if (value !== undefined) {
      cmd += `\t\t-e ${key}=${value} \\\n`;
    }
  });

  if (javaOpts.length > 0) {
    cmd += `\t\t-e JAVA_OPTS="\\\n`;
    javaOpts.forEach((opt) => (cmd += `\t\t\t${opt} \\\n`));
    cmd += `\t\t"\\\n`;
  }

  if (volumes.length > 0) {
    volumes.forEach((volume) => (cmd += `\t\t-v ${volume} \\\n`));
  }

  return cmd;
});

export const dockerComposeStore = derived(paramsStore, ({ env, javaOpts, volumes }) => {
  let cmd = `---
version: '2'
services:
  kafka-ui:
    container_name: kafka-ui
    image: provectuslabs/kafka-ui:latest
    ports:
      - 8080:8080
    depends_on:
      - kafka-connect0
    environment:
`;

  Object.entries(env).forEach(([key, value]) => {
    if (value !== undefined) {
      cmd += `      ${key}:${value}\n`;
    }
  });

  if (javaOpts.length > 0) {
    cmd += `      JAVA_OPTS:>-\n`;
    javaOpts.forEach((opt) => (cmd += `        ${opt}\n`));
  }

  if (volumes.length > 0) {
    cmd += `    volumes:\n`;
    volumes.forEach((volume) => (cmd += `      - ${volume}\n`));
  }

  return cmd;
});
