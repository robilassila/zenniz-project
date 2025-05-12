import { getAllPlayers, getPlayerById } from "../repositories/playerRepository";
import { getPlayerStatistics } from "./matchService";

export async function getPlayersWithStats() {
    const players = await getAllPlayers()

    const playersWithStats = await Promise.all(players.map( async (player) => {
        const stats = await getPlayerStatistics(player.id);
        return { ...player, stats: stats }
    }));

    return playersWithStats;
}

export async function getPlayerWithStats(player_id: number) {
    const player = await getPlayerById(player_id);

    const stats = await getPlayerStatistics(player_id);

    return { ...player, stats: stats }
}