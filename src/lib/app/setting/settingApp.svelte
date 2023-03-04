<script>
	import { theme } from '../../../store';
</script>

<section class="settingAppWrapper">
	<h2>Settings</h2>

	<div class="settingAppContentWrapper">
		<label class="theme"
			>Theme

			<select bind:value={$theme} on:change={(e) => theme.set(e.target.value)}>
				<option value="dark">Dark</option>
				<option value="light">Light</option>
				<option value="ambient">Ambience</option>
			</select>
		</label>
	</div>
</section>

<style>
	h2 {
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.theme {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.theme select {
		background: var(--primary-color);
		border-color: var(--light-color);
		color: var(--color);
		padding: 0.5rem;
	}
</style>
