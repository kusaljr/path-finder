import * as es from "event-stream";
import * as fs from "fs";
import * as JSONStream from "JSONStream";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

async function main() {
  const db = await open({
    filename: "./map-graph.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS nodes (
      id INTEGER PRIMARY KEY,
      lat REAL,
      lon REAL,
      tags TEXT
    );
    
    CREATE TABLE IF NOT EXISTS ways (
      id INTEGER PRIMARY KEY,
      nodes TEXT,
      tags TEXT
    );
  `);

  const nodes: { [id: number]: any } = {};
  const ways: any[] = [];

  const stream = fs.createReadStream("./map-data.json", { encoding: "utf-8" });

  stream
    .pipe(JSONStream.parse("elements.*"))
    .pipe(
      es.mapSync((obj: any) => {
        if (obj.type === "node") {
          nodes[obj.id] = obj;
        } else if (obj.type === "way") {
          ways.push(obj);
        }
      })
    )
    .on("end", async () => {
      try {
        await db.run("BEGIN TRANSACTION");

        for (const nodeId in nodes) {
          const node = nodes[nodeId];
          await db.run(
            "INSERT INTO nodes (id, lat, lon, tags) VALUES (?, ?, ?, ?)",
            node.id,
            node.lat,
            node.lon,
            JSON.stringify(node.tags)
          );
        }

        for (const way of ways) {
          await db.run(
            "INSERT INTO ways (id, nodes, tags) VALUES (?, ?, ?)",
            way.id,
            JSON.stringify(way.nodes),
            JSON.stringify(way.tags)
          );
        }

        await db.run("COMMIT");

        console.log("Graph has been written to map-graph.db");
      } catch (err) {
        await db.run("ROLLBACK");
        console.error("Error processing file:", err);
      } finally {
        await db.close();
      }
    })
    .on("error", (err: any) => {
      console.error("Error processing file:", err);
    });
}

main();
