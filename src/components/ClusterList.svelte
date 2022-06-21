<script lang="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import clustersStore from '../stores/clustersStore';
</script>

<div class="grid gap-0 p-2 md:p-3">
  {#each $clustersStore as { id, clusterName }}
    <div
      on:click={() => goto(`${base}/clusters/${id}`)}
      class="card card-compact shadow mb-1 bg-base-100 cursor-pointer rounded-none"
    >
      <div class="card-body">
        <div>
          <div class="text-gray-400 text-xs">Cluster Name:</div>
          <div title={clusterName} class="text-gray-700 text-lg text-ellipsis overflow-hidden">
            {clusterName}
          </div>
        </div>
        <div class="card-actions justify-end">
          <button
            class="btn btn-error btn-square btn-xs text-white"
            title="Remove"
            on:click|stopPropagation={() => clustersStore.remove(id)}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>
