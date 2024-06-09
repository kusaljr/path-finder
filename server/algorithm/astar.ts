import FastPriorityQueue from "fastpriorityqueue";
import { Database } from "sqlite";
import { calculateDistance } from "./helper";

type NodeCoords = [number, number];
type NodeCache = Map<number, NodeCoords>;
type HeuristicCache = Map<string, number>;

interface AStarNode {
  id: number;
  g: number;
  h: number;
  f: number;
  parent?: AStarNode;
}

const HEURISTIC_CACHE: HeuristicCache = new Map<string, number>();

function calculateHeuristic(
  node1: number,
  node2: number,
  nodeCache: NodeCache
): number {
  const key = `${node1}-${node2}`;
  if (!HEURISTIC_CACHE.has(key)) {
    const [lat1, lon1] = nodeCache.get(node1)!;
    const [lat2, lon2] = nodeCache.get(node2)!;
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    HEURISTIC_CACHE.set(key, distance);
  }
  return HEURISTIC_CACHE.get(key)!;
}

async function getNodeCoords(
  db: Database,
  nodeId: number,
  nodeCache: NodeCache
): Promise<NodeCoords> {
  if (!nodeCache.has(nodeId)) {
    const result = await db.get<{ lat: number; lon: number }>(
      "SELECT lat, lon FROM nodes WHERE id = ?",
      nodeId
    );
    nodeCache.set(nodeId, [result.lat, result.lon]);
  }
  return nodeCache.get(nodeId)!;
}

async function getNeighbors(db: Database, nodeId: number): Promise<number[]> {
  const ways = await db.all<{ nodes: string }[]>(
    "SELECT nodes FROM ways WHERE nodes LIKE ?",
    `%${nodeId}%`
  );

  const neighborIds = new Set<number>();
  for (const way of ways) {
    const nodes: number[] = JSON.parse(way.nodes);
    const nodeIndex = nodes.indexOf(nodeId);

    if (nodeIndex > 0) neighborIds.add(nodes[nodeIndex - 1]);
    if (nodeIndex < nodes.length - 1) neighborIds.add(nodes[nodeIndex + 1]);
  }
  return Array.from(neighborIds);
}

export async function aStar(
  db: Database,
  start: number,
  goal: number,
  maxDistanceThreshold?: number,
  maxOpenSetSize: number = 10000 // Limit for open set size
): Promise<number[]> {
  const openSet = new FastPriorityQueue<AStarNode>((a, b) => a.f < b.f);
  const openSetMap: Map<number, AStarNode> = new Map();
  const closedSet: Set<number> = new Set();
  const nodeCache: NodeCache = new Map();

  await getNodeCoords(db, start, nodeCache);
  await getNodeCoords(db, goal, nodeCache);

  const startNode: AStarNode = {
    id: start,
    g: 0,
    h: calculateHeuristic(start, goal, nodeCache),
    f: calculateHeuristic(start, goal, nodeCache),
  };
  openSet.add(startNode);
  openSetMap.set(startNode.id, startNode);

  while (!openSet.isEmpty()) {
    const currentNode = openSet.poll()!;
    openSetMap.delete(currentNode.id);

    if (currentNode.id === goal) {
      const path: number[] = [];
      let current: AStarNode | undefined = currentNode;
      while (current) {
        path.unshift(current.id);
        current = current.parent;
      }
      return path;
    }

    closedSet.add(currentNode.id);

    if (maxDistanceThreshold && currentNode.f > maxDistanceThreshold) {
      return [];
    }

    const neighborIds = await getNeighbors(db, currentNode.id);

    const neighborCoordsPromises = neighborIds.map((id) =>
      getNodeCoords(db, id, nodeCache)
    );
    await Promise.all(neighborCoordsPromises); // Preload all neighbor coordinates

    neighborIds.forEach((neighborId) => {
      if (closedSet.has(neighborId)) return;

      const [lat1, lon1] = nodeCache.get(currentNode.id)!;
      const [lat2, lon2] = nodeCache.get(neighborId)!;
      const g = currentNode.g + calculateDistance(lat1, lon1, lat2, lon2);
      const h = calculateHeuristic(neighborId, goal, nodeCache);
      const f = g + h;
      const neighborNode: AStarNode = {
        id: neighborId,
        g,
        h,
        f,
        parent: currentNode,
      };

      const openNode = openSetMap.get(neighborId);
      if (!openNode || g < openNode.g) {
        if (openSet.size < maxOpenSetSize) {
          openSet.add(neighborNode);
          openSetMap.set(neighborId, neighborNode);
        } else {
          // Handle the situation where the open set size limit is reached
          const worstNode = openSet.peek();
          if (worstNode && neighborNode.f < worstNode.f) {
            openSet.poll();
            openSet.add(neighborNode);
            openSetMap.set(neighborId, neighborNode);
          }
        }
      }
    });
  }
  return [];
}
