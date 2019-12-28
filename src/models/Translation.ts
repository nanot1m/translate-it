import { types as t, Instance } from "mobx-state-tree"

import { Lang } from "models"
import { translator } from "translator/Translator"
import { flow } from "utils/flow"

export const Translation = t
  .model("Translation", {
    title: t.string,
    translatedText: t.optional(t.string, ""),
    targetLang: Lang,
  })
  .actions(self => {
    const translate = flow(function* translate(text: string, lang: Lang) {
      const result = yield translator.translate(text, lang, self.targetLang)
      setTranslatedText(result.text[0])
    })

    function speak() {
      const utterance = new SpeechSynthesisUtterance(self.translatedText)
      utterance.lang = self.targetLang
      window.speechSynthesis.speak(utterance)
    }

    function setTranslatedText(text: string) {
      self.translatedText = text
    }

    function setTargetLang(lang: Lang) {
      self.targetLang = lang
    }

    return {
      setTargetLang,
      setTranslatedText,
      speak,
      translate,
    }
  })

export type Translation = Instance<typeof Translation>
