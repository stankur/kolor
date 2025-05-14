import removeMarkdown from 'remove-markdown';

/**
 * Removes markdown formatting from text
 * @param text Text to process
 * @returns Plain text without markdown formatting
 */
export function cleanMarkdown(text: string): string {
  return removeMarkdown(text.trim());
}

/**
 * Process an array of strings, joining them and removing markdown
 * @param textArray Array of strings to process
 * @returns Cleaned, joined string
 */
export function processTextArray(textArray: string[] | undefined): string {
  if (!textArray || textArray.length === 0) return '';
  
  return cleanMarkdown(textArray.join(' '));
}
