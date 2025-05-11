import { db } from '../db/database'
import { Match, NewMatch } from '../db/dbTypes'

export async function getAllMatches() {
    const matches = await db
        .selectFrom('matches')
        .selectAll()
        .execute()
    return matches;
}

export async function addMatch(match: NewMatch) {
    const res = await db
        .insertInto('matches')
        .values(match)
        .returningAll()
        .executeTakeFirstOrThrow()
    return res;
}

export async function getPlayerMatchesByPId(player_id: number) {
    const matches = await db
        .selectFrom('matches')
        .selectAll()
        .where((eb) => eb('player_one_id', '=', player_id).or('player_two_id', '=', player_id))
        .execute()
    return matches;
}