<script type="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import clustersStore from '../../stores/clustersStore';
  import Form from '../../components/Form.svelte';
  import type { ClusterConfiguration } from '$lib/clusterConfigurationSchema';
  import { goto } from '$app/navigation';
  import BackButton from '../../components/BackButton.svelte';
  import Hero from '../../components/Hero.svelte';

  $: ({ clusterId } = $page.params);

  $: initialValues = $clustersStore.find(({ id }) => id === clusterId);

  const onSubmit = (values: ClusterConfiguration) => {
    clustersStore.update(clusterId, values);
    goto(`${base}/`);
  };
</script>

<svelte:head>
  <title>Edit {initialValues?.clusterName}</title>
</svelte:head>

<BackButton />

{#if initialValues}
  <Form {onSubmit} {initialValues} />
{:else}
  <Hero />
{/if}
