export interface Counsel {
  maxClient: number
  minClient: number
  counselid: number
  startDate: string
  endDate: string
  counselCount: number
  title: string
  state: number
  clientCount: number
  price: number
  counselorId: number
  introduction: string
  weekCount: number
  counselorName: string
}

export interface Curriculrum {
  curriculumId: number
  title: string
  content: string
  counselId: number
}

// export interface Consulting  {
//   id: number
//   date: string
//   content: string
//   state?: number
// }

export interface CounselorData {
  counselorName: string
  counselorId: number
  userId: number
  name?: string
  profile: string | null
  regist: string | null
  license: string | null
  school: string | null
  company: string | null
  introduction: string | null | undefined
  rateSum: number
  state: number
  careers: string[]
}

export interface TestimonyData {
  id: number
  date: string
  consulting: string
  nickname: string
  userId: number
  counselTitle: string
  counselId: number
}
export interface PostTestimonyData {
  content: string
  userId: number
  counselId: number
}
//상담일지
export interface CounselJournalData {
  id: number
  date: string
  content: string
  nickname: string
  userId: number
  counselTitle: string
  counselId: number
}

// 소감문
export interface RolePlayData {}
