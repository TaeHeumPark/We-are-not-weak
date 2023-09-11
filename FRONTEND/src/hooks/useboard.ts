import {
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { BoardData } from '../model/board'

export const getBoards = () => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}articles`)
    .then((res) => res.data)
}

export const getBoard = (id: number | null) => {
  console.log('여기는 useboard.ts')
  console.log(`${process.env.REACT_APP_BASE_URL}articles/${id}`)
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}articles/${id}`)
    .then((res) => res.data)
}

// export const getBoard = () => {
//   return axios.get(`/articles`).then((res) => {
//     const posts = res.data
//     const sortedPosts = posts.sort(
//       (a: any, b: any) =>
//         new Date(a.date).getTime() - new Date(b.date).getTime(),
//     )
//     return sortedPosts
//   })
// }
// export const useGetBoard = () => {
//   useQuery(['qna'], getBoard)
// }

export const postBoard = (board: BoardData) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}articles`, board)
}

export const usePostBoard = () => {
  const queryClient = useQueryClient()
  return useMutation(postBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries('qna')
    },
  })
}
