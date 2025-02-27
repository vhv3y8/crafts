import fs from "fs/promises"
import path from "path"
import { compareDesc, parseISO } from "date-fns"
import { base } from "$app/paths"

const projectRoot = path.join(process.cwd(), "../..")
const infoGenDir = path.join(projectRoot, "crafts-info-gen")

export async function load({ params }) {
  // Get existing folder names under infoGenDir
  const folders = await fs
    .readdir(infoGenDir, { withFileTypes: true })
    .then((dirents) =>
      dirents
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name),
    )
  // console.log("folders", folders) // dev

  // Read each info.json files and parse
  const settledResults = await Promise.allSettled(
    folders.map((name) =>
      fs
        .readFile(path.join(infoGenDir, name, "info.json"), {
          encoding: "utf8",
        })
        .then((res) => JSON.parse(res))
        .then((info) => {
          info.thumbnail = path.join("/images/", name, info.thumbnail)
          info.folderName = name
          return info
        }),
    ),
  ).then((results) =>
    // Filter only fulfilled ones
    results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value),
  )
  // console.log("settledResults", settledResults) // dev

  const infos = settledResults.sort((a, b) =>
    compareDesc(parseISO(a.date), parseISO(b.date)),
  )

  return {
    infos,
  }
}
