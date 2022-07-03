import { PrismaClient } from '@prisma/client'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import z from 'zod'
const prisma = new PrismaClient()

const appRouter = trpc
  .router()
  .query('login', {
    input: z.object({
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ input }) {
      return prisma.user.findFirst({
        where: {
          email: input.email,
          password: input.password,
        },
      })
    },
  })
  .mutation('signup', {
    input: z.object({
      email: z.string(),
      name: z.string(),
      password: z.string(),
    }),
    async resolve({ input }) {
      return prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: input.password,
        },
      })
    },
  })

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})
