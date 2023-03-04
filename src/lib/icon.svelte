<script>
	import { theme } from '../store';
	export let iconName;
</script>

<div class="iconWrapper">
	<img class={$theme} src="/{iconName}.svg" alt="{iconName} folder" />
</div>

<style>
	.iconWrapper {
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

	.iconWrapper img {
		user-select: none;
		height: 35px;
	}

	.iconWrapper .dark {
		filter: invert(11%) sepia(20%) saturate(4002%) hue-rotate(236deg) brightness(94%)
			contrast(101%);
	}

	.iconWrapper .light {
		filter: invert(100%) sepia(3%) saturate(159%) hue-rotate(312deg) brightness(117%)
			contrast(100%);
	}

	.iconWrapper .ambient {
		filter: invert(88%) sepia(9%) saturate(806%) hue-rotate(330deg) brightness(97%)
			contrast(97%);
	}
</style>
