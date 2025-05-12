"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMatches = getAllMatches;
exports.addMatch = addMatch;
exports.getPlayerMatchesByPId = getPlayerMatchesByPId;
const database_1 = require("../db/database");
async function getAllMatches() {
    const matches = await database_1.db
        .selectFrom('matches')
        .selectAll()
        .execute();
    return matches;
}
async function addMatch(match) {
    const res = await database_1.db
        .insertInto('matches')
        .values(match)
        .returningAll()
        .executeTakeFirstOrThrow();
    return res;
}
async function getPlayerMatchesByPId(player_id) {
    const matches = await database_1.db
        .selectFrom('matches')
        .selectAll()
        .where((eb) => eb('player_one_id', '=', player_id).or('player_two_id', '=', player_id))
        .execute();
    return matches;
}
