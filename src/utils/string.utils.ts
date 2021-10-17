/** Convert a string to camel case format */
export function toCamelCase(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match: string, index: number) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

/** Convert a string to kebab case format */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z]|[A-Z])([A-Z])/g, "$1-$2") // get all lowercase letters that are near to uppercase ones
    .replace(/[\s_]+/g, "-") // replace all spaces and low dash
    .toLowerCase();
}

/** Convert a string to snake case format */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z]|[A-Z])([A-Z])/g, "$1_$2") // get all lowercase letters that are near to uppercase ones
    .replace(/[\s-]+/g, "_") // replace all spaces and mid dash
    .toLowerCase();
}
