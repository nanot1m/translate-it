import "./index.css"

import React, { useState, useCallback } from "react"
import { TranslationBlock } from "components/TranslationBlock"
import { unstable_batchedUpdates } from "react-dom"

const languages = [
  ["Русский", "ru"],
  ["English", "en"],
  ["Deutsch", "de"],
]

export function App() {
  const [text, setText] = useState("Hello, electron!")
  const [lang, setLang] = useState("en")
  const [langages, setLanguages] = useState(languages)

  const handleTextChange = useCallback((text: string, lang: string) => {
    unstable_batchedUpdates(() => {
      setText(text)
      setLang(lang)
    })
  }, [])

  return (
    <div className="App">
      {langages.map(([title, tLang]) => (
        <div className="App__block" key={tLang}>
          <h3>{title}</h3>
          <TranslationBlock
            text={text}
            fromLang={lang}
            toLang={tLang}
            rows={5}
            onTextChange={handleTextChange}
          />
        </div>
      ))}
    </div>
  )
}
