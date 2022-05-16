<script type="ts">
  import Label from './Label.svelte';
  export let name: string;
  export let value = '';
  export let label: string;
  export let placeholder = '********';
  export let errors: string[] | null;
</script>

<div class="col-span-3">
  <Label forTarget={name}>{label}</Label>
  <input
    id={name}
    {name}
    {placeholder}
    type="password"
    bind:value
    class="input input-bordered w-full mt-2"
    class:input-error={errors}
  />
  {#if errors}
    <p class="mt-1 text-xs text-error block">{errors}</p>
  {/if}
</div>
