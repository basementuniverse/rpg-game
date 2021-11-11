import { vec } from '@basementuniverse/commonjs';

/**
 * Generate a WallMap (an object where keys are stringified vectors and values are booleans
 * representing the presence/absence of a wall) from a flat array of booleans
 */
export default function generateWallMap(
  m: boolean[],
  w: number
): Record<string, boolean> {
  return Object.fromEntries(m.map((n, i) => [vec.str(vec(i % w, Math.floor(i / w))), n]));
}
