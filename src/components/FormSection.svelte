<script sm:overflow-hiddenscript type="ts">
  import H3 from './H3.svelte';
  export let title: string;
</script>

<div class="md:grid md:grid-cols-4 py-3 border-y border-b-gray-200 even:bg-gray-50">
  <div class="md:col-span-1">
    <div class="px-4 pt-6 md:pb-4">
      <H3>{title}</H3>
    </div>
  </div>
  <div class="md:mt-0 md:col-span-3">
    <div class="sm:overflow-hidden h-full">
      <div class="px-4 py-5 space-y-6">
        <div class="grid grid-cols-6 gap-6">
          <slot name="form" />
        </div>
      </div>
    </div>
  </div>
</div>
