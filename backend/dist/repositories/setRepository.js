"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSets = addSets;
exports.getMatchSets = getMatchSets;
const database_1 = require("../db/database");
async function addSets(sets) {
    const addedSets = await database_1.db
        .insertInto('match_sets')
        .values(sets)
        .returningAll()
        .execute();
    return addedSets;
}
async function getMatchSets(match_id) {
    const sets = await database_1.db
        .selectFrom('match_sets')
        .selectAll()
        .where('match_id', '=', match_id)
        .execute();
    return sets;
}
