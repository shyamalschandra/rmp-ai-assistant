import openai from '../../lib/openai';
import pinecone from '../../lib/pinecone';

export default async function handler(req, res) {
  const { query } = req.body;

  // Fetch relevant data from Pinecone
  const pineconeResponse = await pinecone.query({
    index: process.env.PINECONE_INDEX,
    query,
  });

  // Use OpenAI to generate a response
  const openaiResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Based on the following data: ${JSON.stringify(pineconeResponse)}, answer the query: ${query}`,
    max_tokens: 150,
  });

  res.status(200).json({ response: openaiResponse.data.choices[0].text });
}