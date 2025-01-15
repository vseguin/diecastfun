import { MongoClient, ServerApiVersion } from "mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const mongoClient = new MongoClient(process.env.MONGO_DB_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});

const formatCarAsText = (doc: any) => {
  const car = doc.metadata;
  return `ID: ${car.id}, Name: ${car.brand} ${car.model}${car.year ? " " + car.year : ""}, Maker: ${car.maker}, Color: ${car.color}, Era: ${car.era}, Categories: ${car.tags.map((t: any) => t.tags).join(",")}`;
};

const query =
  "Give me a comma-separated list of 8 different car ids similar to datsunpickup1977 in the collection. Avoid duplicate ids in the list";

const loadData = async () => {
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  const collection = mongoClient.db("diecastfun").collection("cars");
  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection: collection,
    indexName: "vector_index",
    embeddingKey: "car_embedding",
  });

  const retriever = vectorStore.asRetriever(100);
  const prompt = PromptTemplate.fromTemplate(
    `You are a car dabatase representing a collection I own. Answer the question based on the following list of cars: {context}. Question: {question}`,
  );
  const model = new ChatOpenAI({ temperature: 0.5 });

  const runnable = RunnableSequence.from([
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const context = (await retriever.invoke(query))
    .map((doc) => formatCarAsText(doc))
    .join("\n") as any;

  console.log(context);

  const answer = await runnable.invoke({
    context,
    question: query,
  });

  console.log(answer);
};

loadData();
