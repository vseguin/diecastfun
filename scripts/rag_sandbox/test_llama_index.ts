import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { stringify } from "csv-stringify";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import { MongoClient, ServerApiVersion } from "mongodb";
import {
  IngestionPipeline,
  MongoDBAtlasVectorSearch,
  OpenAIEmbedding,
  SentenceSplitter,
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
  await collection.deleteMany();
};

// eslint-disable-next-line no-unused-vars
const loadData = async () => {
  const writableStream = fs.createWriteStream(`data/${filename}`);
  const cars = await prisma.cars.findMany({
    include: {
      tags: true,
    },
  });

  const stringifier = stringify({ header: true, columns: columns });
  for (const car of cars) {
    const { id, brand, model, maker, era, tags, color, year } = car;

    stringifier.write({
      id,
      brand,
      model,
      maker,
      era,
      color,
      year,
      categories: tags.map((t) => t.tags).join(";"),
    });
  }

  await stringifier.pipe(writableStream);

  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData("data");

  console.log(documents);

  const pipeline = new IngestionPipeline({
    documents: documents,
    vectorStore,
    transformations: [
      new SentenceSplitter({ chunkSize: 1024, chunkOverlap: 20 }),
      new OpenAIEmbedding(),
    ],
  });

  await pipeline.run({ documents });

  console.log("Pipeline ran!");
};

const runLlama = async () => {
  const index = VectorStoreIndex.fromVectorStore(vectorStore);

  const query = (await index).asQueryEngine({ similarityTopK: 5 });

  const response = await query.query({
    query: "List 5 similar cars to the Audi S4 Quattro",
  });

  console.log(response);
};

//cleanup();
//loadData();
runLlama();
