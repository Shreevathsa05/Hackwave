import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import ContextSchema from "../../Schema/ContextSchema.js";

// Init embeddings (same config as in loadDocument)
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  model: "text-embedding-004",
});

// Helper to connect to Qdrant
async function connectVectorStore() {
  return new QdrantVectorStore(embeddings, {
    url: process.env.QDRANT_URL,
    collectionName: "doc_chunks",
  });
}

/**
 * Hack: retrieve all docs by doing similarity search with empty query
 */
async function getAllDocs(limit = 50) {
  try {
    const vectorStore = await connectVectorStore();
    const results = await vectorStore.similaritySearch("", limit);
    return results.map(doc => ({
      content: doc.pageContent,
      metadata: doc.metadata,
    }));
  } catch (err) {
    console.error("Error in getAllDocs:", err.message);
    throw err;
  }
}

/**
 * Get docs based on query
 */
async function getDocs(query, limit = 5) {
  try {
    const vectorStore = await connectVectorStore();
    const results = await vectorStore.similaritySearch(query, limit);
    return results.map(doc => ({
      content: doc.pageContent,
      metadata: doc.metadata,
    }));
  } catch (err) {
    console.error("Error in getDocs:", err.message);
    throw err;
  }
}
/**
 * Get complete docs from mongo
 */
async function getContextMongo(sessionId) {
  const results = await ContextSchema.find({ sessionId }).lean();
  return results;
}

export { getAllDocs, getDocs, getContextMongo };
