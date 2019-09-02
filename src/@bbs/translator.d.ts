export function translate(text: string, language: ((translated) => void) | string,
                          callback?: (translated) => any): Promise<string>;
export function unescape(content: string): string;
