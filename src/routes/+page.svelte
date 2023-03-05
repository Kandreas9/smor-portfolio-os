<script context="module">
	export const prerender = true;
</script>

<script>
	import AppMobile from '../lib/app/appMobile.svelte';
	import AppsDesktop from '../lib/app/appsDesktop.svelte';
	import { innerWidth } from '../store.js';

	$: isDesktop = $innerWidth >= 769;
</script>

{#if isDesktop}
	<div class="mainContent">
		<AppsDesktop />
	</div>
{:else}
	<div class="mainContent" />

	<AppMobile />
{/if}

<style>
	.mainContent {
		position: relative;
		height: 100%;
	}
</style>
