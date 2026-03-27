import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../settings'
import DisplayAllBoards from './DisplayAllBoards'

type Board = {
  id: number
  title: string
}

export default function Boards() {
  return (
    <DisplayAllBoards />
  )
}
