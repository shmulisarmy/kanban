import type { Task } from "./ShowTasks";
import { WS_BASE_URL } from "../settings";
import ChannelHook from "../hooks/ChannelHook";
import { toast } from "react-toastify";
import { useState } from "react";
import { TitleOrTextInput } from "./utils";
import { change_list_title, change_task_list, change_task_title, create_task, remove_list } from "../generated";

export type List  = {
    id: number
    title: string
    tasks: Task[]
  }





let currently_dragging_task: {id: number, list_id: number} | null = null


setInterval(() => {
  console.log('currently_dragging_task_id', currently_dragging_task)
}, 100)



function Task_C({task, list_id}: {task: Task, list_id: number}) {
return<div
onDragStart={() => {
  currently_dragging_task = {id: task.id, list_id: list_id}
}}
onDragEnd={() => {
  currently_dragging_task = null
}}
draggable

key={task.id} style={{ marginBottom: '10px', padding: '5px', border: '1px solid #eee' }}>
          <TitleOrTextInput text={task.title} onChange={function(new_task_name){
            if (!new_task_name) {
              toast.error('Task name is required')
              return
            }
            change_task_title(task.id, new_task_name)
          }} />
          <p>{task.description}</p>
        </div>
}


export function TaskList({list, board_id}: {list: List, board_id: number}) {

  const ws_url = `${WS_BASE_URL}/list/${list.id}`  

  return <>
  <div 
  className='min-w-[300px] '
    onDragOver={(e) => {
      e.preventDefault()
    }}
    onDrop={(e) => {
      e.preventDefault()
      if (!currently_dragging_task) {
        toast.error('No task is being dragged')
        return
      }
      change_task_list(currently_dragging_task.id, currently_dragging_task.list_id, list.id)
      currently_dragging_task = null
    }}
  style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', position: 'relative' }}>
    <TitleOrTextInput text={list.title} onChange={(new_title) => {
      // TODO: Implement title change
      change_list_title(list.id, new_title)
    }} />
    <button style={{ marginLeft: '10px', position: 'absolute', top: '10px', right: '10px', border: "1px solid rgb(215, 80, 80)" }} onClick={() => {
      remove_list(board_id, list.id)
    }}>X</button>
      
   <TaskListTasks list={list} ws_url={ws_url} />
   <form action="" onSubmit={(e) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    create_task(list.id, name)
   }}>
    <input type="text" name="name" placeholder="Task name" />
    <button type="submit">Add Task</button>
   </form>
   
</div>
  </>
  
}






export function TaskListTasks({list, ws_url}: {list: List, ws_url: string}) {


  const tasks = ChannelHook<Task>(ws_url)


  return (
    <div className="list">    
      {Object.values(tasks).map((task) => (
        <Task_C key={task.id} task={task} list_id={list.id} />
      ))}
      </div>
    
  )
}

