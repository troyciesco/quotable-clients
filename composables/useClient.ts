type UseClientParams = {
  clientId: string
}
export default async function useClient({ clientId }: UseClientParams) {
  const { data, pending, error } = await useFetch(`/api/clients/${clientId}`)

  return { data, pending, error }
}
