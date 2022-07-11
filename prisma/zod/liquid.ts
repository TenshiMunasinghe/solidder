import * as z from "zod"
import * as imports from "../null"

export const LiquidModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  content: z.string().max(255),
  authorId: z.string(),
  parentId: z.string(),
})
