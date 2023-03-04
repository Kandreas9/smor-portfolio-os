<script>
	import HeaderMenuIcon from './headerMenuIcon.svelte';
	import { mobileApp, desktopApps, innerWidth } from '../../store.js';

	$: isDesktop = $innerWidth >= 769;

	const handleIconClick = (appName) => {
		if (isDesktop) {
			if (!$desktopApps.includes(appName)) {
				$desktopApps = [...$desktopApps, appName];
			}
		} else {
			$mobileApp = appName;
		}
	};
</script>

<header class:nav-app-mode={$mobileApp}>
	<nav>
		<ul>
			{#if !$mobileApp}
				<li class="headerMenuItem">
					<HeaderMenuIcon iconName="about" on:click={() => handleIconClick('about')} />
					<!--<div>About Me</div>-->
				</li>
				<li>
					<HeaderMenuIcon
						iconName="project"
						on:click={() => handleIconClick('project')}
					/>
				</li>
				<li>
					<HeaderMenuIcon iconName="phone" on:click={() => handleIconClick('phone')} />
				</li>
				<li>
					<HeaderMenuIcon
						iconName="setting"
						on:click={() => handleIconClick('setting')}
					/>
				</li>
			{:else}
				<li><HeaderMenuIcon iconName="exit" on:click={() => ($mobileApp = '')} /></li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		flex: 1;
		align-self: center;
		margin-bottom: 1rem;
		transition: margin-bottom 500ms ease-in-out;
	}

	nav {
		height: 100%;
	}

	ul {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		width: 18rem;
		height: 100%;
		border-radius: 20px;
		gap: 1rem;
		background-color: var(--primary-color);
		padding: 1rem 1rem;
		border: 1px solid var(--light-color);
		box-shadow: 0px 2.76626px 10.3735px 6.91564px rgba(0, 0, 0, 0.25);
		position: relative;
		z-index: 3;
		transition: width 500ms ease-in-out, border-radius 500ms ease-in-out,
			padding 500ms ease-in-out;
	}

	.nav-app-mode {
		margin-bottom: 0;
	}

	.nav-app-mode ul {
		border-radius: 0;
		padding: 1.5rem 0;
		width: 100vw;
	}

	.headerMenuItem {
		font-size: 0.7rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}

	@media (min-width: 481px) {
		ul {
			width: 23rem;
			gap: 2rem;
		}
	}
</style>
