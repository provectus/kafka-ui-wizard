<script type="ts">
  import Label from './Label.svelte';
  export let name: string;
  export let containerClass = 'col-span-6';
  export let label: string;
  export let options: string[];
</script>

<div class={containerClass}>
  {#if label}
    <div class="flex flex-wrap items-baseline mb-2">
      <Label forTarget={name}>{label}</Label>
    </div>
  {/if}
  <select id={name} {name} class="select select-bordered w-full">
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
</div>
