import { stripHtml } from "string-strip-html"
import { JSDOM } from "jsdom"
import createDOMPurify from "dompurify"
import { Client } from "~/types"
import db from "~/db.json"
const { window } = new JSDOM("")
const DOMPurify = createDOMPurify(window)

// export default defineEventHandler(async (event): Promise<Client[]> => {
export default defineEventHandler((event): Client[] => {
  const excludedSearchFields = ["id", "avatar"]
  const query = getQuery(event)
  // const initialData: Client[] = await $fetch(`http://localhost:3001/clients`)
  const initialData: Client[] = db.clients as Client[]

  if (!query?.search) {
    return initialData.map((client) => {
      const sanitizedClient: Client = { ...client }
      for (const key in sanitizedClient) {
        const typedKey = key as keyof typeof sanitizedClient

        if (typeof sanitizedClient[typedKey] === "string") {
          sanitizedClient[typedKey] = DOMPurify.sanitize(
            sanitizedClient[typedKey] as string,
          ) as never
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
            const typedKey = key as keyof typeof sanitizedClient
            if (typeof sanitizedClient[typedKey] === "string") {
              sanitizedClient[typedKey] = DOMPurify.sanitize(
                sanitizedClient[typedKey] as string,
              ) as never
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
