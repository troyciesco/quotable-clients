import db from "../../../db.json"
import { Client } from "~/types"
import { sanitizeObjectFields } from "~/utils"

export default defineEventHandler((event) => {
  const clientId = getRouterParam(event, "clientId")
  // const data: Client[] = await $fetch(`http://localhost:3001/clients?id=${clientId}`)
  const data: Client = db.clients.find((client) => client.id === parseInt(clientId || "")) as Client
  const client = data
  const sanitizedClient: Client = sanitizeObjectFields({ obj: client })
  return sanitizedClient
})
