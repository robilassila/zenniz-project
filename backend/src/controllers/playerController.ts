import { Request, Response } from 'express';
import { getAllPlayers, addPlayer, getPlayerById } from '../repositories/playerRepository';
import { validatePlayer, validatePlayerParams } from '../validators/playerValidator';
import { getPlayerMatchesById } from '../repositories/matchRepository';

export const getPlayers = async (req: Request, res: Response) => {
    const players = await getAllPlayers();
    res.json(players);
};

export const getPlayer = async (req: Request, res: Response) => {
    const validation = validatePlayerParams(req.params);
    if (!validation.success || !validation.data) {
        res.status(400).json(validation.errors);
        return;
    }
    const player = await getPlayerById(validation.data);
    if (!player) {
        res.status(404).json('Player not found');
        return;
    }
    res.json(player);
};

export const createPlayer = async (req: Request, res: Response) => {
    const validation = validatePlayer(req.body);
    if (!validation.success || !validation.data) {
        res.status(400).json(validation.errors);
        return;
    }
    try {
        const player = await addPlayer(validation.data);
        res.status(201).json(player);
    } 
    catch (error) {
        res.status(500).json('Failed to create player' + error);
    }
};

export const getPlayerMatches = async (req: Request, res: Response) => {
    const validation = validatePlayerParams(req.params);
    if (!validation.success || !validation.data) {
        res.status(400).json(validation.errors);
        return;
    }
    const matches = await getPlayerMatchesById(validation.data);
    if (!matches) {
        res.status(404).json('Player not found');
        return;
    }
    res.json(matches);
}
