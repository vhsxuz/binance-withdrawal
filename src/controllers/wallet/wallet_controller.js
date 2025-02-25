import { PublicKey, Keypair, Connection } from '@solana/web3.js';
import Binance from 'node-binance-api';
import cron from 'node-cron';

// Initialize Binance and Solana connection
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY, // Use environment variables
  APISECRET: process.env.BINANCE_API_SECRET,
});

const solanaConnection = new Connection('https://api.mainnet-beta.solana.com');

// 1. Distribute to Solana Wallets
export const distributeWallet = async (req, res) => {
  const { wallets, amount } = req.body;

  try {
    for (const wallet of wallets) {
      await binance.withdraw('SOL', wallet, amount, 'Solana');
    }
    res.status(200).send('Distribution successful');
  } catch (error) {
    res.status(500).send('Distribution failed: ' + error.message);
  }
};

// 2. Wallet Balance Checking
export const walletBalance = async (req, res) => {
  const { walletAddress } = req.params;

  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await solanaConnection.getBalance(publicKey);
    res.status(200).send({ balance });
  } catch (error) {
    res.status(500).send('Error fetching balance: ' + error.message);
  }
};

// 3. Distribution to New Wallets
export const createAndDistribute = async (req, res) => {
  const { amount } = req.body;

  try {
    const newWallet = Keypair.generate();
    const walletAddress = newWallet.publicKey.toString();

    await binance.withdraw('SOL', walletAddress, amount, 'Solana');
    res.status(200).send({ walletAddress });
  } catch (error) {
    res.status(500).send('Error creating and distributing: ' + error.message);
  }
};

// 4. Custom Wallet List Distribution
export const distributeCustom = async (req, res) => {
  const { wallets, amount } = req.body;

  try {
    for (const wallet of wallets) {
      await binance.withdraw('SOL', wallet, amount, 'Solana');
    }
    res.status(200).send('Custom distribution successful');
  } catch (error) {
    res.status(500).send('Custom distribution failed: ' + error.message);
  }
};

// 5. Scheduled Distribution (Nice to Have)
export const scheduleDistribution = async (req, res) => {
  const { wallets, amount, schedule } = req.body;

  try {
    cron.schedule(schedule, async () => {
      for (const wallet of wallets) {
        await binance.withdraw('SOL', wallet, amount, 'Solana');
      }
    });
    res.status(200).send('Scheduled distribution set up successfully');
  } catch (error) {
    res.status(500).send('Error setting up scheduled distribution: ' + error.message);
  }
};

// 6. Randomized Distribution Amounts (Nice to Have)
export const distributeRandom = async (req, res) => {
  const { wallets, minAmount, maxAmount } = req.body;

  try {
    for (const wallet of wallets) {
      const randomAmount = (Math.random() * (maxAmount - minAmount) + minAmount).toFixed(2);
      await binance.withdraw('SOL', wallet, randomAmount, 'Solana');
    }
    res.status(200).send('Randomized distribution successful');
  } catch (error) {
    res.status(500).send('Randomized distribution failed: ' + error.message);
  }
};