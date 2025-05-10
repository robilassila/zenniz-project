import { z } from 'zod';

export function validateSchema(schema: z.AnyZodObject, data: any) {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: result.success, data: result.data };
    }
    const formatted = result.error.format();
    return { success: result.success, errors: formatted };
}