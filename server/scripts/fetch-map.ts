import axios from "axios";
import * as fs from "fs";
const fetchMapData = async () => {
  const south = 27.92;
  const west = 83.652;
  const north = 28.573;
  const east = 84.244;
  const query = `
    [out:json];
    (
      way["highway"](${south},${west},${north},${east});
      node(w);
    );
    out body;
    >;
    out skel qt;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await axios.get(url);

    // Save the data to a file
    fs.writeFileSync("map-data.json", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error fetching map data:", error);
    return null;
  }
};

fetchMapData();
