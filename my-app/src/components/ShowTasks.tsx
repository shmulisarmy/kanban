import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../settings'

export type Task = {
  id: number
  title: string
  description: string
  task_list: string | null
}

export default function ShowTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/tasks_get_tasks/shmuli/`)
      .then(res => res.json())
      .then(data => setTasks(data.tasks))
  }, [])

  return (
    <div className="App">
      <h1>Tasks</h1>
      {tasks.map(task => (
        <div key={task.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {task.task_list && <button>go to list: {task.task_list}</button>}
          {/* <button>Move to Board</button> */}
        </div>
      ))}
    </div>
  )
}
