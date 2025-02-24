import {Router} from 'express'
import healthRouter from '#src/controllers/health/health_route'
import walletRouter from '#src/controllers/wallet/wallet_route'

const v1 = Router();

v1.use('/health', healthRouter)
v1.use('/wallet', walletRouter)

export default v1