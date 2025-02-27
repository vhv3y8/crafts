import { addHours, formatISO } from "date-fns"
import fs from "fs/promises"
import path from "path"
import { redirect } from "@sveltejs/kit"

const projectRoot = path.join(process.cwd(), "../..")
const infoGenDir = path.join(projectRoot, "crafts-info-gen")

const mimeToExt = {
  "image/svg+xml": "svg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  edit: async ({ request }) => {
    const data = await request.formData()
    console.log("data", data)

    // TODO: Validation

    const originalInfo = await fs
      .readFile(path.join(infoGenDir, data.get("foldername"), "info.json"), {
        encoding: "utf8",
      })
      .then((res) => JSON.parse(res))

    // TODO : thumbnail image file naming is trash
    const thumbnail = data.get("thumbnail")
    const info = {
      name: data.get("name"),
      description: data.get("description"),
      date: new Date(data.get("date")).toISOString(),
      used: JSON.parse(data.get("used")),
      thumbnail:
        0 < thumbnail.size
          ? `1.${mimeToExt[thumbnail.type]}`
          : originalInfo.thumbnail,
    }
    console.log("update info", info)

    try {
      await fs.writeFile(
        path.join(infoGenDir, data.get("foldername"), "info.json"),
        JSON.stringify(info, null, 2),
      )

      // Overwrite thumbnail image if given
      if (0 < thumbnail.size) {
        const arrayBuffer = await thumbnail.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        await fs.writeFile(
          path.join(
            infoGenDir,
            data.get("foldername"),
            `1.${mimeToExt[thumbnail.type]}`,
          ),
          buffer,
        )
      } else {
        console.log("New thumbnail isn't given. Not overwriting.")
      }

      return { success: true }
    } catch (e) {
      console.error(e)
    }

    return { success: false }
  },

  create: async ({ request }) => {
    const data = await request.formData()
    console.log("data", data)

    await fs.mkdir(path.join(infoGenDir, data.get("foldername")))
    // TODO : thumbnail image file naming is trash
    const thumbnail = data.get("thumbnail")
    const info = {
      name: data.get("name"),
      description: data.get("description"),
      date: new Date(data.get("date")).toISOString(),
      used: JSON.parse(data.get("used")),
      thumbnail: 0 < thumbnail.size ? `1.${mimeToExt[thumbnail.type]}` : "",
    }

    try {
      await fs.writeFile(
        path.join(infoGenDir, data.get("foldername"), "info.json"),
        JSON.stringify(info, null, 2),
      )

      // Overwrite thumbnail image if given
      if (0 < thumbnail.size) {
        const arrayBuffer = await thumbnail.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        await fs.writeFile(
          path.join(
            infoGenDir,
            data.get("foldername"),
            `1.${mimeToExt[thumbnail.type]}`,
          ),
          buffer,
        )
      } else {
        console.log("New thumbnail isn't given. Not overwriting.")
      }

      return { success: true }
    } catch (e) {
      console.error(e)
    }

    return { success: false }
  },
}
