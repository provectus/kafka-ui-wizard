<script type="ts">
  import { beforeNavigate, goto } from '$app/navigation';
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-yup';
  import BootstrapServers from './BootstrapServers.svelte';
  import CheckboxField from './CheckboxField.svelte';
  import Label from './Label.svelte';
  import PasswordField from './PasswordField.svelte';
  import SelectField from './SelectField.svelte';
  import TextField from './TextField.svelte';
  import FormSection from './FormSection.svelte';
  import NumberField from './NumberField.svelte';
  import type { ClusterConfiguration } from '$lib/clusterConfigurationSchema';
  import schema from '$lib/clusterConfigurationSchema';
  import KafkaConnects from './KafkaConnects.svelte';
  import { NEW_CLUSTER_CONFIG } from '../stores/clustersStore';
  import { base } from '$app/paths';
  import SslForm from './SslForm.svelte';

  export let initialValues: ClusterConfiguration;
  export let onSubmit: (values: ClusterConfiguration) => void;

  const CONFIRMATION_MESSAGE =
    'You have unsaved changes on this page. Do you want to leave this page and discard your changes?';

  const {
    form,
    errors,
    isValid,
    isDirty,
    data,
    setInitialValues,
    reset,
    isSubmitting,
    addField,
    unsetField,
    setData
  } = createForm<ClusterConfiguration>({
    onSubmit,
    initialValues,
    extend: validator({ schema })
  });

  beforeNavigate(({ from, to, cancel }) => {
    if ($isSubmitting) return;

    const isRouteUpdated = from.pathname !== to?.pathname;

    if (isRouteUpdated && $isDirty && !confirm(CONFIRMATION_MESSAGE)) {
      cancel();
    }
  });

  $: {
    setInitialValues(initialValues);
    reset();
  }

  const addBootstrapServer = (index: number) => () =>
    addField('bootstrapServers', NEW_CLUSTER_CONFIG.bootstrapServers, index);
  const removeBootstrapServer = (index: number) => () => unsetField(`bootstrapServers.${index}`);

  const addKafkaConnect = (index: number) => () =>
    addField('kafkaConnects', NEW_CLUSTER_CONFIG.kafkaConnects, index);
  const removeKafkaConnect = (index: number) => () => unsetField(`kafkaConnects.${index}`);
</script>

