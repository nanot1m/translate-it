import { Instance, types as t } from "mobx-state-tree"

import { flow } from "utils/flow"

import { Lang, Source, Translation } from "models"

export const AppStore = t
  .model("AppStore", {
    source: Source,
    translations: t.array(Translation),
  })
  .actions(self => {
    const translate = flow(function* translate(text: string, lang: Lang) {
      self.source.text = text
      self.source.lang = lang
      yield Promise.all(self.translations.map(tr => tr.translate(text, lang)))
    })

    return {
      translate,
    }
  })

export type AppStore = Instance<typeof AppStore>
