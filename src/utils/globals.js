import { marked } from 'marked';

// To transform Markdown text to HTML
export function convertMarkdownToHTML(markdown) {
  try {
    return marked(markdown);
  } catch {
    return undefined;
  }
}

// To get the device screen resolution 
export function getScreenResolution() {
  return window.innerWidth;
}