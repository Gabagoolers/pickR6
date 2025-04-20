import { z } from 'zod';

export const setSchema = z.object({
	name: z.string().min(2),
	operators: z.array(z.string())
});
