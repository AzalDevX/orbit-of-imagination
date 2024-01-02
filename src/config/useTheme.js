// useTheme.js
import { ref, onMounted, onBeforeMount } from 'vue';
import config from './config.js';
import colors from './colors.js';

const localStorageKey = 'OoI-theme';
const theme = ref(localStorage.getItem(localStorageKey) || config.web.theme);
const colorScheme = ref(colors[theme.value]);

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
