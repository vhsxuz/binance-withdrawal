import { Router } from 'express';
import { distributeWallet, walletBalance, createAndDistribute, distributeCustom, scheduleDistribution, distributeRandom } from '#src/controllers/wallet/wallet_controller';

const walletRouter = Router();

walletRouter.post('/distribute', distributeWallet);
walletRouter.get('/balance/:walletAddress', walletBalance);
walletRouter.post('/create-and-distribute', createAndDistribute);
walletRouter.post('/distribute-custom', distributeCustom);
walletRouter.post('/schedule-distribution', scheduleDistribution);
walletRouter.post('/distribute-random', distributeRandom);

export default walletRouter;