import { stripHtml } from "string-strip-html"
import { JSDOM } from "jsdom"
import createDOMPurify from "dompurify"
import { Client } from "~/types"
const { window } = new JSDOM("")
const DOMPurify = createDOMPurify(window)
import db from "~/db.json"

export default defineEventHandler(async (event): Promise<Client[]> => {
  const excludedSearchFields = ["id", "avatar"]
  const query = getQuery(event)
  // const initialData: Client[] = await $fetch(`http://localhost:3001/clients`)
  const initialData: Client[] = db.clients as Client[]

  if (!query?.search) {
    return initialData.map((client) => {
      const sanitizedClient: Client = { ...client }
      for (const key in sanitizedClient) {
        if (typeof sanitizedClient[key] === "string") {
          sanitizedClient[key] = DOMPurify.sanitize(sanitizedClient[key])
        }
      }
      return sanitizedClient
    })
  }

  const data: Client[] = []

  initialData.forEach((client) => {
    const fields = Object.keys(client) as (keyof Client)[]
    for (let i = 0; i < fields.length; i++) {
      if (excludedSearchFields.includes(fields[i])) {
        continue
      }
      if (client[fields[i]]) {
        const field = stripHtml(client[fields[i]] as keyof Client).result
        if (field.toString().toLowerCase().includes(query.search!.toString().toLowerCase())) {
          const sanitizedClient: Client = { ...client }
          for (const key in sanitizedClient) {
            if (typeof sanitizedClient[key] === "string") {
              sanitizedClient[key] = DOMPurify.sanitize(sanitizedClient[key])
            }
          }
          data.push(sanitizedClient)
          break
        }
      }
    }
  })

  return data
})
