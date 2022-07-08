import { PrismaClient, User } from '@prisma/client'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import z from 'zod'

const prisma = new PrismaClient()

const createContext = (opts: trpcNext.CreateNextContextOptions) => {
  const jwtSecret = process.env.JWT_SECRET || ''
  return { jwtSecret, ...opts }
}

type UserWithoutPassword = Omit<User, 'password'>

type Context = trpc.inferAsyncReturnType<typeof createContext> & {
  user?: UserWithoutPassword
}

const createRouter = () => {
  return trpc.router<Context>()
}

const defaultRouter = createRouter()
  .query('login', {
    input: z.object({
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ input, ctx }) {
      const errorOptions = {
        code: 'BAD_REQUEST',
        message: 'Invalid Credentials',
      } as const

      const data = await prisma.user.findFirst({
        where: {
          email: input.email,
        },
      })

      if (!data) throw new trpc.TRPCError(errorOptions)

      const { password, ...user } = data

      if (!(await bcrypt.compare(input.password, password))) {
        throw new trpc.TRPCError(errorOptions)
      }

      const token = jwt.sign(user, ctx.jwtSecret, {
        expiresIn: '5h',
      })

      return { ...user, token }
    },
  })
  .mutation('register', {
    input: z.object({
      email: z.string(),
      username: z.string(),
      password: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { password, ...user } = await prisma.user.create({
        data: {
          email: input.email,
          name: input.username,
          password: await bcrypt.hash(input.password, 10),
        },
      })

      const token = jwt.sign(user, ctx.jwtSecret, {
        expiresIn: '5h',
      })

      return { ...user, token }
    },
  })

type DefaultRouter = typeof defaultRouter

const authRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const token = ctx?.req?.headers.authorization

    if (!token) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
    }

    const data = jwt.verify(token, ctx.jwtSecret) as jwt.JwtPayload &
      UserWithoutPassword

    if (!data) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
    }

    const { id, name, bio, email } = data

    const user = { id, name, bio, email }

    return next({ ctx: { ...ctx, user } })
  })
  .query('login', {
    async resolve({ ctx }) {
      return ctx.user
    },
  })

type AuthRouter = typeof authRouter

const appRouter = createRouter()
  .merge('', defaultRouter)
  .merge('with-token.', authRouter)
  .middleware(async ({ ctx, next }) => {
    if (!ctx.jwtSecret) throw new Error('Internal Server Error')
    return next()
  })

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
