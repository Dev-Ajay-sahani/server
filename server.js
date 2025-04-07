import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Add this

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // ✅ Allow all origins (you can restrict this later if needed)

app.get('/api/player/:tag', async (req, res) => {
  const tag = encodeURIComponent(req.params.tag);
  const response = await fetch(`https://api.clashofclans.com/v1/players/${tag}`, {
    headers: {
      Authorization: `Bearer ${process.env.COC_TOKEN}`
    }
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch player data' });
  }

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => console.log(`🚀 Donation Tracker Backend is Running on port ${PORT}`));
