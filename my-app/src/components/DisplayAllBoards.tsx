import { useEffect, useState } from "react"
import { API_BASE_URL, our_url, user_id } from "../settings"
import { create_board } from "../generated"



let last_drag_over_board: null|Date = new Date()

export default function DisplayAllBoards() {
  const [boards, setBoards] = useState<Board[]>([])
  useEffect(() => {
    fetch(`${API_BASE_URL}/boards/${user_id}`)
      .then(res => res.json())
      .then(data => setBoards(data))
  }, [])
  return (
    <div>
      <h1>Boards</h1>
      {Object.values(boards).map(board => (
        <div key={board.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}
        onDragOver={(e) => {
            // if (!last_drag_over_board )return
            const ms_since_last_drag_over = (new Date().getTime - last_drag_over_board);
            e.preventDefault()
            if (ms_since_last_drag_over < 1000) {
                console.log(`Dragged over ${{last_drag_over_board}} ${{time: new Date().getTime}} too fast`)
              return
            }
            last_drag_over_board = new Date().getTime()
          window.location.href = `${our_url}board/${board.id}/`
        }}
        >
          <h2>{board.title}</h2>
          <button onClick={() => window.location.href = `/board/${board.id}/`}>Open</button>
        </div>
      ))}
      <form style={{ marginTop: '20px', display: 'flex', gap: '10px' }} onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const title = formData.get('title') as string
        if (!title) return
        const res = await create_board(title, user_id)
        const board = (res as any).board
        if (board?.id) {
          window.location.href = `/board/${board.id}/`
        }
      }}>
        <input type="text" name="title" placeholder="New board name" />
        <button type="submit">Create Board</button>
      </form>
    </div>
  )
}

