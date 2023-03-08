<script>
	import projectsData from '../../../utils/projectData.json';
	import Icon from '../../icon.svelte';
	import ProjectView from './projectView.svelte';
	import { _ } from 'svelte-i18n';

	let itemIndex;
	$: items = projectsData[$_('project.projectLang')][itemIndex]?.items;

	$: handleProjectView = (index) => {
		itemIndex = index;
	};

	const handleCloseView = () => {
		items = null;
		itemIndex = null;
	};
</script>

<section class="projectAppWrapper">
	<h2>{$_('project.title')}</h2>

	<div class="projectsWrapper">
		{#each projectsData[$_('project.projectLang')] as projectData, i}
			<button on:click={() => handleProjectView(i)} class="projectWrapper">
				<Icon iconName="folder" />
				<div class="projectTitle">{projectData.title}</div>
			</button>
		{/each}
	</div>
</section>

{#if items}
	<ProjectView {handleCloseView} {items} />
{/if}

<style>
	h2 {
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.projectsWrapper {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(3, 1fr);
	}

	.projectWrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.projectTitle {
		font-size: 0.8rem;
	}
</style>
