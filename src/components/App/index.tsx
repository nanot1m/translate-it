import React from "react"
import { useObserver } from "mobx-react"

import { DarkModeToggle } from "components/DarkModeToggle"
import { TranslationBlock } from "components/TranslationBlock"

import { AppStore } from "models/AppStore"

import "./index.css"

export function App({ store }: { store: AppStore }) {
  const { translations, translate } = store

  return useObserver(() => (
    <div className="App">
      <header className="App__header">
        <DarkModeToggle />
      </header>
      <main className="App__translations">
        {translations.map(translation => (
          <section className="App__block" key={translation.targetLang}>
            <h3>{translation.title}</h3>
            <TranslationBlock
              translation={translation}
              rows={5}
              onTextChange={translate}
            />
          </section>
        ))}
      </main>
    </div>
  ))
}
