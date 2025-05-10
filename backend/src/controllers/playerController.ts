import { Request, Response } from 'express';
import { getAllPlayers, addPlayer, getPlayerById } from '../repositories/playerRepository';
import { validateSchema } from '../validators/validateSchema';
import { playerParams, playerSchema } from '../validators/playerValidator';
import { NewPlayer } from '../types';

export const getPlayers = async (req: Request, res: Response) => {
    const players = await getAllPlayers();
    res.json(players);
};

export const getPlayer = async (req: Request, res: Response) => {
    const validation = validateSchema(playerParams, req.params);
    if (!validation.success || !validation.data) {
        res.status(400).json(validation.errors);
        return;
    }
    const player = await getPlayerById(validation.data?.playerId);
    if (!player) {
        res.status(404).json('Player not found');
        return;
    }
    res.json(player);
}

export const createPlayer = async (req: Request, res: Response) => {
    const validation = validateSchema(playerSchema, req.body);
    if (!validation.success || !validation.data) {
        res.status(400).json(validation.errors);
        return;
    }
    try {
        const player = await addPlayer(validation.data as NewPlayer);
        res.status(201).json(player);
    } 
    catch (error) {
        res.status(500).json('Failed to create player');
    }
};

