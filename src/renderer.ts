import "./index.css"

import { render } from "react-dom"
import { createElement } from "react"
import { App } from "components/App"
import { AppStore } from "models/AppStore"

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

render(createElement(App, { store }), document.getElementById("root"))
