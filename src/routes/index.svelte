<script lang="ts">
  import Hero from '../components/Hero.svelte';
  import clustersStore from '../stores/clustersStore';
  import { paramsStore } from '../stores/paramsStore';
</script>

{#if $clustersStore.length === 0}
  <Hero />
{:else}
  <div class="mockup-code text-sm">
    <pre data-prefix="$"><code>docker run -p 8080:8080 \</code></pre>
    <pre><code class="ml-20">-d provectuslabs/kafka-ui:latest \</code></pre>
    {#each Object.entries($paramsStore.env) as [key, value]}
      {#if value != undefined}
        <pre><code class="ml-20">-e {key}={value} \</code></pre>
      {/if}
    {/each}
    {#if $paramsStore.javaOpts.length > 0}
      <pre><code class="ml-20">-e JAVA_OPTS=" \</code></pre>
      {#each $paramsStore.javaOpts as opt}
        <pre><code class="ml-32">{opt} \</code></pre>
      {/each}
      <pre><code class="ml-20">" \</code></pre>
    {/if}
    {#if $paramsStore.volumes.length > 0}
      {#each $paramsStore.volumes as volume, index}
        <pre><code class="ml-20">-v {volume} \</code></pre>
      {/each}
    {/if}
  </div>
{/if}
