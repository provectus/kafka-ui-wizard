<script type="ts">
  import Label from './Label.svelte';
  export let name: string;
  export let containerClass = 'col-span-6';
  export let label: string;
  export let options: string[];
</script>

<div class={containerClass}>
  <Label forTarget={name}>{label}</Label>
  <select id={name} {name} class="select select-bordered w-full mt-1">
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
</div>
