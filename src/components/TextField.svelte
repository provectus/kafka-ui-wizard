<script type="ts">
  import Label from './Label.svelte';
  export let name: string;
  export let value = '';
  export let placeholder = '';
  export let label: string;
  export let containerClass = 'col-span-6';
  export let required = false;
  export let hint = '';
  export let errors: string[] | null;
</script>

<div class={containerClass}>
  <div class="flex flex-wrap items-baseline mb-2">
    <Label forTarget={name} {required}>{label}</Label>
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
    type="text"
    bind:value
    class="input input-bordered w-full"
    class:input-error={errors}
  />
  {#if errors}
    <p class="mt-1 text-xs text-error block">{errors}</p>
  {/if}
</div>
