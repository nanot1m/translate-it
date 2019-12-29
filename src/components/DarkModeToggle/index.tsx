import React, { useCallback, useState } from "react"

import "./index.css"

export function DarkModeToggle() {
  const [darkModeEnabled, setDarkMode] = useState(getInitalState)

  const handleDarkModeChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const checked = ev.target.checked
      if (checked) {
        document.documentElement.classList.add("dark-mode")
      } else {
        document.documentElement.classList.remove("dark-mode")
      }
      setDarkMode(checked)
    },
    [],
  )

  return (
    <label className="DarkModeToggle">
      <input
        type="checkbox"
        checked={darkModeEnabled}
        onChange={handleDarkModeChange}
      />
      <span>Dark mode</span>
    </label>
  )
}

function getInitalState() {
  return document.documentElement.classList.contains("dark-mode")
}
