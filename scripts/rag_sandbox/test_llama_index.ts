import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { stringify } from "csv-stringify";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import { MongoClient, ServerApiVersion } from "mongodb";
import {
  IngestionPipeline,
  MongoDBAtlasVectorSearch,
  VectorStoreIndex,
} from "llamaindex";
const filename = "cars.csv";

const prisma = new PrismaClient();

const columns = [
  "id",
  "brand",
  "maker",
  "model",
  "year",
  "era",
  "color",
  "categories",
];

const vectorStore = new MongoDBAtlasVectorSearch({
  dbName: "diecastfun",
  collectionName: "llamatest",
});

// eslint-disable-next-line no-unused-vars
const cleanup = async () => {
  const mongoClient = new MongoClient(process.env.MONGO_DB_URL as string, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  const collection = mongoClient.db("diecastfun").collection("llamatest");
  await collection.deleteMany({ content: { $exists: true } });
};

// eslint-disable-next-line no-unused-vars
const loadData = async () => {
  const writableStream = fs.createWriteStream(filename);
  const cars = await prisma.cars.findMany({
    include: {
      tags: true,
    },
  });

  const stringifier = stringify({ header: true, columns: columns });
  for (const car of cars) {
    stringifier.write(car);
  }

  stringifier.pipe(writableStream);

  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData("data");

  const pipeline = new IngestionPipeline({
    documents: documents,
    vectorStore,
  });

  await pipeline.run({ documents });
};

const runLlama = async () => {
  const index = VectorStoreIndex.fromVectorStore(vectorStore);

  const query = (await index).asQueryEngine({ similarityTopK: 2 });

  const response = await query.query({
    query:
      "Can you give me 5 models similar to BMW Alpina B7 xDrive, giving me a csv list of ids, brand, model and maker",
  });

  console.log(response);
};

//loadData();
//cleanup();
runLlama();
