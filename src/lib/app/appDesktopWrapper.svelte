<script>
	import { onDestroy, onMount } from 'svelte';
	import { desktopApps } from '../../store.js';

	export let appName;

	const handleClose = () => {
		$desktopApps = $desktopApps.filter((item) => {
			return item !== appName;
		});

		console.log($desktopApps);
	};

	export let zIndex;
	export let xPosition = '200px';
	export let yPosition = '200px';
	let xOffset;
	let yOffset;
	let rect;
	let target;

	const setPosition = (x, y) => {
		xPosition = `${x}px`;
		yPosition = `${y}px`;
	};

	const handleTouchStart = (e) => {
		document.ontouchmove = touchMove;

		target = e.target;
		//Get offsetX and offsetY which is the position inside the div that i have clicked bc for SOME reason touch es dont have it.
		rect = e.target.getBoundingClientRect();
		xOffset = e.touches[0].clientX - window.pageXOffset - rect.left;
		yOffset = e.touches[0].clientY - window.pageYOffset - rect.top;
	};

	const handleTouchDrop = () => {
		document.ontouchmove = '';
	};

	const touchMove = (e) => {
		console.log(e);
		let clientX = e.targetTouches[0].clientX;
		let clientY = e.targetTouches[0].clientY;

		let dragX = clientX - xOffset;
		let dragY = clientY - yOffset;

		if (
			dragY <= 0 ||
			dragX <= 0 ||
			dragX + rect.width >= window.innerWidth ||
			dragY + target.offsetParent.offsetHeight >= window.innerHeight
		) {
			return;
		}

		setPosition(dragX, dragY);
	};

	const handleMouseStart = (e) => {
		document.onmousemove = mouseMove;

		target = e.target;
		rect = e.target.getBoundingClientRect();

		xOffset = e.offsetX;
		yOffset = e.offsetY;
	};

	const handleMouseDrop = () => {
		document.onmousemove = '';
	};

	const mouseMove = (e) => {
		let dragX = e.pageX - xOffset;
		let dragY = e.pageY - yOffset;

		if (
			dragY <= 0 ||
			dragX <= 0 ||
			dragX + rect.width >= window.innerWidth ||
			dragY + target.offsetParent.offsetHeight >= window.innerHeight
		) {
			console.log('height: ', window.innerHeight);
			console.log('n: ', dragY + e.target.offsetParent.clientHeight);
			return;
		}

		setPosition(dragX, dragY);
	};

	const handleMouseLeave = (e) => {
		if (
			e.clientY <= 0 ||
			e.clientX <= 0 ||
			e.clientX >= window.innerWidth ||
			e.clientY >= window.innerHeight
		) {
			document.onmousemove = '';
			document.ontouchmove = '';
		}
	};

	onMount(() => {
		document.addEventListener('mouseleave', handleMouseLeave);
	});

	onDestroy(() => {
		document.removeEventListener('mouseleave', handleMouseLeave);
	});
</script>

<div style="top: {yPosition}; left: {xPosition}; z-index: {zIndex}" class="app">
	<div
		on:touchstart={handleTouchStart}
		on:touchend={handleTouchDrop}
		on:mousedown={handleMouseStart}
		on:mouseup={handleMouseDrop}
		class="appMenu"
	>
		<button on:click={handleClose}>
			<span> x </span>
		</button>
	</div>

	<div class="appDesktopWrapper">
		<slot />
	</div>
</div>

<style>
	.appMenu {
		position: relative;
		background: var(--light-color);
		padding: 0.5rem;
		display: flex;
		align-items: center;
		border-radius: 0.9rem 0.9rem 0 0;
	}

	.appMenu button {
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background: red;
	}

	.appMenu button span {
		width: 0.8rem;
		height: 0.8rem;
		font-size: 0.6rem;
		display: none;
	}

	.appMenu button:hover span {
		display: block;
	}

	.app {
		position: absolute;
		top: 50px;
		left: 50px;
		user-select: none;
	}

	.appDesktopWrapper {
		border-radius: 0 0 0.9rem 0.9rem;
		position: relative;
		background-color: var(--dark-color);
		padding: 2rem;
		overflow-y: auto;
		height: 25rem;
		width: 30rem;
	}
</style>
