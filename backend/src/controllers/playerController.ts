import { Request, Response } from 'express';
import { getAllPlayers, addPlayer, getPlayerById, updatePlayer } from '../repositories/playerRepository';
import { validatePlayer, validatePlayerParams, validatePlayerUpdate } from '../validators/playerValidator';
import { getPlayerMatchesWithSets, getPlayerStatistics } from '../services/matchService';

function handleValidationError(res: Response, errors: any) {
    res.status(400).json(errors);
}

export const getPlayers = async (req: Request, res: Response) => {
    const players = await getAllPlayers();
    res.json(players);
};

export const getPlayer = async (req: Request, res: Response) => {
    const validation = validatePlayerParams(req.params);
    if (!validation.success || !validation.data) {
        handleValidationError(res, validation.errors);
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
        handleValidationError(res, validation.errors);
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
        handleValidationError(res, validation.errors);
        return;
    }
    const matches = await getPlayerMatchesWithSets(validation.data);
    if (!matches) {
        res.status(404).json('Player not found');
        return;
    }
    res.json(matches);
}

export const getPlayerStats = async (req: Request, res: Response) => {
    const validation = validatePlayerParams(req.params);
    if (!validation.success || !validation.data) {
        handleValidationError(res, validation.errors);
        return;
    }
    const pId = validation.data;
    const stats = await getPlayerStatistics(pId)

    if (!stats) {
        res.status(404).json('Player not found');
        return;
    }
    
    res.json(stats);
}

export const modifyPlayer = async (req: Request, res: Response) => {
    const paramValid = validatePlayerParams(req.params);
    if (!paramValid.success || !paramValid.data) {
        handleValidationError(res, paramValid.errors);
        return;
    }

    const pId = paramValid.data;
    const bodyValid = validatePlayerUpdate(req.body);

    if (!bodyValid.success || !bodyValid.data) {
        handleValidationError(res, bodyValid.errors)
        return;
    }

    const playerData = bodyValid.data
    const player = await updatePlayer(pId, playerData)

    if (!player) {
        res.status(404).json('Player not found');
        return;
    }

    res.json(player);
}