import { reactive, ref } from "vue"



type Message = {
  type: 'initial-data' | 'create' | 'update' | 'delete'
  data?: any
  id?: number
}

export default function UseChannelHook<T extends {id: number}>(ws_url: string){


  const rows = reactive<Record<number, T>>({})
    console.log(`about to create connection to ws: ${ws_url}`)
    const ws = new WebSocket(ws_url)
    ws.onmessage = function (event: MessageEvent) {
    const data: Message = JSON.parse(event.data)
    console.log('message', data)
    switch (data.type) {
      case 'initial-data':
        Object.assign(rows, data.data)
        break
      case 'create':
        console.assert(!(data.data.id in rows), `Row with id ${data.data.id} already exists in rows`)
        rows[data.data.id] = data.data
        break 
      case 'update':
        console.assert(data.data.id in rows, `Row with id ${data.data.id} not found in rows`)
        rows[data.data.id] = data.data
        break
      case 'delete':
        delete rows[data.id!]
        break
      default:
        throw new Error(`Unknown message type: ${data.type}`)
    }
  }
  return [rows, ws] as const
}