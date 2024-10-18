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

let db;
let collection;

client
  .connect()
  .then((client) => {
    db = client.db(dbName);
    collection = db.collection(collectionName);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

async function getAllWaschingMachines() {
  const allMachines = await collection.find({}).toArray();

  return allMachines;
}

app.get("/washing-machines", async (_, res) => {
  const washingMachines = await getAllWaschingMachines();

  res.send({ data: washingMachines });
});

