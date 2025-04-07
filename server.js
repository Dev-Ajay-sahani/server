import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors'; // 🛡️ CORS protection

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // ✅ Enable CORS for all origins

app.get('/', (req, res) => {
  res.send("✅ Backend is running");
});

app.get('/api/player/:tag', async (req, res) => {
  const tag = encodeURIComponent(req.params.tag);
  
  const response = await fetch(`https://api.clashofclans.com/v1/players/${tag}`, {
    headers: {
  Authorization: `Bearer ${process.env.COC_TOKEN}`  // ✅ This is correct
}
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("COC API Error:", errorText);
    return res.status(response.status).json({ error: 'Failed to fetch player data', details: errorText });
  }

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => console.log(`🚀 Donation Tracker Backend is Running on port ${PORT}`));
