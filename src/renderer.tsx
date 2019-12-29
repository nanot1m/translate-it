import React from "react"
import { render } from "react-dom"
import { destroy, getSnapshot, IDisposer, onSnapshot } from "mobx-state-tree"

import { App } from "components/App"

import { AppStore } from "models/AppStore"

import "./index.css"

const localStorageKey = "translate-it-state"

const initialState = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey)!)
  : {
      source: {
        lang: "en",
        text: "",
      },
      translations: [
        { title: "Русский", targetLang: "ru" },
        { title: "English", targetLang: "en" },
        { title: "Deutsh", targetLang: "de" },
      ],
    }

let store: AppStore = AppStore.create(initialState)
let snapshotListener: IDisposer

function createTodoStore(snapshot: AppStore) {
  // clean up snapshot listener
  if (snapshotListener) snapshotListener()
  // kill old store to prevent accidental use and run clean up hooks
  if (store) destroy(store)

  // create new one
  store = require("models/AppStore").AppStore.create(snapshot)

  // connect local storage
  snapshotListener = onSnapshot(store, snapshot =>
    localStorage.setItem(localStorageKey, JSON.stringify(snapshot)),
  )

  return store
}

function renderApp(Cmp: typeof App, store: AppStore) {
  render(<Cmp store={store} />, document.getElementById("root"))
}

// Initial render
renderApp(App, createTodoStore(initialState))

// Connect HMR
if (module.hot) {
  module.hot.accept(["./models/AppStore"], () => {
    // Store definition changed, recreate a new one from old state
    renderApp(App, createTodoStore(getSnapshot<AppStore>(store)))
  })

  module.hot.accept(["./components/App"], () => {
    // Componenent definition changed, re-render app
    renderApp(require("components/App").App, store)
  })
}
