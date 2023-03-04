<script>
	import { mobileApp } from '../../store.js';
	import { scale } from 'svelte/transition';
	import AboutMeApp from './aboutMe/aboutMeApp.svelte';
	import ProjectApp from './project/projectApp.svelte';
	import PhoneApp from './phone/phoneApp.svelte';
	import SettingApp from './setting/settingApp.svelte';

	let isClosing = false;

	let options = {
		about: AboutMeApp,
		project: ProjectApp,
		phone: PhoneApp,
		setting: SettingApp
	};
</script>

{#if $mobileApp && !isClosing}
	<div
		transition:scale={{ duration: 550 }}
		on:outrostart={() => (isClosing = true)}
		on:outroend={() => (isClosing = false)}
		class="appMobile"
	>
		<svelte:component this={options[$mobileApp]} />
	</div>
{/if}

<style>
	.appMobile {
		position: absolute;
		background-color: var(--dark-color);
		top: 0;
		width: 100%;
		height: 100%;
		padding: 2rem;
		overflow-y: scroll;
	}

	@media (min-width: 769px) {
		.appMobile {
			display: none;
		}
	}
</style>
