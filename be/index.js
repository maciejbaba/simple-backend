const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors")
require("dotenv").config(); // in order for the .env file to work

const app = express();

app.use(express.json());

app.use(cors())

const dbUrl = process.env.MONGODB_URL;
const client = new MongoClient(dbUrl);

const dbName = "washing-machines-db";
const collectionName = "washing-machines-collection";

const PORT = 3000;

async function getAllWaschingMachines() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const allMachines = await collection.find({}).toArray();

  return allMachines;
}
app.get("/washing-machines", async (req, res) => {
  const washingMachines = await getAllWaschingMachines();

  res.send({ data: washingMachines });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