<form use:form>
  <FormSection title="Kafka Cluster">
    <svelte:fragment slot="form">
      <TextField
        name="clusterName"
        label="Cluster Name"
        placeholder="local"
        errors={$errors.clusterName}
        hint="this name will help you recognize the cluster in the application interface"
      />
      <CheckboxField
        name="readonly"
        label="Read-only mode"
        hint="allows you to run an application in read-only mode for a specific cluster"
      />
      <div class="col-span-6">
        <div class="flex flex-wrap items-baseline">
          <Label forTarget="bootstrapServers">Bootstrap Servers</Label>
          <p class="text-xs text-gray-500">the list of Kafka brokers that you want to connect to</p>
        </div>
        <BootstrapServers
          errors={$errors.bootstrapServers}
          bind:value={$data.bootstrapServers}
          onAdd={addBootstrapServer}
          onRemove={removeBootstrapServer}
        />
      </div>
      <CheckboxField name="sharedConfluentCloudCluster" label="Shared confluent cloud cluster" />
    </svelte:fragment>
  </FormSection>

  <FormSection title="Cluster SSL encryption">
    <svelte:fragment slot="form">
      <CheckboxField name="securedWithSSL" label="Secured with SSL" />
      {#if $data.securedWithSSL}
        <CheckboxField name="selfSignedCA" label="Self-signed certificate" />
        {#if $data.selfSignedCA}
          <SslForm errors={$errors.selfSignedCASsl} namePrefix="selfSignedCASsl" />
        {/if}
      {/if}
    </svelte:fragment>
  </FormSection>

  <FormSection title="Authentication">
    <svelte:fragment slot="form">
      <SelectField
        name="authMethod"
        label=""
        containerClass="col-span-2"
        options={['None', 'SASL_SSL', 'SASL_PLAINTEXT']}
      />
      {#if $data.authMethod === 'SASL_PLAINTEXT'}
        <SelectField
          name="saslMechanism"
          label="SASL Mechanism"
          containerClass="col-span-6"
          options={['PLAIN', 'AWS_MSK_IAM', 'SCRAM-SHA-256', 'SCRAM-SHA-512', 'GSSAPI']}
        />

        {#if $data.saslMechanism === 'GSSAPI'}
          <TextField
            name="kerberosServiceName"
            label="Kerberos Service Name"
            errors={$errors.kerberosServiceName}
          />
        {/if}

        {#if $data.saslMechanism === 'AWS_MSK_IAM'}
          <CheckboxField name="useSpecificIAMProfile" label="Specific profile" />
          {#if $data.useSpecificIAMProfile}
            <TextField name="IAMProfile" label="Profile name" errors={$errors.IAMProfile} />
          {/if}
        {:else}
          <TextField
            name="saslJaasConfig"
            label="sasl.jaas.config"
            errors={$errors.saslJaasConfig}
          />
        {/if}
      {:else if $data.authMethod === 'SASL_SSL'}
        <SslForm errors={$errors.saslSSL} namePrefix="saslSSL" />
      {/if}
    </svelte:fragment>
  </FormSection>

  <FormSection title="Schema Registry">
    <svelte:fragment slot="form">
      <div class="col-span-5">
        <button
          class="btn btn-sm btn-outline whitespace-nowrap"
          on:click|stopPropagation|preventDefault={() =>
            setData('schemaRegistryEnabled', (val) => !val)}
        >
          {#if !$data.schemaRegistryEnabled}
            Add Schema Registry
          {:else}
            Remove from config
          {/if}
        </button>
      </div>
      {#if $data.schemaRegistryEnabled}
        <TextField
          name="schemaRegistryURL"
          label="URL"
          hint=""
          placeholder="http://localhost:8081"
          errors={$errors.schemaRegistryURL}
        />
        <CheckboxField
          name="schemaRegistrySecuredWithAuth"
          label="Schema registry is secured with auth?"
        />
        {#if $data.schemaRegistrySecuredWithAuth}
          <TextField
            name="schemaRegistryUsername"
            label="Username"
            containerClass="col-span-3"
            errors={$errors.schemaRegistryUsername}
          />
          <PasswordField
            name="schemaRegistryPassword"
            label="Password"
            errors={$errors.schemaRegistryPassword}
          />
        {/if}
      {/if}
    </svelte:fragment>
  </FormSection>

  <FormSection title="Kafka Connect">
    <svelte:fragment slot="form">
      <KafkaConnects
        errors={$errors.kafkaConnects}
        connects={$data.kafkaConnects}
        onRemove={removeKafkaConnect}
        onAdd={addKafkaConnect}
      />
    </svelte:fragment>
  </FormSection>

  <FormSection title="JMX Metrics">
    <svelte:fragment slot="form">
      <div class="col-span-5">
        <button
          class="btn btn-sm btn-outline whitespace-nowrap"
          on:click|stopPropagation|preventDefault={() => setData('jmxEnabled', (val) => !val)}
        >
          {#if !$data.jmxEnabled}
            Configure JMX Metrics
          {:else}
            Remove from config
          {/if}
        </button>
      </div>
      {#if $data.jmxEnabled}
        <NumberField name="jmxPort" label="Port" errors={$errors.jmxPort} />
        <CheckboxField name="jmxSslEnabled" label="SSL" />
        {#if $data.jmxSslEnabled}
          <SslForm errors={$errors.jmxSsl} namePrefix="jmxSsl" />
        {/if}

        <CheckboxField name="jmxSecuredWithAuth" label="Authentication" />
        {#if $data.jmxSecuredWithAuth}
          <TextField
            name="jmxUsername"
            label="Username"
            containerClass="col-span-3"
            errors={$errors.jmxUsername}
          />
          <PasswordField name="jmxPassword" label="Password" errors={$errors.jmxPassword} />
        {/if}
      {/if}
    </svelte:fragment>
  </FormSection>
  <div class="md:mt-0 md:col-span-3 md:col-start-2">
    <div class="px-4 py-5 space-y-6 sm:p-4 bg-grey-50 text-right">
      <button class="btn btn-secondary text-white" on:click={() => goto(`${base}/`)}>
        Cancel
      </button>
      <button type="submit" class="btn text-white" class:disabled:opacity-30={!$isValid}>
        Save
      </button>
    </div>
  </div>
</form>
