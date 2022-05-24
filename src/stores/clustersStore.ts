import ShortUniqueId from 'short-unique-id';
import type { ClusterConfiguration } from 'src/lib/clusterConfigurationSchema';
import { writable } from 'svelte/store';

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

export default clustersStore;
