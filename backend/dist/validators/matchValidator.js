"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMatch = validateMatch;
const zod_1 = require("zod");
const setSchema = zod_1.z.object({
    player_one_games: zod_1.z.number().int().min(0).max(7),
    player_two_games: zod_1.z.number().int().min(0).max(7),
    tiebreak: zod_1.z.number().int().nonnegative().optional()
});
const matchSchema = zod_1.z.object({
    player_one_id: zod_1.z.number(),
    player_two_id: zod_1.z.number(),
    winner_id: zod_1.z.number(),
    start_time: zod_1.z.string().datetime(),
    end_time: zod_1.z.string().datetime(),
    sets: zod_1.z.array(setSchema)
}).refine((data) => data.player_one_id !== data.player_two_id, { message: "Player ids must be different" }).refine((data) => data.winner_id === data.player_one_id || data.winner_id === data.player_two_id, { message: "Winner id must be one of the player ids" });
function validateMatch(data) {
    const result = matchSchema.safeParse(data);
    if (result.success) {
        const { start_time, end_time, sets, ...other } = result.data;
        const newMatch = {
            ...other,
            start_time: new Date(start_time),
            end_time: new Date(end_time)
        };
        const newSets = sets.map((set, index) => ({
            ...set,
            match_id: 0, // When inserting sets, this will be changed to the correct value
            set_number: index + 1
        }));
        return { success: result.success, data: { newMatch, newSets } };
    }
    const formatted = result.error.format();
    return { success: result.success, errors: formatted };
}
