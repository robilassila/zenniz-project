"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlayer = validatePlayer;
exports.validatePlayerUpdate = validatePlayerUpdate;
exports.validatePlayerParams = validatePlayerParams;
const zod_1 = require("zod");
const playerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    date_of_birth: zod_1.z.coerce.date()
});
const playerParams = zod_1.z.object({
    playerId: zod_1.z.coerce.number()
});
function validatePlayer(data) {
    const result = playerSchema.safeParse(data);
    if (result.success) {
        return { success: result.success, data: result.data };
    }
    const formatted = result.error.format();
    return { success: result.success, errors: formatted };
}
function validatePlayerUpdate(data) {
    const result = playerSchema.partial().safeParse(data);
    if (result.success) {
        return { success: result.success, data: result.data };
    }
    const formatted = result.error.format();
    console.log(formatted);
    return { success: result.success, errors: formatted };
}
function validatePlayerParams(data) {
    const result = playerParams.safeParse(data);
    if (result.success) {
        return { success: result.success, data: result.data.playerId };
    }
    const formatted = result.error.format();
    return { success: result.success, errors: formatted };
}
