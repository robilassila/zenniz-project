import { NewMatch, NewSet } from "../db/dbTypes";
import { addMatch, getAllMatches, getPlayerMatchesByPId } from "../repositories/matchRepository";
import { getPlayerById } from "../repositories/playerRepository";
import { addSets, getMatchSets } from "../repositories/setRepository";

export async function addMatchWithSets(match: NewMatch, sets: NewSet[]) {
    const newMatch = await addMatch(match);

    const newSets = sets.map((set) => ({
        ...set,
        match_id: newMatch.id
    }));

    const addedSets = await addSets(newSets);

    return {...newMatch, sets: addedSets}

}

export async function getAllMatchesWithSets() {
    const matches = await getAllMatches();

    const matchesWithSets = await Promise.all(matches.map(async (match) => {
        const sets = await getMatchSets(match.id)
        return { ...match, sets: sets}
    }));

    return matchesWithSets;
}

export async function getPlayerMatchesWithSets(player_id: number) {
    const player = await getPlayerById(player_id); // Verify that player exists

    if (!player) {
        return null;
    }
    const matches = await getPlayerMatchesByPId(player_id);

    const matchesWithSets = await Promise.all(matches.map(async (match) => {
        const sets = await getMatchSets(match.id)
        return { ...match, sets: sets}
    }));

    return matchesWithSets;

}

export async function getPlayerStatistics(player_id: number) {
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
            "win-%": winPercent ? winPercent + " %": "0 %"
        }
    return result;
}