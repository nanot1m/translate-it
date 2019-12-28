import { types as t, Instance } from "mobx-state-tree"
import { Lang } from "models"

export const Source = t.model("Source", {
  text: t.optional(t.string, ""),
  lang: Lang,
})

export type Source = Instance<typeof Source>
