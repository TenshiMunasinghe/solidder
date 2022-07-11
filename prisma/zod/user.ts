import * as z from "zod"
import * as imports from "../null"

export const UserModel = z.object({
  id: z.string(),
  name: z.string().max(15),
  bio: z.string().max(140).nullish(),
  email: z.string().email().max(254),
  password: z.string().max(255),
})
