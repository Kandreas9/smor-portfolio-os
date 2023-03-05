<script>
	import AboutMeMessage from './aboutMeMessage.svelte';

	let messages = [
		{
			side: 'left',
			message: 'My name is Andreas Karydopoulos, also known as Smor or Kandreas9.'
		},
		{
			side: 'right',
			message:
				'As a frontend React developer, I enjoy working with technologies like Deno, Svelte, and React.'
		},
		{
			side: 'left',
			message:
				'I prioritize open-mindedness and continuous learning, regularly experimenting with new technologies and exploring various frameworks.'
		},
		{
			side: 'right',
			message:
				'During my spare time, I enjoy drawing, playing video games, and working on personal programming projects.'
		}
	];
</script>

<section class="aboutMeAppWrapper">
	<div class="aboutHeader">
		<h2>About Me</h2>

		<img src="./me.svg" alt="me" />
	</div>

	<div class="aboutMessagesWrapper">
		{#each messages as message, i}
			<AboutMeMessage side={message.side} message={message.message} delay={1000 * i} />
		{/each}
	</div>
</section>

<style>
	.aboutMeAppWrapper {
		height: 20rem;
		width: 30rem;
	}
	.aboutHeader {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.aboutHeader img {
		height: 6rem;
	}

	.aboutHeader h2 {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
	}

	.aboutMessagesWrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		overflow: hidden;
	}
</style>
