import { Router } from 'express';
import { createPlayer, getPlayer, getPlayerMatches, getPlayers, modifyPlayer } from '../controllers/playerController';

const router = Router();

router.get('/', getPlayers);
router.get('/:playerId', getPlayer)
router.get('/:playerId/matches', getPlayerMatches)
router.put('/:playerId', modifyPlayer)
router.post('/', createPlayer)

export default router;