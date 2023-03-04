<script>
	import { fade } from 'svelte/transition';
	import { theme } from '../../store.js';

	export let iconName = 'about';
</script>

<button
	in:fade={{ duration: 550 }}
	aria-label="open {iconName} app"
	class="headerMenuIcon"
	on:click
>
	<img class="icon" draggable="false" src="/{iconName}.svg" alt={iconName} />
</button>

<style>
	.headerMenuIcon {
		cursor: pointer;
		background-color: var(--light-color);
		border-radius: 7px;
		padding: 1rem;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3.1rem;
		width: 3.1rem;
	}

	.headerMenuIcon img {
		user-select: none;
		height: 35px;
		color: var(--primary-color);
	}

	:global(.dark) .icon {
		filter: invert(11%) sepia(20%) saturate(4002%) hue-rotate(236deg) brightness(94%)
			contrast(101%);
	}

	:global(.light) .icon {
		filter: invert(100%) sepia(3%) saturate(159%) hue-rotate(312deg) brightness(117%)
			contrast(100%);
	}

	:global(.ambient) .icon {
		filter: invert(88%) sepia(9%) saturate(806%) hue-rotate(330deg) brightness(97%)
			contrast(97%);
	}
</style>
