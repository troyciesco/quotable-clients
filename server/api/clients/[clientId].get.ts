import { JSDOM } from "jsdom"
import createDOMPurify from "dompurify"
import { Client } from "~/types"
const { window } = new JSDOM("")
const DOMPurify = createDOMPurify(window)
import db from "../../../db.json"

export default defineEventHandler(async (event) => {
  const clientId = getRouterParam(event, "clientId")
  // const data: Client[] = await $fetch(`http://localhost:3001/clients?id=${clientId}`)
  const data: Client = db.clients.find((client) => client.id === parseInt(clientId || "")) as Client
  const client = data
  const sanitizedClient = { ...client }
  for (const key in sanitizedClient) {
    if (typeof sanitizedClient[key] === "string") {
      sanitizedClient[key] = DOMPurify.sanitize(sanitizedClient[key])
    }
  }
  return sanitizedClient
})
