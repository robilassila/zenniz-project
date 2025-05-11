import { z } from "zod";
import { NewMatch } from "../db/dbTypes";

const matchSchema = z.object({
    player_one_id: z.number(),
    player_two_id: z.number(),
    winner_id: z.number(),
    start_time: z.string().datetime(),
    end_time: z.string().datetime()
}).refine(
    (data) => data.player_one_id !== data.player_two_id, {message: "Player ids must be different"}
).refine(
    (data) => data.winner_id === data.player_one_id || data.winner_id === data.player_two_id, {message: "Winner id must be one of the player ids"}
)

export function validateMatch(data: any) {
    const result = matchSchema.safeParse(data);
    if (result.success) {
        const { start_time, end_time, ...other} = result.data
        return { success: result.success, data: { ...other, start_time: new Date(start_time), end_time: new Date(end_time) } as NewMatch }
    }
    const formatted = result.error.format();
    return { success: result.success, errors: formatted}
}