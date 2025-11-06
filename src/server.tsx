import express from 'express';
import cors from 'cors';

const app = express();

// Allow all origins (development only)
app.use(cors());

// Or restrict to your frontend
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.get('/api/surveys', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(8080, () => console.log('Server running on port 8080'));
