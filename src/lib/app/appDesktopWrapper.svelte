<script>
	import { onDestroy, onMount } from 'svelte';
	import { desktopApps } from '../../store.js';
	import Icon from '../icon.svelte';

	export let appName;

	const handleClose = () => {
		$desktopApps = $desktopApps.filter((item) => {
			return item !== appName;
		});
	};

	export let zIndex;
	export let xInitial;
	export let yInitial;
	export let focusedWindow;
	let xPosition = xInitial;
	let yPosition = yInitial;
	let xOffset;
	let yOffset;
	let rect;
	let target;
	let isResizing = false;
	let currentResizer;
	let desktopWindow;
	let windowWidth = '500px';
	let windowHeight = '500px';
	let oldWindowWidth;
	let oldWindowHeight;
	let oldXPosition;
	let oldYPosition;
	let isMaximised = false;

	const handleResizing = (e) => {
		currentResizer = e.target;
		isResizing = true;

		xPosition = e.clientX;
		yPosition = e.clientY;

		document.onmousemove = resizeMove;
		document.onmouseup = handleStopResizing;
	};

	const handleStopResizing = () => {
		document.onmousemove = '';
		document.onmouseup = '';
		isResizing = false;
	};

	const resizeMove = (e) => {
		const rect = desktopWindow.getBoundingClientRect();

		if (currentResizer.classList.contains('resizer-rb')) {
			windowWidth = e.clientX - rect.x + 'px';
			windowHeight = e.clientY - rect.y + 'px';
		}
		if (currentResizer.classList.contains('resizer-lb')) {
			windowWidth = rect.right - e.clientX + 'px';
			windowHeight = e.clientY - rect.y + 'px';
			xPosition = e.clientX + 'px';
		}
		if (currentResizer.classList.contains('resizer-lt')) {
			windowWidth = rect.right - e.clientX + 'px';
			windowHeight = rect.bottom - e.clientY + 'px';
			xPosition = e.clientX + 'px';
			yPosition = e.clientY + 'px';
		}
		if (currentResizer.classList.contains('resizer-rt')) {
			windowWidth = e.clientX - rect.x + 'px';
			windowHeight = rect.bottom - e.clientY + 'px';
			yPosition = e.clientY + 'px';
		}
	};

	const setPosition = (x, y) => {
		xPosition = `${x}px`;
		yPosition = `${y}px`;
	};

	const handleTouchStart = (e) => {
		if (!isResizing && !isMaximised) {
			document.ontouchmove = touchMove;
			document.ontouchend = handleTouchDrop;

			target = e.target;
			//Get offsetX and offsetY which is the position inside the div that i have clicked bc for SOME reason touch es dont have it.
			rect = e.target.getBoundingClientRect();
			xOffset = e.touches[0].clientX - window.pageXOffset - rect.left;
			yOffset = e.touches[0].clientY - window.pageYOffset - rect.top;
		}
	};

	const handleTouchDrop = () => {
		document.ontouchmove = '';
		document.ontouchend = '';
	};

	const touchMove = (e) => {
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
		if (!isResizing && !isMaximised) {
			document.onmousemove = mouseMove;
			document.onmouseup = handleMouseDrop;

			target = e.target;
			rect = e.target.getBoundingClientRect();

			xOffset = e.offsetX;
			yOffset = e.offsetY;
		}
	};

	const handleMouseDrop = () => {
		document.onmousemove = '';
		document.onmouseup = '';
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

	const handleMaximiseMinimise = () => {
		if (!isMaximised) {
			oldWindowWidth = windowWidth;
			oldWindowHeight = windowHeight;
			oldYPosition = yPosition;
			oldXPosition = xPosition;

			desktopWindow.style.transition =
				'width .5s ease-out, height .5s ease-out, top .5s ease-out, left .5s ease-out';

			yPosition = '0px';
			xPosition = '0px';
			windowWidth = '100%';
			windowHeight = '100%';

			isMaximised = true;
		} else {
			windowWidth = oldWindowWidth;
			windowHeight = oldWindowHeight;
			xPosition = oldXPosition;
			yPosition = oldYPosition;

			setTimeout(() => {
				isMaximised = false;
				desktopWindow.style.transition = null;
			}, 500);
		}
	};

	onMount(() => {
		focusedWindow = appName;
		document.addEventListener('mouseleave', handleMouseLeave);
	});

	onDestroy(() => {
		document.removeEventListener('mouseleave', handleMouseLeave);
	});
</script>

<div
	style="top: {yPosition}; left: {xPosition}; width: {windowWidth}; height: {windowHeight}; z-index: {zIndex}"
	bind:this={desktopWindow}
	class="app"
	on:mousedown={() => (focusedWindow = appName)}
	on:touchstart={() => (focusedWindow = appName)}
>
	<div on:touchstart={handleTouchStart} on:mousedown={handleMouseStart} class="appMenu">
		<button class="close" on:click={handleClose} aria-label="close window">
			<span> x </span>
		</button>

		<button
			class="maximise"
			on:click={handleMaximiseMinimise}
			aria-label="maximise/minimise window"><span>^</span></button
		>
	</div>

	<div class="appDesktopWrapper">
		<slot />
	</div>

	<div class:disabled={isMaximised} on:mousedown={handleResizing} class="resizer-lt resizer" />
	<div class:disabled={isMaximised} on:mousedown={handleResizing} class="resizer-rt resizer" />
	<div class:disabled={isMaximised} on:mousedown={handleResizing} class="resizer-lb resizer" />
	<div class:disabled={isMaximised} on:mousedown={handleResizing} class="resizer-rb resizer" />
</div>

<style>
	.disabled {
		display: none;
	}

	.resizer {
		background: pink;
		width: 0.7rem;
		height: 0.7rem;
		position: absolute;
		opacity: 0;
	}

	.resizer-lt {
		top: -1px;
		left: -1px;
		cursor: nw-resize;
	}

	.resizer-rt {
		top: -1px;
		right: -1px;
		cursor: ne-resize;
	}

	.resizer-lb {
		bottom: -1px;
		left: -1px;
		cursor: sw-resize;
	}

	.resizer-rb {
		bottom: -1px;
		right: -1px;
		cursor: se-resize;
	}

	.appMenu {
		position: relative;
		background: var(--light-color);
		padding: 0.5rem;
		display: flex;
		align-items: center;
		border-radius: 0.9rem 0.9rem 0 0;
		flex: none;
	}

	.appMenu .close {
		margin-left: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background: red;
	}

	.appMenu .maximise {
		margin-left: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background: #48dd48;
	}

	.appMenu button span {
		font-size: 0.6rem;
		display: none;
	}

	.appMenu button:hover span {
		display: block;
	}

	.app {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 50px;
		left: 50px;
		max-width: 100%;
		max-height: 100%;
		min-width: 15rem;
		min-height: 10rem;
		user-select: none;
		box-shadow: 0px 2.76626px 10.3735px 6.91564px rgba(0, 0, 0, 0.25);
		border-radius: 0.9rem;
	}

	.appDesktopWrapper {
		flex: 1;
		border-radius: 0 0 0.9rem 0.9rem;
		position: relative;
		background-color: var(--dark-color);
		padding: 2rem;
		overflow-y: auto;
	}
</style>
