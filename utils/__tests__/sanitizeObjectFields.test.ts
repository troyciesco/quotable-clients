import { describe, expect, it } from "vitest"
import { sanitizeObjectFields } from ".."

describe("sanitizeObjectFields", () => {
  it("removes possible xss attacks", () => {
    const obj = { field: "<h1>I'm not just a title<script>alert(hacked!)</script></h1>" }
    const sanitizedObject = sanitizeObjectFields({ obj })
    expect(sanitizedObject.field).toEqual("<h1>I'm not just a title</h1>")
  })
})
