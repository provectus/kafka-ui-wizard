<script type="ts">
  export let forTarget: string;
  export let required = false;
</script>

<label
  class="block text-sm font-medium text-gray-700 whitespace-nowrap mr-2"
  class:required
  for={forTarget}
>
  <slot />
</label>

<style>
  .required:after {
    content: ' *';
    color: red;
  }
</style>
