import { db } from '../db/database';
import { NewSet } from '../db/dbTypes';

export async function addSets(sets: NewSet[]) {
    const addedSets = await db
        .insertInto('match_sets')
        .values(sets)
        .returningAll()
        .execute()
    return addedSets;
}

export async function getMatchSets(match_id: number) {
    const sets = await db
        .selectFrom('match_sets')
        .selectAll()
        .where('match_id', '=', match_id)
        .execute()
    return sets;
}