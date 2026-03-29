import { useState } from "react"

export function TitleOrTextInput({ text, onChange }: { text: string, onChange?: (newTitle: string) => void }) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <input
        className="inline-edit__input"
        type="text"
        autoFocus
        defaultValue={text}
        onBlur={() => setIsEditing(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange?.(e.currentTarget.value)
            setIsEditing(false)
          }
          if (e.key === 'Escape') {
            setIsEditing(false)
          }
        }}
      />
    )
  }

  return (
    <div className="inline-edit">
      <span className="inline-edit__text" onClick={() => setIsEditing(true)}>
        {text}
      </span>
      <svg
        className="inline-edit__icon"
        onClick={() => setIsEditing(true)}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    </div>
  )
}
