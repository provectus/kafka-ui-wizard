import yup from '$lib/yupExtended';

const { string, object, number, boolean, array } = yup;

const portSchema = number()
  .max(65535, '65535 is the max')
  .positive('positive only')
  .required('required');

export const bootstrapServerSchema = object({
  host: string().label('host').required('required'),
  port: portSchema
});

export const sslSchema = object().shape({ 
  truststoreLocation: string().label('Truststore location').required(),
  truststorePassword: string().label('Truststore password').required(),
  keystoreLocation: string().label('Keystore location')
    .when(['keystoreKeyPassword','keystorePassword'], {
      is: (a:string, b:string) => 
        a.length > 0 || b.length > 0,
      then: (s) => s.required()
    }),
  keystorePassword: string().label('Keystore password')
    .when(['keystoreLocation','keystoreKeyPassword'], {
      is: (a:string, b:string) => 
        a.length > 0 || b.length > 0,
      then: (s) => s.required()
    }),
  keystoreKeyPassword: string().label('Keystore key password')
    .when(['keystoreLocation','keystorePassword'], {
      is: (a:string, b:string) => 
        a.length > 0 || b.length > 0,
      then: (s) => s.required()
    }),
},
[
  ["keystoreKeyPassword", "keystorePassword"], 
  ["keystoreLocation", "keystoreKeyPassword"], 
  ["keystoreLocation", "keystorePassword"]
]
);

export const kafkaConnectSchema = object({
  name: string().required(),
  url: string().label('URL').required(),
  securedWithAuth: boolean().required(),
  username: string()
    .label('Username')
    .when('securedWithAuth', {
      is: true,
      then: (s) => s.required()
    }),
  password: string()
    .label('Password')
    .when('securedWithAuth', {
      is: true,
      then: (s) => s.required()
    })
});

const clusterConfigurationSchema = object({
  clusterName: string().label('Cluster name').required().min(3).uniqClusterName(),
  readonly: boolean().required().default(false),
  bootstrapServers: array().of(bootstrapServerSchema).min(1).required(),
  sharedConfluentCloudCluster: boolean().required().default(false),
  securedWithSSL: boolean().required().default(false),
  selfSignedCA: boolean().default(false),
  selfSignedCASsl: object().when('selfSignedCA', {
    is: true,
    then: sslSchema.required()
  }),
  authMethod: string().required().oneOf(['None', 'SASL_SSL', 'SASL_PLAINTEXT']),
  saslMechanism: string()
    .label('sasl_mechanism')
    .when('authMethod', {
      is: 'SASL_SSL',
      then: (s) =>
        s.required().oneOf(['AWS_MSK_IAM', 'SCRAM-SHA-256', 'SCRAM-SHA-512', 'GSSAPI'])
    }),
  saslJaasConfig: string()
    .label('sasl.jaas.config')
    .when(['authMethod', 'saslMechanism'], {
      is: (authMethod: string, saslMechanism: string) =>
      authMethod === 'SASL_PLAINTEXT' || 
      authMethod === 'SASL_SSL' && 
      (
        saslMechanism === 'SCRAM-SHA-256' || 
        saslMechanism === 'SCRAM-SHA-512'
      ),
      then: (s) => s.required()
    }),
  useSpecificIAMProfile: boolean().when('saslMechanism', {
    is: 'AWS_MSK_IAM',
    then: (s) => s.required()
  }),
  IAMProfile: string()
    .label('Profile Name')
    .when('useSpecificIAMProfile', {
      is: true,
      then: (s) => s.required()
    }),
  kerberosServiceName: string()
    .label('Kerberos Service Name')
    .when('saslMechanism', {
      is: 'GSSAPI',
      then: (s) => s.required()
    }),
  saslSSL: object().when(['authMethod', 'jmxSslEnabled'], {
    is: (authMethod: string, jmxSslEnabled: boolean) => 
      authMethod === 'SASL_SSL' && jmxSslEnabled,
    then: () => sslSchema.required()
  }),

  schemaRegistryEnabled: boolean().required(),
  schemaRegistryURL: string()
    .label('URL')
    .when('schemaRegistryEnabled', {
      is: true,
      then: (s) => s.required()
    }),
  schemaRegistrySecuredWithAuth: boolean().when('schemaRegistryEnabled', {
    is: true,
    then: (s) => s.required()
  }),
  schemaRegistryUsername: string()
    .label('Username')
    .when('schemaRegistrySecuredWithAuth', {
      is: true,
      then: (s) => s.required()
    }),
  schemaRegistryPassword: string()
    .label('Password')
    .when('schemaRegistrySecuredWithAuth', {
      is: true,
      then: (s) => s.required()
    }),
  kafkaConnects: array().of(kafkaConnectSchema).required(),
  jmxEnabled: boolean().required(),
  jmxPort: number().label('Port').when('jmxEnabled', {
    is: true,
    then: portSchema
  }),
  jmxSslEnabled: boolean().when('jmxEnabled', {
    is: true,
    then: (s) => s.required()
  }),
  jmxSsl: object().when('jmxSslEnabled', {
    is: true,
    then: () => sslSchema.required()
  }),
  jmxSecuredWithAuth: boolean().when('jmxEnabled', {
    is: true,
    then: (s) => s.required()
  }),
  jmxUsername: string()
    .label('Username')
    .when('jmxSecuredWithAuth', {
      is: true,
      then: (s) => s.required()
    }),
  jmxPassword: string()
    .label('Password')
    .when('jmxSecuredWithAuth', {
      is: true,
      then: (s) => s.required()
    })
});

export default clusterConfigurationSchema;

export type BootstrapServer = yup.InferType<typeof bootstrapServerSchema>;
export type KafkaConnect = yup.InferType<typeof kafkaConnectSchema>;
export type ClusterConfiguration = yup.InferType<typeof clusterConfigurationSchema>;
