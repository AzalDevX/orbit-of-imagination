// useTheme.js
import { ref, onBeforeMount, watchEffect } from 'vue';
import config from './config.js';
import colors from './colors.js';

const localStorageKey = config.web.local_storage_key;
const theme = ref(localStorage.getItem(localStorageKey) || config.web.theme);
const colorScheme = ref(colors[theme.value]);


watchEffect(() => {
  const storedTheme = localStorage.getItem(localStorageKey);
  if (storedTheme && storedTheme !== theme.value) {
    theme.value = storedTheme;
    colorScheme.value = colors[theme.value];
    updateStyles();
  }
});

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  colorScheme.value = colors[theme.value];
  persistTheme();
  updateStyles();
}

function persistTheme() {
  localStorage.setItem(localStorageKey, theme.value);
}

function updateStyles() {
  for (const color in colorScheme.value) {
    document.documentElement.style.setProperty(color, colorScheme.value[color]);
  }
}

export default function useTheme() {
  onBeforeMount(() => {
    updateStyles(); 
  });

  return { theme, colorScheme, toggleTheme };
}
