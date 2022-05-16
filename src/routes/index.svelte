<script lang="ts">
  import Hero from '../components/Hero.svelte';
  import clustersStore, { dockerCommandStore } from '../stores/clustersStore';
</script>

{#if $clustersStore.length === 0}
  <Hero />
{:else}
  <div class="mockup-code text-sm">
    {#each $dockerCommandStore as line, index}
      {#if index === 0}
        <pre data-prefix="$"><code>{line}</code></pre>
      {:else}
        <pre><code class="ml-20">{line}</code></pre>
      {/if}
    {/each}
  </div>
{/if}
