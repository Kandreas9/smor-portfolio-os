<script>
	import AboutMeMessage from './aboutMeMessage.svelte';
	import aboutMessages from '../../../utils/aboutMessages.json';

	let messages = [aboutMessages[0]];

	const pushNextMessage = (i) => {
		if (aboutMessages.length !== i + 1) {
			messages = [...messages, aboutMessages[i + 1]];
		}
	};
</script>

<section class="aboutMeAppWrapper">
	<div class="aboutHeader">
		<h2>About Me</h2>

		<img loading="lazy" src="/svg/me.svg" alt="me" />
	</div>

	<div class="aboutMessagesWrapper">
		{#each messages as message, i}
			<AboutMeMessage {pushNextMessage} {i} side={message.side} message={message.message} />
		{/each}
	</div>
</section>

<style>
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
