<script>
	import projectsData from '../../../utils/projectData.json';
	import Icon from '../../icon.svelte';
	import ProjectView from './projectView.svelte';

	let items;

	const handleProjectView = (projectItems) => {
		items = projectItems;
	};

	const handleCloseView = () => {
		items = null;
	};
</script>

<section class="projectAppWrapper">
	<h2>Projects</h2>

	<div class="projectsWrapper">
		{#each projectsData as projectData}
			<button on:click={() => handleProjectView(projectData.items)} class="projectWrapper">
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
