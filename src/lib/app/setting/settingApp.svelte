<script>
	import { theme } from '../../../store';
	import { _, locale } from 'svelte-i18n';

	console.log($locale);
</script>

<section class="settingAppWrapper">
	<h2>{$_('setting.title')}</h2>

	<div class="settingAppContentWrapper">
		<label class="option"
			>{$_('setting.themeTitle')}

			<select bind:value={$theme} on:change={(e) => theme.set(e.target.value)}>
				<option value="dark">Dark</option>
				<option value="light">Light</option>
				<option value="ambient">Ambience</option>
			</select>
		</label>

		<label class="option">
			{$_('setting.languageTitle')}

			<select
				bind:value={$locale}
				on:change={(e) => localStorage.setItem('lang', e.target.value)}
			>
				<option value="en">English</option>
				<option value="fr">French</option>
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

	.option {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.option select {
		background: var(--primary-color);
		border-color: var(--light-color);
		color: var(--color);
		padding: 0.5rem;
	}
</style>
