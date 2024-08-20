import { PineconeClient } from 'pinecone-client';

const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

export default pinecone;
