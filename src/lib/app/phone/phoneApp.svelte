<script>
	import Icon from '../../icon.svelte';

	const phoneLinks = [
		{
			link: 'https://github.com/Kandreas9',
			icon: 'github'
		},
		{
			link: 'mailto:xsmordev@gmail.com',
			icon: 'email'
		},
		{
			link: 'https://www.linkedin.com/in/andreas-karydopoulos/',
			icon: 'linkedin'
		}
	];
</script>

<section class="phoneAppWrapper">
	<h2>Phone</h2>

	<div class="phoneAppContent">
		{#each Array(13) as _, index}
			{#if index === 12}
				<a href="#">
					<Icon iconName={'phone'} />
				</a>
			{:else}
				<a
					class:disabled={!phoneLinks[index]}
					target="_blank"
					rel="noopener noreferrer"
					href={phoneLinks[index] ? phoneLinks[index].link : '#'}
				>
					<Icon iconName={phoneLinks[index] ? phoneLinks[index].icon : 'error'} />
				</a>
			{/if}
		{/each}
	</div>
</section>

<style>
	.disabled {
		pointer-events: none;
		cursor: default;
	}

	h2 {
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.phoneAppWrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.phoneAppContent {
		max-width: 20rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: center;
		gap: 0.7rem 1.5rem;
	}

	.phoneAppContent a:last-child {
		grid-column: 1/4;
	}

	.phoneAppContent a {
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		color: white;
		width: 4rem;
		height: 4rem;
		background: var(--light-color);
		padding: 2.2rem;
		border-radius: 50%;
	}
</style>
