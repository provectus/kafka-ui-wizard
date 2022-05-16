import yup from '$lib/yupExtended';

const { string, object, number, boolean, array } = yup;

export const bootstrapServerSchema = object({
  host: string().label('host').required('required'),
  port: number().max(65535, '65535 is the max').positive('positive only').required('required')
});

export const sslSchema = object({
  truststoreLocation: string().label('Truststore location').required(),
  truststorePassword: string().label('Truststore password').required(),
  keystoreLocation: string().label('Keystore location').required(),
  keystorePassword: string().label('Keystore password').required()
});

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
  selfSignedCA: boolean().required().default(false),
  selfSignedCASsl: object().when('selfSignedCA', {
    is: true,
    then: sslSchema.required()
  }),
  authMethod: string().required().oneOf(['None', 'SASL', 'SSL', 'IAM']),
  saslMechanism: string()
    .label('sasl_mechanism')
    .when('authMethod', {
      is: 'SASL',
      then: (s) => s.required()
    }),
  saslJaasConfig: string()
    .label('sasl.jaas.config')
    .when('authMethod', {
      is: 'SASL',
      then: (s) => s.required()
    }),
  ssl: object().when('authMethod', {
    is: 'SSL',
    then: () => sslSchema.required()
  }),
  useSpecificIAMProfile: boolean().when('authMethod', {
    is: 'IAM',
    then: (s) => s.required()
  }),
  IAMProfile: string()
    .label('Profile Name')
    .when('useSpecificIAMProfile', {
      is: true,
      then: (s) => s.required()
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
  jmxPort: number()
    .label('Port')
    .when('jmxEnabled', {
      is: true,
      then: number().max(65535, '65535 is the max').positive('positive only').required('required')
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
