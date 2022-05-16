<script type="ts">
  import Label from './Label.svelte';
  export let name: string;
  export let placeholder = '';
  export let label: string;
  export let containerClass = 'col-span-6';
  export let hint = '';
  export let errors: string[] | null;
</script>

<div class={containerClass}>
  <div class="flex flex-wrap items-baseline">
    <Label forTarget={name}>{label}</Label>
    {#if hint}
      <p class="text-xs text-gray-500 block">
        {hint}
      </p>
    {/if}
  </div>
  <input
    id={name}
    {name}
    {placeholder}
    type="number"
    class="input input-bordered w-28"
    class:input-error={errors}
  />
  {#if errors}
    <p class="mt-1 text-xs text-error block">{errors}</p>
  {/if}
</div>
