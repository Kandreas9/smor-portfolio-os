<script>
	import { desktopApps } from '../../store.js';
	import AppDesktopWrapper from './appDesktopWrapper.svelte';
	import AboutMeApp from './aboutMe/aboutMeApp.svelte';
	import ProjectApp from './project/projectApp.svelte';
	import PhoneApp from './phone/phoneApp.svelte';
	import SettingApp from './setting/settingApp.svelte';

	let focusedWindow;

	let options = {
		about: AboutMeApp,
		project: ProjectApp,
		phone: PhoneApp,
		setting: SettingApp
	};
</script>

{#each $desktopApps as desktopAppName, i (desktopAppName)}
	<AppDesktopWrapper
		bind:focusedWindow
		zIndex={desktopAppName === focusedWindow ? 9 : 1 + i}
		xInitial={20 * (i + 1) + 'px'}
		yInitial={20 * (i + 1) + 'px'}
		appName={desktopAppName}
	>
		<svelte:component this={options[desktopAppName]} />
	</AppDesktopWrapper>
{/each}

<style>
</style>
