import { db } from '../database'
import { Match, NewMatch } from '../types'
import { getPlayerById } from './playerRepository';

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

export async function getPlayerMatchesById(id: number) {
    const player = await getPlayerById(id);
    if (player) {
        const pId = player.id;
        const matches = await db
            .selectFrom('matches')
            .selectAll()
            .where((eb) => eb('player_one_id', '=', pId).or('player_two_id', '=', pId))
            .execute()
        return matches;
    } 
}