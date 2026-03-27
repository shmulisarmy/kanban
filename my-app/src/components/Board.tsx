
import { useEffect, useState } from 'react'
import { API_BASE_URL, WS_BASE_URL } from '../settings'
import type { Task } from './ShowTasks'
import UseChannelHook from '../hooks/ChannelHook'
import { toast } from 'react-toastify'
import { TaskList, type List } from './List'
import DisplayAllBoards from './DisplayAllBoards'
import { create_list } from '../generated'






  
  type Board = {
    id: number
    title: string
    lists: List[]
  }




export default function Page() {
const boardIdParam = window.location.pathname.split('/')[2];
  if (!boardIdParam) {
    return <div>nothing passed as board id</div>
  }
  
  return <Board boardId={boardIdParam} />
}
export function Board({ boardId }: { boardId: string }) {
  
  const [board, setBoard] = useState<Board | null>(null)



    
  useEffect(() => {
    fetch(`${API_BASE_URL}/board/${boardId}/`)
      .then(res => res.json())
      .then(data => setBoard(data.board))
  }, [])


  const lists = UseChannelHook<List>(`${WS_BASE_URL}/board/${boardId}`)

  return (
    <div style={{ padding: '20px' }}>
      {/* <DisplayAllBoards /> */}
        <>
        {/* <h1>{board.title}</h1> */}
        <div key={boardId} style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '20px',
        }}>
          
          {Object.values(lists).map(list => (
            <TaskList key={list.id} list={list} board_id={parseInt(boardId)} />  
          ))}
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
              height: 'fit-content',
            }}
          action="" onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const name = formData.get('name') as string
            create_list(name, parseInt(boardId))
          }}>
            <input type="text" name="name" placeholder="List name" />
            <button type="submit">Add List</button>
          </form>
        </div>
        </>
      
    </div>
  )
}


