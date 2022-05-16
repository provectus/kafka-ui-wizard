<script type="ts">
  import Label from './Label.svelte';
  export let name: string;
  export let label: string;
  export let hint: string | undefined = undefined;
</script>

<div class="col-span-6">
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input id={name} {name} type="checkbox" class="checkbox checkbox-sm" />
    </div>
    <div class="ml-3">
      <Label forTarget={name}>{label}</Label>
      {#if hint}
        <p class="text-sm text-gray-500">{hint}</p>
      {/if}
    </div>
  </div>
</div>
