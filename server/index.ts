import Express from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { aStar } from "./algorithm/astar";
import { findNearestNode } from "./algorithm/helper";

const app = Express();

async function openDatabase() {
  return open({
    filename: "./map-graph.db",
    driver: sqlite3.Database,
  });
}

app.get("/nearest-rider", async (req, res) => {
  const nearestRiders = [
    {
      // 28.198430, 83.991573
      latitude: 28.19843,
      longitude: 83.991573,
    },

    {
      //28.199295, 83.988397
      latitude: 28.199295,
      longitude: 83.988397,
    },
  ];

  res.json(nearestRiders);
});

app.get("/path", async (req, res) => {
  const {
    currentLatitude,
    currentLongitude,
    destinationLatitude,
    destinationLongitude,
  } = req.query;

  if (
    !currentLatitude ||
    !currentLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  ) {
    res.status(400).send("Invalid query parameters");
    return;
  }

  const db = await openDatabase();

  const current = {
    latitude: parseFloat(currentLatitude as string),
    longitude: parseFloat(currentLongitude as string),
  };

  const destination = {
    latitude: parseFloat(destinationLatitude as string),
    longitude: parseFloat(destinationLongitude as string),
  };

  try {
    const startNode = await findNearestNode(
      db,
      current.latitude,
      current.longitude
    );
    const goalNode = await findNearestNode(
      db,
      destination.latitude,
      destination.longitude
    );

    console.log({
      goalNode,
      startNode,
    });

    const path = await aStar(db, startNode.id, goalNode.id);

    console.log(path);

    const pathNodes = await Promise.all(
      path.map(async (nodeId) => {
        return await db.get("SELECT * FROM nodes WHERE id = ?", nodeId);
      })
    );

    res.json(pathNodes);
  } catch (error) {
    res.status(500).send(error.message);
  } finally {
    await db.close();
  }
});

app.listen(6969, () => {
  console.log("Server is running on port 3000");
});
