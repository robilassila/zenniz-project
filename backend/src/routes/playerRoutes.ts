import { Router } from 'express';
import { createPlayer, getPlayer, getPlayerMatches, getPlayers, getPlayerStats } from '../controllers/playerController';

const router = Router();

router.get('/', getPlayers);
router.get('/:playerId', getPlayer)
router.get('/:playerId/matches', getPlayerMatches)
router.get('/:playerId/stats', getPlayerStats)
router.post('/', createPlayer)

export default router;