import {
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { PostTestimonyData, TestimonyData } from '../model/counsel'

// export const postTestimonies = (
//   testimony: PostTestimonyData,
//   counselId: number,
// ) => {
//   return axios.post(`api/counsel/}consulting/${counselId}`, testimony)
// }

// export const usePostTestimony = () => {
//   return useMutation(postTestimonies)
// }
