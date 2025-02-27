import fs from "fs/promises"
import path from "path"

const projectRoot = path.join(process.cwd(), "../..")
const infoGenDir = path.join(projectRoot, "crafts-info-gen")

console.log("at edit/", "infoGenDir:", infoGenDir) // dev

export async function load({ params }) {
  console.log("[foldername]", params.foldername)
  const info = await fs
    .readFile(path.join(infoGenDir, params.foldername, "info.json"), {
      encoding: "utf8",
    })
    .then((res) => JSON.parse(res))
  info.thumbnail = path.join("/images/", params.foldername, info.thumbnail)
  // console.log("info", info)

  return {
    info,
    foldername: params.foldername,
  }
}
