import { JSDOM } from "jsdom"
import createDOMPurify from "dompurify"

const { window } = new JSDOM("")
const DOMPurify = createDOMPurify(window)

export const sanitizeObjectFields = ({ obj }: any) => {
  for (const key in obj) {
    const typedKey = key as keyof typeof obj

    if (typeof obj[typedKey] === "string") {
      obj[typedKey] = DOMPurify.sanitize(obj[typedKey] as string) as never
    }
  }
  return obj
}
