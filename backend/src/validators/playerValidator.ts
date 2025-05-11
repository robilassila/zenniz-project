import { z } from "zod";
import { NewPlayer } from "../db/dbTypes";

const playerSchema = z.object({
    name: z.string(),
    date_of_birth: z.coerce.date()
});

const playerParams = z.object({
    playerId: z.coerce.number()
})

export function validatePlayer(data: any) {
    const result = playerSchema.safeParse(data);
    if (result.success) {
        return { success: result.success, data: result.data as NewPlayer};
    }
    const formatted = result.error.format();
    return { success: result.success, errors: formatted };
}

export function validatePlayerParams(data: any) {
    const result = playerParams.safeParse(data);
    if (result.success) {
        return { success: result.success, data: result.data.playerId};
    }
    const formatted = result.error.format();
    return { success: result.success, errors: formatted };
}