<script type="ts">
  export let forTarget: string;
  export let required = false;
</script>

<label
  class="{required
    ? 'required'
    : ''} block text-sm font-medium text-gray-700 whitespace-nowrap mr-2"
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
