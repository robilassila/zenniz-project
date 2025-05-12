"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlayers = getAllPlayers;
exports.getPlayerById = getPlayerById;
exports.addPlayer = addPlayer;
exports.updatePlayer = updatePlayer;
const database_1 = require("../db/database");
async function getAllPlayers() {
    const players = await database_1.db
        .selectFrom('players')
        .selectAll()
        .execute();
    return players;
}
async function getPlayerById(id) {
    const player = await database_1.db
        .selectFrom('players')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
    return player;
}
async function addPlayer(player) {
    const res = await database_1.db
        .insertInto('players')
        .values(player)
        .returningAll()
        .executeTakeFirstOrThrow();
    return res;
}
async function updatePlayer(id, player) {
    const res = await database_1.db
        .updateTable('players')
        .set(player)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
    return res;
}
