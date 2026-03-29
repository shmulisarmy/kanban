import { createRef, useEffect, useState } from "react"



type Message = {
  type: 'initial-data' | 'create' | 'update' | 'delete'
  data?: any
  id?: number
}

export default function UseChannelHook<T extends {id: number}>(ws_url: string){

  const [rows, setRows] = useState<Record<number, T>>({})

  const ws = createRef<WebSocket>()
  useEffect(() => {
    console.log(`about to create connection to ws: ${ws_url}`)
    ws.current = new WebSocket(ws_url)
    ws.current.onmessage = function (event: MessageEvent) {
    const data: Message = JSON.parse(event.data)
    console.log('message', data)
    switch (data.type) {
      case 'initial-data':
        setRows(data.data)
        break
      case 'create':
        console.assert(!(data.data.id in rows), `Row with id ${data.data.id} already exists in rows`)
        setRows(prev => ({...prev, [data.data.id]: data.data}))
        break 
      case 'update':
        console.assert(data.data.id in rows, `Row with id ${data.data.id} not found in rows`)
        setRows(prev => ({...prev, [data.data.id]: data.data}))
        break
      case 'delete':
        setRows(prev => {
          const newRows = {...prev}
          delete newRows[data.id!]
          return newRows
        })
        break
      default:
        throw new Error(`Unknown message type: ${data.type}`)
    }
  }
  return () => {
    ws.current?.close()
  }
}, [])
  return rows
}