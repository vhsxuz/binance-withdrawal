import express from 'express';
import Binance from 'node-binance-api';
import { Connection } from '@solana/web3.js';
import dotenv from 'dotenv';
import v1 from '#src/routes/v1';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// Initialize Binance and Solana connection
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY, // Use environment variables
  APISECRET: process.env.BINANCE_API_SECRET,
});

const solanaConnection = new Connection('https://api.mainnet-beta.solana.com');

// Middleware to inject dependencies into the request context
app.use((req, res, next) => {
  req.context = {
    binance,
    solanaConnection,
  };
  next();
});

app.use('/api/v1', v1);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});