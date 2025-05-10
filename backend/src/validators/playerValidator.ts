import { z } from "zod";

export const playerSchema = z.object({
    name: z.string(),
    date_of_birth: z.string().date()
});

export const playerParams = z.object({
    playerId: z.coerce.number()
})

