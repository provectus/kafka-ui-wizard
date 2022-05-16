<script type="ts">
  import type { KafkaConnect } from '$lib/clusterConfigurationSchema';
  import CheckboxField from './CheckboxField.svelte';
  import Hr from './Hr.svelte';
  import PasswordField from './PasswordField.svelte';
  import TextField from './TextField.svelte';

  interface KafkaConnectError {
    url: string[] | null;
    username: string[] | null;
    password: string[] | null;
  }

  export let connects: KafkaConnect[];
  export let errors: KafkaConnectError[] | null;

  export let onRemove: (index: number) => () => void;
  export let onAdd: (index: number) => () => void;
</script>

{#if connects.length === 0}
  <div class="col-span-5">
    <button class="btn btn-sm btn-outline whitespace-nowrap" on:click|stopPropagation={onAdd(0)}
      >Add Kafka Connect</button
    >
  </div>
{/if}
{#each connects as connect, index}
  {#if index > 0}
    <Hr />
  {/if}
  <div class="grid grid-cols-6 gap-6 col-span-5">
    <TextField
      name={`kafkaConnects.${index}.name`}
      label="Kafka Connect name"
      hint="Given name for the Kafka Connect cluster"
      errors={errors && errors[index]?.url}
    />
    <TextField
      name={`kafkaConnects.${index}.url`}
      label="Kafka Connect URL"
      hint="Address of the Kafka Connect service endpoint"
      errors={errors && errors[index]?.url}
    />
    <CheckboxField
      name={`kafkaConnects.${index}.securedWithAuth`}
      label="Kafka Connect is secured with auth?"
    />
    {#if connect.securedWithAuth}
      <TextField
        name={`kafkaConnects.${index}.username`}
        label="Username"
        containerClass="col-span-3"
        errors={errors && errors[index]?.username}
      />
      <PasswordField
        name={`kafkaConnects.${index}.password`}
        label="Password"
        errors={errors && errors[index]?.password}
      />
    {/if}
  </div>
  <div class="col-span-1 pt-3">
    {#if index == connects.length - 1}
      <button class="btn btn-circle btn-xs btn-success text-white" on:click={onAdd(index + 1)}>
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
            d="M12,18 V6 M18,12 H6"
          />
        </svg>
      </button>
    {/if}
    <button
      type="button"
      on:click={onRemove(index)}
      class="btn btn-circle btn-xs btn-error text-white"
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
          d="M7 17L17 6M7 6l11 11"
        />
      </svg>
    </button>
  </div>
{/each}
