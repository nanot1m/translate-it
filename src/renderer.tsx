import React from "react"
import { render } from "react-dom"

import { App } from "components/App"

import { AppStore } from "models/AppStore"

import "./index.css"

const store = AppStore.create({
  source: {
    lang: "en",
    text: "Hello",
  },
  translations: [
    { title: "Русский", targetLang: "ru" },
    { title: "English", targetLang: "en" },
    { title: "Deutsh", targetLang: "de" },
  ],
})

render(<App store={store} />, document.getElementById("root"))
