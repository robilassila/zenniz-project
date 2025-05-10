import { Request, Response } from 'express';
import { addMatch, getAllMatches } from '../repositories/matchRepository';
import { validateMatch } from '../validators/matchValidator';

export const getMatches = async (req: Request, res: Response) => {
    const matches = await getAllMatches();
    res.json(matches);
};

export const createMatch = async (req: Request, res: Response) => {
    const validation = validateMatch(req.body);
    if (!validation.success || !validation.data) {
        res.status(400).json(validation.errors)
        return;
    }
    try {
        const match = await addMatch(validation.data);
        res.status(201).json(match);
    }
    catch (error) {
        res.status(500).json('Failed to create match ' + error);
    }
}