<script type="ts">
  import type { BootstrapServer } from '$lib/clusterConfigurationSchema';

  interface BootstrapServerError {
    host: string[] | null;
    port: string[] | null;
  }

  export let value: BootstrapServer[];
  export let errors: BootstrapServerError[];

  export let onRemove: (index: number) => () => void;
  export let onAdd: (index: number) => () => void;
</script>

{#each value as { host, port }, index}
  <div class="grid grid-cols-6 gap-3 mt-2">
    <div class="col-span-3">
      <input
        id={`bootstrapServers.${index}.host`}
        name={`bootstrapServers.${index}.host`}
        placeholder="Host"
        type="text"
        bind:value={host}
        class="input input-bordered w-full"
        class:input-error={errors[index]?.host}
      />
      {#if errors[index]?.host}
        <p class="mt-1 text-xs text-error block">{errors[index]?.host}</p>
      {/if}
    </div>
    <div class="col-span-2">
      <input
        id={`bootstrapServers.${index}.port`}
        name={`bootstrapServers.${index}.port`}
        type="number"
        placeholder="Port"
        bind:value={port}
        class="input input-bordered w-full"
        class:input-error={errors[index]?.port}
      />
      {#if errors[index]?.port}
        <p class="mt-1 text-xs text-error block">{errors[index]?.port}</p>
      {/if}
    </div>
    <div class="col-span-1 pt-3">
      {#if index === value.length - 1}
        <button class="btn btn-circle btn-xs btn-success text-white" on:click={onAdd(index + 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M12,18 V6 M18,12 H6"
            />
          </svg>
        </button>
      {/if}
      {#if value.length !== 1}
        <button
          type="button"
          on:click={onRemove(index)}
          class="btn btn-circle btn-xs btn-error text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M7 17L17 6M7 6l11 11"
            />
          </svg>
        </button>
      {/if}
    </div>
  </div>
{/each}
