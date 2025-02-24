import { PublicKey } from '@solana/web3.js';

// Inject dependencies (binance and solanaConnection) via middleware or directly
export const distributeWallet = async (req, res) => {
  const { wallets, amount } = req.body;
  const { binance } = req.context; // Assuming you pass dependencies via middleware

  try {
    for (const wallet of wallets) {
      await binance.withdraw('SOL', wallet, amount, 'Solana');
    }
    res.status(200).send('Distribution successful');
  } catch (error) {
    res.status(500).send('Distribution failed: ' + error.message);
  }
};

export const walletBalance = async (req, res) => {
  const { walletAddress } = req.params;
  const { solanaConnection } = req.context; // Assuming you pass dependencies via middleware

  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await solanaConnection.getBalance(publicKey);
    res.status(200).send({ balance });
  } catch (error) {
    res.status(500).send('Error fetching balance: ' + error.message);
  }
};