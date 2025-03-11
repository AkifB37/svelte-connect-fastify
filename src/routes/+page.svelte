<script>
	import { enhance } from '$app/forms';
	const {form} = $props()
	let submitting = $state(false);
  </script>

<form method="POST"  use:enhance={() => {
  submitting = true;
  return async ({ result, update }) => {
	submitting = false;
	if (result.type === 'success') {
	  console.log('Form başarıyla gönderildi!');
	}
	await update({ reset: false });
  };
}}
>
<div>
  <label for="name">Name:</label>
  <input id="name" name="name" value={form?.name || ''}>
  {#if form?.errors?.name}
	<p class="error">{form.errors.name}</p>
  {/if}
</div>

<div>
  <label for="email">E-Mail:</label>
  <input id="email" name="email" type="email" value={form?.email || ''}>
  {#if form?.errors?.email}
	<p class="error">{form.errors.email}</p>
  {/if}
</div>

<button type="submit" disabled={submitting}>
  {submitting ? 'Sending...' : 'Send'}
</button>
</form>

{#if form?.success}
<div class="success-message">
  Form Sended
</div>
{/if}