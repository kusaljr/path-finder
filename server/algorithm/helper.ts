import { Database } from "sqlite";
import sqlite3 from "sqlite3";

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface GraphObject {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  nodes?: number[];
  tags?: { [key: string]: string };
}

export async function findNearestNode(
  db: Database<sqlite3.Database, sqlite3.Statement>,
  latitude: number,
  longitude: number
): Promise<GraphObject> {
  let nearestNode: GraphObject | undefined;
  let minDistance = Number.MAX_VALUE;

  const nodes = await db.all("SELECT * FROM nodes");
  nodes.forEach((node: any) => {
    const distance = calculateDistance(latitude, longitude, node.lat, node.lon);
    if (distance < minDistance) {
      minDistance = distance;
      nearestNode = node;
    }
  });

  if (!nearestNode) {
    throw new Error("No nodes found in the graph.");
  }

  return nearestNode;
}
