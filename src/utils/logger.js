export const Logger = {
  info: (tag, message, data) => console.log(`[${tag}] ${message}`, data || ''),
  warn: (tag, message, error) => console.warn(`[${tag}] ⚠️ ${message}`, error || ''),
  error: (tag, message, error) => console.error(`[${tag}] ❌ ${message}`, error || ''),
};
