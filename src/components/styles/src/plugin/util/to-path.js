/* eslint-disable no-useless-escape */
/**
 * Parse a path string into an array of path segments.
 *
 * Square bracket notation `a[b]` may be used to "escape" dots that would otherwise be interpreted as path separators.
 *
 * Example:
 * a -> ['a']
 * a.b.c -> ['a', 'b', 'c']
 * a[b].c -> ['a', 'b', 'c']
 * a[b.c].e.f -> ['a', 'b.c', 'e', 'f']
 * a[b][c][d] -> ['a', 'b', 'c', 'd']
 *
 * @param {string|string[]} path
 **/
export function toPath(path) {
  if (Array.isArray(path)) return path;

  const openBrackets = path.split("[").length - 1;
  const closedBrackets = path.split("]").length - 1;

  if (openBrackets !== closedBrackets) {
    throw new Error(`Path is invalid. Has unbalanced brackets: ${path}`);
  }

  return path.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
}
