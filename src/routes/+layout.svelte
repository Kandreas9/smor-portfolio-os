<script>
	import { onMount } from 'svelte';
	import HeaderMenu from '../lib/header/headerMenu.svelte';
	import { innerWidth, theme } from '../store.js';
	import fileNames from '../utils/fileNames.json';

	let themeColor = '#271644';
	let loading = true;

	onMount(() => {
		loading = false;
	});

	$: {
		if ($theme === 'light') {
			themeColor = '#949494';
		} else if ($theme === 'ambient') {
			themeColor = '#BD8D76';
		} else if ($theme === 'dark') {
			themeColor = '#271644';
		}
	}
</script>

<svelte:window on:load={window.scrollTo(1, 0)} bind:innerWidth={$innerWidth} />

<svelte:head>
	<meta name="theme-color" content={themeColor} />
	<script>
		if (document) {
			const storedTheme = localStorage.getItem('theme');
			if (storedTheme) {
				document.documentElement.className = storedTheme;
				defaultTheme = storedTheme;
			} else {
				const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
					.matches
					? 'dark'
					: 'light';
				localStorage.setItem('theme', preferredColorScheme);
				document.documentElement.className = preferredColorScheme;
			}
		}
	</script>
	{#each fileNames as file}
		<link rel="preload" href={file.name} as={file.type} />
	{/each}
</svelte:head>

<div class="container">
	<main>
		<h2 class="desktopHeader">Smor <span class:desktopHeaderWave={!loading}>👋</span></h2>
		<slot />
	</main>

	<HeaderMenu />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}

	main {
		flex: 8;
		position: relative;
	}

	.desktopHeader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 6rem;
		opacity: 0.1;
		user-select: none;
		text-align: center;
	}

	.desktopHeaderWave {
		display: inline-block;
		transform-origin: 50% 50%;

		animation: wobbleInf 2s ease 0s infinite normal forwards;
	}

	@keyframes wobbleInf {
		15% {
			transform: rotate(-15deg);
		}

		30% {
			transform: rotate(15deg);
		}

		45% {
			transform: rotate(-5deg);
		}

		60% {
			transform: rotate(2.4deg);
		}

		75% {
			transform: rotate(-1.2deg);
		}
	}
</style>
