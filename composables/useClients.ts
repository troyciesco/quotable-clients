import { Client } from "~/types"

type UseClientsParams = {
  searchString: string
}
export default async function useClients({ searchString }: UseClientsParams) {
  const { data, pending, error } = await useFetch<Client[]>(
    `/api/clients?search=${encodeURIComponent(searchString)}`,
  )

  return { data, pending, error }
}
