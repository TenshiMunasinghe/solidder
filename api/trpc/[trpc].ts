import { PrismaClient } from '@prisma/client'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

const prisma = new PrismaClient()

const appRouter = trpc.router().query('users', {
  async resolve() {
    return prisma.user.findMany()
  },
})

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})
