<script>
	import { desktopApps } from '../../store.js';

	export let appName;

	const handleClose = () => {
		$desktopApps = $desktopApps.filter((item) => {
			return item !== appName;
		});

		console.log($desktopApps);
	};

	export let xPosition = '200px';
	export let yPosition = '200px';
	let xOffset;
	let yOffset;

	const setPosition = (x, y) => {
		xPosition = `${x}px`;
		yPosition = `${y}px`;
	};

	function dragstart(e) {
		document.onmousemove = move;
		document.ontouchmove = move;
		xOffset = e.offsetX;
		yOffset = e.offsetY;
	}

	function drop() {
		document.onmousemove = '';
		document.ontouchmove = '';
	}

	function move(e) {
		console.log(xPosition);
		console.log(e);
		let dragx = e.pageX - xOffset;
		let dragy = e.pageY - yOffset;

		setPosition(dragx, dragy);
	}
</script>

<div style="top: {yPosition}; left: {xPosition}" class="app">
	<div
		on:touchstart={dragstart}
		on:touchend={drop}
		on:mousedown={dragstart}
		on:mouseup={drop}
		class="appMenu"
	>
		<button on:click={handleClose}>CLOSE</button>
	</div>

	<div class="appDesktopWrapper">
		<slot />
	</div>
</div>

<style>
	.appMenu {
		position: relative;
		z-index: 5;
		background: pink;
		padding: 0.5rem;
		border-radius: 0.9rem 0.9rem 0 0;
	}

	.app {
		position: absolute;
		top: 50px;
		left: 50px;
	}

	.appDesktopWrapper {
		border-radius: 0 0 0.9rem 0.9rem;
		position: relative;
		background-color: var(--dark-color);
		padding: 2rem;
		overflow-y: scroll;
	}
</style>
