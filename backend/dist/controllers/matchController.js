"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatch = exports.getMatches = void 0;
const matchValidator_1 = require("../validators/matchValidator");
const matchService_1 = require("../services/matchService");
const getMatches = async (req, res) => {
    const matches = await (0, matchService_1.getAllMatchesWithSets)();
    res.json(matches);
};
exports.getMatches = getMatches;
const createMatch = async (req, res) => {
    const validation = (0, matchValidator_1.validateMatch)(req.body);
    if (!validation.success || !validation.data) {
        res.status(400).json(validation.errors);
        return;
    }
    try {
        const { newMatch, newSets } = validation.data;
        const result = await (0, matchService_1.addMatchWithSets)(newMatch, newSets);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json('Failed to create match ' + error);
    }
};
exports.createMatch = createMatch;
