import "./index.css";

import React, { useState, useEffect, CSSProperties, useCallback } from "react";
import { translator } from "translator/Translator";

type Props = {
  text: string;
  fromLang: string;
  toLang: string;
  rows?: number;
  onTextChange(text: string, lang: string): void;
};

export function TranslationBlock({
  text,
  fromLang,
  toLang,
  rows = 4,
  onTextChange
}: Props) {
  const [displayingText, setDisplayingText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function translate() {
      const result = await translator.translate(text, fromLang, toLang);
      if (!cancelled) setDisplayingText(result.text[0]);
    }
    translate();
    return () => {
      cancelled = true;
    };
  }, [text, fromLang, toLang]);

  const speak = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      if (displayingText) translator.speak(displayingText, toLang);
    },
    [displayingText]
  );

  const startEditing = useCallback(() => {
    setEditingText(displayingText);
    setEditing(true);
  }, [displayingText]);

  const endEditing = useCallback(() => {
    setDisplayingText(editingText);
    setEditing(false);
    if (displayingText !== editingText) {
      onTextChange(editingText, toLang);
    }
  }, [editingText, toLang, displayingText]);

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditingText(ev.target.value);
    },
    []
  );

  return (
    <div
      className="TranslationBlock"
      style={{ "--rows": rows } as CSSProperties}
    >
      {editing ? (
        <textarea
          className="TranslationBlock__input"
          value={editingText}
          onChange={handleChange}
          onFocus={ev => ev.target.select()}
          onBlur={endEditing}
          autoFocus
        />
      ) : (
        <div
          className="TranslationBlock__text"
          tabIndex={0}
          onFocus={startEditing}
        >
          {displayingText}
        </div>
      )}
      <button
        className="TranslationBlock__button"
        type="button"
        onClick={speak}
      >
        🗣
      </button>
    </div>
  );
}
