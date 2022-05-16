<script type="ts">
  import PasswordField from './PasswordField.svelte';

  import TextField from './TextField.svelte';

  export let errors: Record<string, string[] | null> | undefined;
  export let namePrefix: string;
</script>

<TextField
  name={`${namePrefix}.truststoreLocation`}
  label="Truststore location"
  containerClass="col-start-1 col-span-3"
  errors={errors?.truststoreLocation || null}
/>
<PasswordField
  name={`${namePrefix}.truststorePassword`}
  label="Truststore password"
  errors={errors?.truststorePassword || null}
/>
<TextField
  name={`${namePrefix}.keystoreLocation`}
  label="Keystore location"
  containerClass="col-span-3"
  errors={errors?.keystoreLocation || null}
/>
<PasswordField
  name={`${namePrefix}.keystorePassword`}
  label="Keystore password"
  errors={errors?.keystorePassword || null}
/>
