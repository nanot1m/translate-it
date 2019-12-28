import { types as t, Instance } from "mobx-state-tree"
import { Lang, Translation, Source } from "models"
import { flow } from "utils/flow"

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

    function afterCreate() {
      translate(self.source.text, self.source.lang)
    }

    return {
      translate,
      afterCreate,
    }
  })

export type AppStore = Instance<typeof AppStore>
