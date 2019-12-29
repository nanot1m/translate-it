import React from "react"
import { useObserver } from "mobx-react"

import { TranslationBlock } from "components/TranslationBlock"

import { AppStore } from "models/AppStore"

import "./index.css"

export function App({ store }: { store: AppStore }) {
  const { translations, translate } = store

  return useObserver(() => (
    <div className="App">
      {translations.map(translation => (
        <div className="App__block" key={translation.targetLang}>
          <h3>{translation.title}</h3>
          <TranslationBlock
            translation={translation}
            rows={5}
            onTextChange={translate}
          />
        </div>
      ))}
    </div>
  ))
}
