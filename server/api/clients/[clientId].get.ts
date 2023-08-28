import { JSDOM } from "jsdom"
import createDOMPurify from "dompurify"
import db from "../../../db.json"
import { Client } from "~/types"
const { window } = new JSDOM("")
const DOMPurify = createDOMPurify(window)

export default defineEventHandler((event) => {
  const clientId = getRouterParam(event, "clientId")
  // const data: Client[] = await $fetch(`http://localhost:3001/clients?id=${clientId}`)
  const data: Client = db.clients.find((client) => client.id === parseInt(clientId || "")) as Client
  const client = data
  const sanitizedClient = { ...client }
  for (const key in sanitizedClient) {
    const typedKey = key as keyof typeof sanitizedClient
    if (typeof sanitizedClient[typedKey] === "string") {
      sanitizedClient[typedKey] = DOMPurify.sanitize(sanitizedClient[typedKey] as string) as never
    }
  }
  return sanitizedClient
})
