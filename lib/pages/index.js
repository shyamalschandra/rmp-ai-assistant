import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export default function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <Container className="mt-10">
      <Typography variant="h4" className="mb-5">Rate My Professor AI Assistant</Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Ask about a professor..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
      {response && (
        <Box className="mt-5 p-4 border rounded">
          <Typography>{response}</Typography>
        </Box>
      )}
    </Container>
  );
}