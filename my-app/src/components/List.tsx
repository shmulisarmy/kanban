import type { Task } from "./ShowTasks"
import { WS_BASE_URL } from "../settings"
import ChannelHook from "../hooks/ChannelHook"
import { toast } from "react-toastify"
import { useState } from "react"
import { TitleOrTextInput } from "./utils"
import { change_list_title, change_task_list, change_task_title, create_task, delete_task, remove_list } from "../generated"

export type List = {
  id: number
  title: string
  tasks: Task[]
}

let currentlyDragging: { id: number; list_id: number } | null = null

/* ── Single task card ── */

function TaskCard({ task, listId }: { task: Task; listId: number }) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={() => { currentlyDragging = { id: task.id, list_id: listId } }}
      onDragEnd={() => { currentlyDragging = null }}
    >
      <div className="task-card__handle">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="8" cy="4" r="2" /><circle cx="16" cy="4" r="2" />
          <circle cx="8" cy="12" r="2" /><circle cx="16" cy="12" r="2" />
          <circle cx="8" cy="20" r="2" /><circle cx="16" cy="20" r="2" />
        </svg>
      </div>

      <div className="task-card__body">
        <TitleOrTextInput
          text={task.title}
          onChange={(newName) => {
            if (!newName) {
              toast.error('Task name is required')
              return
            }
            change_task_title(task.id, newName)
          }}
        />
        {task.description && <p>{task.description}</p>}
      </div>

      <button
        className="btn-danger btn-icon task-card__delete"
        onClick={() => delete_task(listId, task.id)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

/* ── Full list column ── */

export function TaskList({ list, board_id }: { list: List; board_id: number }) {
  const wsUrl = `${WS_BASE_URL}/list/${list.id}`
  const [isDragOver, setIsDragOver] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const tasks = ChannelHook<Task>(wsUrl)
  const taskCount = Object.keys(tasks).length

  return (
    <div
      className={`column${isDragOver ? ' column--drag-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragOver(false)
        if (!currentlyDragging) {
          toast.error('No task is being dragged')
          return
        }
        change_task_list(currentlyDragging.id, currentlyDragging.list_id, list.id)
        currentlyDragging = null
      }}
    >
      {`${list.id}`}
      {/* Header */}
      <div className="column__header">
        <div className="column__header-left">
          <TitleOrTextInput
            text={list.title}
            onChange={(newTitle) => change_list_title(list.id, newTitle)}
          />
          <span className="column__count">{taskCount}</span>
        </div>
        <div className="column__actions">
          <button
            className="btn-danger btn-icon"
            onClick={() => remove_list(board_id, list.id)}
            title="Delete list"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="column__body">
        {Object.values(tasks).map((task) => (
          <TaskCard key={task.id} task={task} listId={list.id} />
        ))}
      </div>

      {/* Footer — Add task */}
      <div className="column__footer">
        {!showAddTask ? (
          <button className="add-task-trigger" onClick={() => setShowAddTask(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add a task
          </button>
        ) : (
          <form
            className="add-task-form"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const name = formData.get('name') as string
              if (!name) return
              create_task(list.id, name);
              (e.target as HTMLFormElement).reset()
            }}
          >
            <input type="text" name="name" placeholder="What needs to be done?" autoFocus />
            <div className="add-task-form__actions">
              <button type="submit" className="btn-primary">Add</button>
              <button type="button" className="btn-ghost" onClick={() => setShowAddTask(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
