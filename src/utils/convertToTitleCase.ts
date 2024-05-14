export function convertToTitleCase(name: string): string {
  if (!name) {
    return '';
  }
  return name.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}
