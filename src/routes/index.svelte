<script lang="ts">
  import CodeSnippet from '../components/CodeSnippet.svelte';
  import Hero from '../components/Hero.svelte';
  import clustersStore from '../stores/clustersStore';
  import { dockerCommandStore, dockerComposeStore } from '../stores/paramsStore';
</script>

{#if $clustersStore.length === 0}
  <Hero />
{:else}
  <CodeSnippet code={$dockerCommandStore} />
  <CodeSnippet code={$dockerComposeStore} />
{/if}
