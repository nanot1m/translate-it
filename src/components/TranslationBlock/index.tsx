import React, { CSSProperties } from "react"
import { useLocalStore, useObserver } from "mobx-react"

import { Translation } from "models/Translation"

import "./index.css"

type Props = {
  translation: Translation
  rows?: number
  onTextChange(text: string, lang: string): void
}

export function TranslationBlock({
  translation,
  rows = 4,
  onTextChange,
}: Props) {
  const store = useLocalStore(() => ({
    isEditing: false,
    text: "",
    startEditing() {
      store.text = translation.translatedText
      store.isEditing = true
    },
    endEditing() {
      if (translation.translatedText !== store.text) {
        onTextChange(store.text, translation.targetLang)
      }
      translation.setTranslatedText(store.text)
      store.isEditing = false
    },
    changeText(ev: React.ChangeEvent<HTMLTextAreaElement>) {
      store.text = ev.target.value
    },
  }))

  return useObserver(() => (
    <div
      className="TranslationBlock"
      style={{ "--rows": rows } as CSSProperties}
    >
      {store.isEditing ? (
        <textarea
          className="TranslationBlock__input"
          value={store.text}
          onChange={store.changeText}
          onFocus={ev => ev.target.select()}
          onBlur={store.endEditing}
          autoFocus
        />
      ) : (
        <div
          className="TranslationBlock__text"
          tabIndex={0}
          onFocus={store.startEditing}
        >
          {translation.translatedText}
        </div>
      )}
      <button
        className="TranslationBlock__button"
        type="button"
        onClick={translation.speak}
      >
        🗣
      </button>
    </div>
  ))
}
