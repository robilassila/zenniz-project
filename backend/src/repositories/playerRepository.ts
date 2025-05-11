import { db } from '../db/database'
import { Player, NewPlayer, PlayerUpdate } from '../db/dbTypes'

export async function getAllPlayers() {
    const players = await db
        .selectFrom('players')
        .selectAll()
        .execute()
    return players;
}

export async function getPlayerById(id: number) {
    const player = await db
        .selectFrom('players')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    return player;
}

export async function addPlayer(player: NewPlayer) {
    const res = await db
        .insertInto('players')
        .values(player)
        .returningAll()
        .executeTakeFirstOrThrow()
    return res;
}