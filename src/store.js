import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const mobileApp = writable('');
export const desktopApps = writable([]);
export const innerWidth = writable(0);

const createTheme = () => {
	let defaultTheme = 'light';
	if (browser) {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			document.documentElement.className = storedTheme;
			defaultTheme = storedTheme;
		} else {
			const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
			localStorage.setItem('theme', preferredColorScheme);
			document.documentElement.className = preferredColorScheme;
			defaultTheme = preferredColorScheme;
		}
	}

	const { subscribe, set } = writable(defaultTheme);

	return {
		subscribe,
		set: (theme) => {
			set(theme);
			localStorage.setItem('theme', theme);
			if (browser) {
				document.documentElement.className = theme;
			}
		}
	};
};

export const theme = createTheme();
