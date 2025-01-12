import OpenAI from "openai";
import { MongoClient, ServerApiVersion } from "mongodb";

console.log("Running sandbox");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const mongoClient = new MongoClient(process.env.MONGO_DB_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});

const getCarAsText = (car: any) => {
  return `ID: ${car.id}, Name: ${car.brand} ${car.model}${car.year ? " " + car.year : ""}, Maker: ${car.maker}, Color: ${car.color}, Era: ${car.era}, Categories: ${car.tags.map((t: any) => t.tags).join(",")}`;
};

const query = "Give me details about all the Mazda RX-7 variants I have.";

const loadData = async () => {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: query,
    encoding_format: "float",
  });

  console.log(embedding);

  const collection = mongoClient.db("diecastfun").collection("cars");

  const pipeline = [
    {
      $vectorSearch: {
        index: "vector_index",
        queryVector: embedding.data[0].embedding,
        path: "car_embedding",
        numCandidates: 150,
        limit: 50,
      },
    },
    {
      $project: {
        _id: 0,
        id: 1,
        brand: 1,
        model: 1,
        year: 1,
        maker: 1,
        color: 1,
        era: 1,
        tags: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ];

  const results = await collection.aggregate(pipeline);
  const search_results = [];
  for await (const result of results) {
    search_results.push(getCarAsText(result));
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a car diecast database." },
      {
        role: "user",
        content:
          "Answer this user query: " +
          query +
          " with the following context: " +
          search_results,
      },
    ],
  });

  console.log(completion.choices[0].message.content);
};

loadData();
