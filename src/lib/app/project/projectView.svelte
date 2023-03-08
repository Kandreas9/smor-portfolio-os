<script>
	import { fly } from 'svelte/transition';
	import Icon from '../../icon.svelte';
	import ProjectContent from './projectContent.svelte';

	export let items;
	export let handleCloseView;

	let itemIndex;
	$: content = items[itemIndex]?.content;

	$: handleProjectContent = (index) => {
		itemIndex = index;
	};

	const handleCloseContent = () => {
		content = null;
		itemIndex = null;
	};
</script>

<div class="projectView" transition:fly={{ duration: 300, x: 300 }}>
	<div class="projectViewHeader">
		<button on:click={handleCloseView}>Back</button>
	</div>

	<div class="projectWrapper">
		{#each items as item, i}
			{#if item.link}
				<a target="_blank" rel="noopener noreferrer" class="projectItem" href={item.link}>
					<Icon iconName={item.icon} />
					<div>{item.title}</div>
				</a>
			{:else}
				<button on:click={() => handleProjectContent(i)} class="projectItem">
					<Icon iconName={item.icon} />
					<div>{item.title}</div>
				</button>
			{/if}
		{/each}
	</div>
</div>

{#if content}
	<ProjectContent {content} {handleCloseContent} />
{/if}

<style>
	.projectView {
		padding: 2rem;
		top: 0;
		left: 0;
		position: absolute;
		background: var(--dark-color);
		height: 100%;
		width: 100%;
	}

	.projectViewHeader {
		margin-bottom: 1rem;
	}

	.projectWrapper {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
	}

	.projectItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--color);
	}
</style>
