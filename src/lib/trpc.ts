import { createTRPCClient, TRPCRequestOptions } from '@trpc/client'
import { createResource } from 'solid-js'

import type { inferHandlerInput, inferProcedureOutput } from '@trpc/server'

import type { AppRouter } from '../../api/trpc/[trpc]'

export const trpcClient = createTRPCClient<AppRouter>({
  url: '/api/trpc',
  headers() {
    const token = localStorage.getItem('token')
    if (!token) return {}
    return {
      Authorization: token,
    }
  },
})

type AppQueries = AppRouter['_def']['queries']
type AppQueryKeys = keyof AppQueries & string

export const createTrpcQuery = <TPath extends AppQueryKeys>(
  path: TPath,
  ...args: [...inferHandlerInput<AppQueries[TPath]>, TRPCRequestOptions?]
) => {
  const fetchData = async () => {
    return trpcClient.query(path, ...args)
  }

  return createResource(fetchData)
}

type AppMutations = AppRouter['_def']['mutations']
type AppMutationKeys = keyof AppMutations & string

export const createTrpcMutation = <TPath extends AppMutationKeys>(
  path: TPath
) => {
  const fetchData = async (
    args: [...inferHandlerInput<AppMutations[TPath]>, TRPCRequestOptions?]
  ) => {
    return trpcClient.mutation(path, ...args)
  }

  return { mutate: fetchData }
}

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>
