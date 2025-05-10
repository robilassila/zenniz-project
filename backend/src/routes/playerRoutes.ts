import { Router } from 'express';
import { createPlayer, getPlayer, getPlayers } from '../controllers/playerController';

const router = Router();

router.get('/', getPlayers);
router.get('/:playerId', getPlayer)
router.post('/', createPlayer)

export default router;