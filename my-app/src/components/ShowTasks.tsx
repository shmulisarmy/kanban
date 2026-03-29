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
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Tasks</h1>
        <p className="page__subtitle">All your tasks across every board</p>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <p className="empty-state__text">No tasks yet. Create a board and start adding tasks to get going.</p>
        </div>
      ) : (
        tasks.map((task, i) => (
          <div
            key={task.id}
            className="task-page-card"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="task-page-card__indicator" />
            <div className="task-page-card__content">
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
              {task.task_list && (
                <button style={{ marginTop: '0.5rem' }} className="btn-ghost">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  {task.task_list}
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
