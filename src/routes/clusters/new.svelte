<script type="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import type { ClusterConfiguration } from '$lib/clusterConfigurationSchema';
  import BackButton from '../../components/BackButton.svelte';
  import Form from '../../components/Form.svelte';
  import clustersStore, { NEW_CLUSTER_CONFIG } from '../../stores/clustersStore';

  const onSubmit = (values: ClusterConfiguration) => {
    clustersStore.addNew(values);
    goto(`${base}/`);
  };
</script>

<svelte:head>
  <title>New Cluster</title>
</svelte:head>

<BackButton />
<Form {onSubmit} initialValues={NEW_CLUSTER_CONFIG} />
