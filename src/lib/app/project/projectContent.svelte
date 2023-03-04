<script>
	import { fly } from 'svelte/transition';

	export let content;
	export let handleCloseContent;
</script>

<div class="projectContent" transition:fly={{ duration: 300, x: 300 }}>
	<div class="projectContentHeader">
		<button on:click={handleCloseContent}>Back</button>
		<h2>{content.title}</h2>
	</div>

	<div class="projectContentMain">
		<img src="{content.img}.webp" alt={content.img} />

		<p>{content.description}</p>
	</div>

	<section class="projectContentLangs">
		<h2><span>Languages Used</span></h2>

		<div class="langsWrapper">
			{#each content.langs as lang}
				<div class="lang">{lang}</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.projectContent {
		padding: 2rem;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--dark-color);
	}

	.projectContentMain {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.projectContentHeader {
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		text-align: center;
		margin-bottom: 1rem;
	}

	.projectContentLangs {
		text-align: center;
		width: 100%;
	}

	.projectContentLangs h2 {
		margin: 2rem 0;
		width: 100%;
		text-align: center;
		border-bottom: 2px solid var(--light-color);
		line-height: 0.1em;
	}

	.projectContentLangs h2 span {
		background: var(--dark-color);
		padding: 0 10px;
	}

	.langsWrapper {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.lang {
		border: 2px solid var(--light-color);
		padding: 0.5rem;
	}

	img {
		width: 100%;
	}

	p {
		text-align: center;
	}
</style>
