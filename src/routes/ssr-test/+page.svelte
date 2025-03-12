<script>
	import { onMount } from 'svelte';

	let isClient = $state(false);
	let renderTime = new Date().toISOString();

	const {data} = $props()

	onMount(() => {
		isClient = true;
	});

</script>

<h1>SSR Test Sayfası</h1>
<p>Render zamanı: {renderTime}</p>
<p>Render yeri: {isClient ? 'İstemci (Client)' : 'Sunucu (Server)'}</p>

<div>
	{#each data.users as user}
		<section>
			{@render card(user)}
		</section>
	{/each}

</div>



{#snippet card(user)}
	<div class="user-card">
		<div class="user-header">
			<div class="user-status">
				<div class="status-indicator"></div>
				<span>Active</span>
			</div>
			<div class="user-avatar">AA</div>
			<div class="user-name">{user.firstName} {user.lastName}</div>
			<div class="user-username">{user.username}</div>
		</div>

		<div class="user-details">
			<div class="detail-group">
				<div class="detail-title">Personal Information</div>
				<div class="detail-row">
					<div class="detail-label">Age</div>
					<div class="detail-value">{user.age}</div>
				</div>
				<div class="detail-row">
					<div class="detail-label">Birth Date</div>
					<div class="detail-value">12 August 1985</div>
				</div>
			</div>

			<div class="detail-group">
				<div class="detail-title">Contact Information</div>
				<div class="detail-row">
					<div class="detail-label">Email</div>
					<div class="detail-value">{user.email}</div>
				</div>
				<div class="detail-row">
					<div class="detail-label">Phone</div>
					<div class="detail-value">{user.phoneNumber}</div>
				</div>
			</div>

			<div class="detail-group">
				<div class="detail-title">Address</div>
				<div class="detail-content">
					{JSON.stringify(user.address, null, 2)}
				</div>
			</div>
		</div>

		<div class="user-footer">
			<div class="id-badge">ID: {user.id}</div>
			<div class="registration-date">Registered: {user.registrationDate}</div>
		</div>
	</div>
	{/snippet}



