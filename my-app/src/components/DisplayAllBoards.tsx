import { useEffect, useState } from "react"
import { API_BASE_URL, user_id } from "../settings"
import { get_user_boards } from "../generated"

type Board = {
  id: number
  title: string
}

export default function DisplayAllBoards() {
  const [boards, setBoards] = useState<Board[]>([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
      get_user_boards(user_id).then(data => setBoards(data))
  }, [])

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Boards</h1>
        <p className="page__subtitle">Organize your work across boards</p>
      </div>

      <div className="boards-grid">
        {Object.values(boards).map((board, i) => (
          <div
            key={board.id}
            className="board-card"
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => window.location.href = `/board/${board.id}/`}
          >
            <div className="board-card__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
              </svg>
            </div>
            <h2 className="board-card__title">{board.title}</h2>
            <div className="board-card__footer">
              <span>Open board</span>
              <svg className="board-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        ))}

        {!showForm ? (
          <div className="board-card board-card--new" onClick={() => setShowForm(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Create new board</span>
          </div>
        ) : (
          <div className="board-card" style={{ cursor: 'default' }}>
            <form className="create-board-form" style={{ flexDirection: 'column' }} onSubmit={async (e) => {
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
              <h3 style={{ marginBottom: '0.5rem' }}>New board</h3>
              <input type="text" name="title" placeholder="Board name..." autoFocus />
              <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.25rem' }}>
                <button type="submit" className="btn-primary">Create</button>
                <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>

      {boards.length === 0 && !showForm && (
        <div className="empty-state" style={{ marginTop: '1rem' }}>
          <div className="empty-state__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="M15 3v18" />
            </svg>
          </div>
          <p className="empty-state__text">No boards yet. Click the card above to create your first board.</p>
        </div>
      )}
    </div>
  )
}
