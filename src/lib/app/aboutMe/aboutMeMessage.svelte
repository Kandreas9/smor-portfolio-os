<script>
	import { fly } from 'svelte/transition';

	export let side;
	export let message;
	export let i;
	export let pushNextMessage = () => {};

	let audio;

	$: left = side == 'left';
	$: right = side == 'right';
	$: xFlyAxis = right ? 300 : -300;

	const handleIntroEnd = () => {
		audio.volume = 0.05;
		audio.play();

		pushNextMessage(i);
	};
</script>

<div
	in:fly={{ duration: 300, delay: 550, x: xFlyAxis }}
	on:introend={handleIntroEnd}
	class="aboutMeMessage"
	class:left
	class:right
>
	{message}

	<audio src="/sound/notif.mp3" bind:this={audio} />
</div>

<style>
	audio {
		display: none;
	}

	.aboutMeMessage {
		background: var(--primary-color);
		padding: 1rem;
		border-radius: 10px;
		width: 80%;
		position: relative;
		z-index: 2;
		margin-bottom: 0.5rem;
	}

	.left {
		align-self: flex-start;
	}

	.right {
		align-self: flex-end;
	}

	.left::after {
		content: '';
		z-index: 1;
		position: absolute;
		left: -0.6rem;
		bottom: -0.7rem;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-top: 25px solid var(--primary-color);
		transform: rotate(45deg);
	}

	.right::after {
		content: '';
		z-index: 1;
		position: absolute;
		right: -0.6rem;
		bottom: -0.7rem;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-top: 25px solid var(--primary-color);
		transform: rotate(-45deg);
	}
</style>
