import fs from "fs/promises"
import path from "path"
import mime from "mime-types"

const projectRoot = path.join(process.cwd(), "../..")
const infoGenDir = path.join(projectRoot, "crafts-info-gen")

export async function GET({ params }) {
  const filePath = path.resolve(infoGenDir, params.filepath)
  console.log("filePath", filePath) // dev

  try {
    const imageBuffer = await fs.readFile(filePath)
    const contentType = mime.lookup(filePath) || "application/octet-stream"
    return new Response(imageBuffer, {
      headers: { "Content-Type": contentType },
    })
  } catch (err) {
    return new Response("Not found", { status: 404 })
  }
}
