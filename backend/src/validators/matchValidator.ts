import { z } from "zod";
import { NewMatch, NewSet } from "../db/dbTypes";

const setSchema = z.object({
    player_one_games: z.number().min(0).max(7),
    player_two_games: z.number().min(0).max(7),
    tiebreak: z.number().nonnegative().optional()
});

const matchSchema = z.object({
    player_one_id: z.number(),
    player_two_id: z.number(),
    winner_id: z.number(),
    start_time: z.string().datetime(),
    end_time: z.string().datetime(),
    sets: z.array(setSchema)
}).refine(
    (data) => data.player_one_id !== data.player_two_id, {message: "Player ids must be different"}
).refine(
    (data) => data.winner_id === data.player_one_id || data.winner_id === data.player_two_id, {message: "Winner id must be one of the player ids"}
)

export function validateMatch(data: any) {
    const result = matchSchema.safeParse(data);
    if (result.success) {
        const { start_time, end_time, sets, ...other} = result.data

        const newMatch: NewMatch = {
            ...other,
            start_time: new Date(start_time),
            end_time: new Date(end_time)
        }

        const newSets: NewSet[] = sets.map((set, index) => ({
            ...set,
            match_id: 0, // When inserting sets, this will be changed to the correct value
            set_number: index + 1
        }));

        return { success: result.success, data: { newMatch, newSets }}
    }
    const formatted = result.error.format();
    return { success: result.success, errors: formatted}
}