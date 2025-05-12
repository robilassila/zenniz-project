"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyPlayer = exports.getPlayerStats = exports.getPlayerMatches = exports.createPlayer = exports.getPlayer = exports.getPlayers = void 0;
const playerRepository_1 = require("../repositories/playerRepository");
const playerValidator_1 = require("../validators/playerValidator");
const matchService_1 = require("../services/matchService");
function handleValidationError(res, errors) {
    res.status(400).json(errors);
}
const getPlayers = async (req, res) => {
    const players = await (0, playerRepository_1.getAllPlayers)();
    res.json(players);
};
exports.getPlayers = getPlayers;
const getPlayer = async (req, res) => {
    const validation = (0, playerValidator_1.validatePlayerParams)(req.params);
    if (!validation.success || !validation.data) {
        handleValidationError(res, validation.errors);
        return;
    }
    const player = await (0, playerRepository_1.getPlayerById)(validation.data);
    if (!player) {
        res.status(404).json('Player not found');
        return;
    }
    res.json(player);
};
exports.getPlayer = getPlayer;
const createPlayer = async (req, res) => {
    const validation = (0, playerValidator_1.validatePlayer)(req.body);
    if (!validation.success || !validation.data) {
        handleValidationError(res, validation.errors);
        return;
    }
    try {
        const player = await (0, playerRepository_1.addPlayer)(validation.data);
        res.status(201).json(player);
    }
    catch (error) {
        res.status(500).json('Failed to create player' + error);
    }
};
exports.createPlayer = createPlayer;
const getPlayerMatches = async (req, res) => {
    const validation = (0, playerValidator_1.validatePlayerParams)(req.params);
    if (!validation.success || !validation.data) {
        handleValidationError(res, validation.errors);
        return;
    }
    const matches = await (0, matchService_1.getPlayerMatchesWithSets)(validation.data);
    if (!matches) {
        res.status(404).json('Player not found');
        return;
    }
    res.json(matches);
};
exports.getPlayerMatches = getPlayerMatches;
const getPlayerStats = async (req, res) => {
    const validation = (0, playerValidator_1.validatePlayerParams)(req.params);
    if (!validation.success || !validation.data) {
        handleValidationError(res, validation.errors);
        return;
    }
    const pId = validation.data;
    const stats = await (0, matchService_1.getPlayerStatistics)(pId);
    if (!stats) {
        res.status(404).json('Player not found');
        return;
    }
    res.json(stats);
};
exports.getPlayerStats = getPlayerStats;
const modifyPlayer = async (req, res) => {
    const paramValid = (0, playerValidator_1.validatePlayerParams)(req.params);
    if (!paramValid.success || !paramValid.data) {
        handleValidationError(res, paramValid.errors);
        return;
    }
    const pId = paramValid.data;
    const bodyValid = (0, playerValidator_1.validatePlayerUpdate)(req.body);
    if (!bodyValid.success || !bodyValid.data) {
        handleValidationError(res, bodyValid.errors);
        return;
    }
    const playerData = bodyValid.data;
    const player = await (0, playerRepository_1.updatePlayer)(pId, playerData);
    if (!player) {
        res.status(404).json('Player not found');
        return;
    }
    res.json(player);
};
exports.modifyPlayer = modifyPlayer;
