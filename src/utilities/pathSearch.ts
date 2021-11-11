import { vec } from '@basementuniverse/commonjs';

class PathNode {
  public constructor(
    public position: vec,
    public g: number = 0,
    public h: number = 0,
    public parent: PathNode | null = null
  ) {}

  public get f(): number {
    return this.g + this.h;
  }
}

type WallMap = Record<string, boolean>;
type NodeMap = Record<string, PathNode>;

function hash(position: vec): string {
  return vec.str(position);
}

function removeNodeFromList(
  list: PathNode[],
  node: PathNode
): void {
  const found = list.findIndex(n => vec.eq(n.position, node.position));
  if (found !== -1) {
    list.splice(found, 1);
  }
}

function isWithinBounds(
  position: vec,
  topLeft: vec,
  bottomRight: vec
): boolean {
  return (
    position.x >= topLeft.x &&
    position.x <= bottomRight.x &&
    position.y >= topLeft.y &&
    position.y <= bottomRight.y
  );
}

function isWall(
  map: WallMap,
  topLeft: vec,
  bottomRight: vec,
  position: vec
): boolean {
  return !isWithinBounds(position, topLeft, bottomRight) || !!map[hash(position)];
}

function heuristic(
  current: vec,
  finish: vec
): number {
  return Math.abs(finish.x - current.x) + Math.abs(finish.y - current.y);
}

function fetchOrAddNode(
  map: NodeMap,
  position: vec
): PathNode {
  const h = hash(position);
  if (!map[h]) {
    map[h] = new PathNode(position);
  }
  return map[h];
}

function getTraversableNeighbours(
  nodeMap: NodeMap,
  wallMap: WallMap,
  topLeft: vec,
  bottomRight: vec,
  current: PathNode
): PathNode[] {
  const result: PathNode[] = [];
  const left = vec(current.position.x - 1, current.position.y);
  const right = vec(current.position.x + 1, current.position.y);
  const up = vec(current.position.x, current.position.y - 1);
  const down = vec(current.position.x, current.position.y + 1);
  if (!isWall(wallMap, topLeft, bottomRight, left)) {
    result.push(fetchOrAddNode(nodeMap, left));
  }
  if (!isWall(wallMap, topLeft, bottomRight, right)) {
    result.push(fetchOrAddNode(nodeMap, right));
  }
  if (!isWall(wallMap, topLeft, bottomRight, up)) {
    result.push(fetchOrAddNode(nodeMap, up));
  }
  if (!isWall(wallMap, topLeft, bottomRight, down)) {
    result.push(fetchOrAddNode(nodeMap, down));
  }
  return result;
}

export default function pathSearch(
  map: WallMap,
  topLeft: vec,
  bottomRight: vec,
  start: vec,
  finish: vec
): vec[] {
  const nodes: NodeMap = {},
    open: PathNode[] = [],
    closed: PathNode[] = [];

  open.push(new PathNode(start));
  while (open.length > 0) {
    let currentNode = open[0];
    for (let i = open.length; i--;) {
      if (open[i].f < currentNode.f) {
        currentNode = open[i];
      }
    }

    // Check if we've found the finish
    if (vec.eq(currentNode.position, finish)) {
      const solution: vec[] = [];
      let c = currentNode;
      while (c.parent) {
        solution.push(c.position);
        c = c.parent;
      }
      return solution.reverse();
    }
    removeNodeFromList(open, currentNode);
    closed.push(currentNode);

    // Check neighbours
    const neighbours = getTraversableNeighbours(
      nodes,
      map,
      topLeft,
      bottomRight,
      currentNode
    );
    for (let i = neighbours.length; i--;) {
      if (closed.find(n => vec.eq(n.position, neighbours[i].position)) !== undefined) {
        continue;
      }
      const g = currentNode.g + 1;
      let minG = false;
      if (open.find(n => vec.eq(n.position, neighbours[i].position)) === undefined) {
        minG = true;
        neighbours[i].h = heuristic(neighbours[i].position, finish);
        open.push(neighbours[i]);
      } else if (g < neighbours[i].g) {
        minG = true;
      }
      if (minG) {
        neighbours[i].parent = currentNode;
        neighbours[i].g = g;
      }
    }
  }
  return [];
}
