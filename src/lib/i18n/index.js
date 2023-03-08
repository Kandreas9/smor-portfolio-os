import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = browser ? localStorage.getItem('lang') : 'en';

register('en', () => import('./locales/en.json'));
register('fr', () => import('./locales/fr.json'));

init({
	fallbackLocale: 'en',
	initialLocale: defaultLocale ? defaultLocale : 'en'
});
