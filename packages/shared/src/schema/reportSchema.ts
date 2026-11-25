import { z } from "zod";


export const createRuleSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3)
});
