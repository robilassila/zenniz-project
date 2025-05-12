"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMatchWithSets = addMatchWithSets;
exports.getAllMatchesWithSets = getAllMatchesWithSets;
exports.getPlayerMatchesWithSets = getPlayerMatchesWithSets;
exports.getPlayerStatistics = getPlayerStatistics;
const matchRepository_1 = require("../repositories/matchRepository");
const playerRepository_1 = require("../repositories/playerRepository");
const setRepository_1 = require("../repositories/setRepository");
async function addMatchWithSets(match, sets) {
    const newMatch = await (0, matchRepository_1.addMatch)(match);
    const newSets = sets.map((set) => ({
        ...set,
        match_id: newMatch.id
    }));
    const addedSets = await (0, setRepository_1.addSets)(newSets);
    return { ...newMatch, sets: addedSets };
}
async function getAllMatchesWithSets() {
    const matches = await (0, matchRepository_1.getAllMatches)();
    const matchesWithSets = await Promise.all(matches.map(async (match) => {
        const sets = await (0, setRepository_1.getMatchSets)(match.id);
        return { ...match, sets: sets };
    }));
    return matchesWithSets;
}
async function getPlayerMatchesWithSets(player_id) {
    const player = await (0, playerRepository_1.getPlayerById)(player_id); // Verify that player exists
    if (!player) {
        return null;
    }
    const matches = await (0, matchRepository_1.getPlayerMatchesByPId)(player_id);
    const matchesWithSets = await Promise.all(matches.map(async (match) => {
        const sets = await (0, setRepository_1.getMatchSets)(match.id);
        return { ...match, sets: sets };
    }));
    return matchesWithSets;
}
async function getPlayerStatistics(player_id) {
    const matches = await getPlayerMatchesWithSets(player_id);
    if (!matches) {
        return null;
    }
    const nofWins = matches.filter((match) => match.winner_id === player_id).length;
    const nofMatches = matches.length;
    const winPercent = Math.round(nofWins / nofMatches * 1000) / 10; // One decimal precision
    const result = {
        wins: nofWins,
        losses: nofMatches - nofWins,
        total: nofMatches,
        "win-%": winPercent ? winPercent + " %" : "0 %"
    };
    return result;
}
