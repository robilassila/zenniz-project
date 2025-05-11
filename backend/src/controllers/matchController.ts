import { Request, Response } from 'express';
import { validateMatch } from '../validators/matchValidator';
import { addMatchWithSets, getAllMatchesWithSets } from '../services/matchService';

export const getMatches = async (req: Request, res: Response) => {
    const matches = await getAllMatchesWithSets();
    res.json(matches);
};

export const createMatch = async (req: Request, res: Response) => {
    const validation = validateMatch(req.body);
    if (!validation.success || !validation.data) {
        res.status(400).json(validation.errors)
        return;
    }
    try {
        const { newMatch, newSets } = validation.data
        const result = await addMatchWithSets(newMatch, newSets)
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json('Failed to create match ' + error);
    }
}