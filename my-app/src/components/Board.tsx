import { useState } from 'react'
import { WS_BASE_URL } from '../settings'
import UseChannelHook from '../hooks/ChannelHook'
import { TaskList, type List } from './List'
import { create_list } from '../generated'

export default function Page() {
  const boardIdParam = window.location.pathname.split('/')[2];
  if (!boardIdParam) {
    return <div className="page"><p>No board ID provided.</p></div>
  }
  return <Board boardId={boardIdParam} />
}

export function Board({ boardId }: { boardId: string }) {
  const lists = UseChannelHook<List>(`${WS_BASE_URL}/board/${boardId}`)
  const [showAddList, setShowAddList] = useState(false)

  return (
    <div className="board-view">
      <div className="board-columns">
        {Object.values(lists).map((list, i) => (
          <div key={list.id} style={{ animationDelay: `${i * 60}ms` }}>
            <TaskList list={list} board_id={parseInt(boardId)} />
          </div>
        ))}

        {!showAddList ? (
          <button className="add-list-trigger" onClick={() => setShowAddList(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add list
          </button>
        ) : (
          <form className="add-list-form" onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const name = formData.get('name') as string
            if (!name) return
            create_list(name, parseInt(boardId));
            (e.target as HTMLFormElement).reset()
          }}>
            <input type="text" name="name" placeholder="List name..." autoFocus />
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              <button type="submit" className="btn-primary">Add list</button>
              <button type="button" className="btn-ghost" onClick={() => setShowAddList(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
