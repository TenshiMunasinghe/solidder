import * as z from "zod"
import * as imports from "../null"

export const SolidModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  content: z.string().max(255),
  authorId: z.string(),
  likes: z.number().int(),
})
