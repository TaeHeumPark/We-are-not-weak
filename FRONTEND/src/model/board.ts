export type Board = {
  title: string
  content: string
  date: string
  id: number
  state?: number
  nickname?: string
}

export type FreeBoard = {
  post: Board
  level: number
  view?: number
  type?: number
}

export type CounselBoard = {
  post: Board
  type?: number
}

export interface BoardData {
  content: string
  date: string
  level: number
  status: number
  title: string
  type: number
  userId: number
  views: number
  id?: number
  nickname: string
  email: string
  reviews?: number
}

export type CommentData = Omit<Board, 'title'>
