import { Router } from 'express'
import { distributeWallet } from '#src/controllers/wallet/wallet_controller'

const walletRouter = Router()

walletRouter.post('/distribute', distributeWallet)
walletRouter.get('/balance/:walletAddress')

export default walletRouter
