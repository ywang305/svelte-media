import { writable, derived } from 'svelte/store';

export const language = writable(window.navigator.language);

export const isZh = derived(language, ($language) => {
  const tested = /^zh/i.test($language);
  return tested;
});
