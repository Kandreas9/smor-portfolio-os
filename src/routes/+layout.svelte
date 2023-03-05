<script>
	import '../app.css';
	import HeaderMenu from '../lib/header/headerMenu.svelte';
	import { innerWidth } from '../store.js';
</script>

<svelte:window bind:innerWidth={$innerWidth} />

<svelte:head>
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
</svelte:head>

<div class="container">
	<main>
		<h2 class="desktopHeader">Smor <span class="desktopHeaderWave">👋</span></h2>
		<slot />
	</main>

	<HeaderMenu />
</div>

<style>
	.container {
		touch-action: none;
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
		animation: wobbleInf 2s ease 0s infinite normal forwards;
	}

	@keyframes wobbleInf {
		0%,
		100% {
			transform-origin: 50% 50%;
		}

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
