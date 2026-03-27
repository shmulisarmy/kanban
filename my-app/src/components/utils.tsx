import { useState } from "react"

export function TitleOrTextInput({text, onChange}: {text: string, onChange?: (new_title: string) => void}) {
    const [is_editing, setIsEditing] = useState(false)
    const [is_hovering, setIshovering] = useState(false)
    const svg = <svg onClick={() => setIsEditing(true)} style={{ transform: 'translateY(-4px)' }} width="18" height="18" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M17.093,1.293l-11.2,11.2a.99.99,0,0,0-.242.391l-1.6,4.8A1,1,0,0,0,5,19a1.014,1.014,0,0,0,.316-.051l4.8-1.6a1.006,1.006,0,0,0,.391-.242l11.2-11.2a1,1,0,0,0,0-1.414l-3.2-3.2A1,1,0,0,0,17.093,1.293ZM9.26,15.526l-2.679.893.893-2.679L17.8,3.414,19.586,5.2ZM3,21H20a1,1,0,0,1,0,2H3a1,1,0,0,1,0-2Z"></path></g></svg>
    if (!is_editing) {
        return <div 
            onMouseEnter={() => setIshovering(true)}
            onMouseLeave={() => setIshovering(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',                
                // justifyContent: 'center',
            }}
        >
            <h3 onClick={() => setIsEditing(true)}>{text} </h3>
            {is_hovering && svg}
        </div>
    }
    return <input type="text" onBlur={() => setIsEditing(false)} onKeyDown={(e) => {
      if (e.key === 'Enter') {
        onChange?.(e.currentTarget.value)
        setIsEditing(false)
      }
    }} defaultValue={text} />
}