import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";
import { MongoClient, ServerApiVersion } from "mongodb";

console.log("Running sandbox");

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const mongoClient = new MongoClient(process.env.MONGO_DB_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const loadData = async () => {
  const cars = await prisma.cars.findMany({
    include: {
      tags: true,
    },
  });
  const collection = mongoClient.db("diecastfun").collection("cars");

  console.log(`Loaded ${cars.length} cars`);

  for (const car of cars) {
    const carAsText = `Name: ${car.brand} ${car.model}${car.year ? " " + car.year : ""}, Maker: ${car.maker}, Color: ${car.color}, Era: ${car.era}, Categories: ${car.tags.map((t) => t.tags).join(",")}`;

    console.log(carAsText);

    const existingCar = await collection.findOne({ id: car.id });
    if (existingCar != null) {
      console.log(`Car ${car.id} already exists`);
      continue;
    }

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: carAsText,
      encoding_format: "float",
    });

    const mongoDoc = { ...car, car_embedding: embedding.data[0].embedding };
    const result = await collection.insertOne(mongoDoc);

    console.log(result);

    await new Promise((resolve) => setTimeout(resolve, 300));
  }
};

loadData();
