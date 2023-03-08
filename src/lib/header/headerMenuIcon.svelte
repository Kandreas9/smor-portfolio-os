<script>
	import { fade } from 'svelte/transition';

	export let iconName = 'about';
	export let popupName;
</script>

<button
	in:fade={{ duration: 550 }}
	aria-label="open {iconName} app"
	class="headerMenuIcon"
	on:click
>
	<div class="popover">{popupName}</div>
	<img
		class="icon"
		height="35px"
		width="35px"
		draggable="false"
		src="/svg/{iconName}.svg"
		alt={iconName}
	/>
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
		position: relative;
	}

	.headerMenuIcon img {
		user-select: none;
		height: 35px;
		color: var(--primary-color);
	}

	.popover {
		display: none;
		position: absolute;
		top: -4.5rem;
		background: var(--primary-color);
		padding: 0.5rem 1rem;
		justify-content: center;
		align-items: center;
		height: 2.5rem;
		width: 8rem;
		border-radius: 10px;
		z-index: 20;
		font-size: 0.8rem;
		border: 1px solid var(--light-color);
	}

	.headerMenuIcon:hover .popover {
		display: flex;
	}

	.popover::before {
		content: '';
		width: 0;
		height: 0;
		border-left: 20px solid transparent;
		border-right: 20px solid transparent;
		border-top: 24px solid var(--light-color);
		position: absolute;
		bottom: -1.5rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.popover::after {
		content: '';
		position: absolute;
		bottom: -1.5rem;
		left: 50%;
		transform: translateX(-50%);
		border-left: 18px solid transparent;
		border-right: 18px solid transparent;
		border-top: 24px solid var(--primary-color);
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
