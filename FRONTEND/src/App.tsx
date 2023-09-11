import React, { ChangeEvent, useState } from 'react'
import './App.css'
// import Button from './components/Button'
// import NavbarLogin from './components/NavbarLogin'
// import NavbarLogout from './components/NavbarLogout'
// import CounselorCard from './components/CounselorCard'
// import { CurriculumBox } from './components/CurriculumBox'
// import Input from './components/Input'
// import Table from './components/Table'
// import Comment from './components/Comment'
// import ArticleBar from './components/ArticleBar'
// import CounselingBar from './components/CounselingBar'
// import Footer from './components/Footer'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { Main } from './routes/Main'
import { Login } from './routes/Login'
import { SignUp } from './routes/SignUp'
import { Profile } from './routes/Profile'
import { ProfileEdit } from './routes/ProfileEdit'
import { Notice } from './routes/Notice'
import { NoticeDetail } from './routes/NoticeDetail'
import { FreeBoard } from './routes/FreeBoard'
import { FreeBoardDetail } from './routes/FreeBoardDetail'
import { Counsel } from './routes/Counsel'
import { CounselDetail } from './routes/CounselDetail'
import { CounselEdit } from './routes/CounselEdit'
import { CounselorDetail } from './routes/CounselorDetail'
import { Counselor } from './routes/Counselor'
import { CounselMake } from './routes/CounselMake'
import { CounselReady } from './routes/CounselReady'
import { CounselStart } from './routes/CounselStart'
import { QnaDetail } from './routes/QnaDetail'
import { Qna } from './routes/Question'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Alarm } from './routes/Alarm'
import { NoticeWrite } from './routes/NoticeWrite'
import { FreeBoardWrite } from './routes/FreeBoardWrite'
import { QnaWrite } from './routes/QnaWrite'
import { FreeBoardEdit } from './routes/FreeBoardEdit'
import { CounselJournal } from './routes/CounselJournal'
import { Service } from './routes/Service'
import { Drug } from './routes/Drug'
import { ClientList } from './routes/ClientList'
import NotFound from './routes/NotFound'
import { Write } from './components/Write'
import { CounselorConfirm } from './routes/CounselorConfirm'
import { CounselorConfirmAdmin } from './routes/CounselorConfirmAdmin'
import { MyComments } from './routes/MyComments'
import { MyBoards } from './routes/MyBoards'
import { SelfHelpGroup } from './routes/SelfHelpGroup'
import CounselOpenvidu from './openvidu/CounselOpenvidu'
import { CheckAdmin, CheckCounselor, CheckLogin } from './routes/PrivateRoute'
import { Testimony } from './routes/Testimony'
import { QnaEdit } from './routes/QnaEdit'
import { useRecoilState } from 'recoil'
import { userState } from './recoil/atoms/userState'
import { login } from './features/auth/authSlice'

type CurriculumParams = {
  curriculumId: string
}

interface CounselOpenviduProps {
  curriculumId: string
}

const queryClient = new QueryClient()

function App(): React.ReactElement {
  const [user, setUser] = useRecoilState(userState)
  const loginStatus = user.type
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            {/* 로그인 페이지 */}
            <Route path="/login" element={<Login />} />

            {/* 회원가입페이지 */}
            <Route path="/signup" element={<SignUp />} />
            {/* 내 마이페이지 */}
            <Route path="/profile/:userId/" element={<Profile />} />
            {/* 내 마이페이지 수정페이지 */}
            <Route path="/profile/edit/" element={<ProfileEdit />} />
            {/* 내가 쓴 게시글 */}
            {/* <Route path="/${user.id}/MyBoards/" element={<MyBoards />} /> */}
            {/* 내가 쓴 댓글 */}
            {/* <Route path="/userId/myComments" element={<MyComments />} /> */}
            {/* 공지페이지 */}
            <Route path="/notice" element={<Notice />} />
            {/* 공지 상세페이지 */}
            <Route path="/notice/:noticeId" element={<NoticeDetail />} />
            {/* 공지 작성페이지 */}
            <Route
              path="/notice/write"
              element={
                <CheckAdmin
                  authenticated={loginStatus}
                  component={<NoticeWrite />}
                />
              }
            />
            {/* 자유게시판페이지 */}
            <Route path="/freeboard" element={<FreeBoard />} />
            {/* 자유게시판 상세피이지 */}
            <Route
              path="/freeboard/:freeboardId"
              element={<FreeBoardDetail />}
            />
            {/* 자유게시판 작성페이지 */}
            <Route
              path="/freeboard/write"
              element={
                <CheckLogin
                  authenticated={loginStatus}
                  component={<FreeBoardWrite />}
                />
              }
            />
            {/* 자유게시판 수정페이지 */}
            <Route
              path="/freeboard/edit/:freeboardId"
              element={<FreeBoardEdit />}
            />
            {/* 상담리스트페이지 */}
            <Route path="/counsel" element={<Counsel />} />
            {/* 상담상세페이지 */}
            <Route path="/counsel/:counselId" element={<CounselDetail />} />
            {/* 상담 일지 페이지 */}
            <Route
              path={'/counsel/counseljournal/:counselId'}
              element={<CounselJournal />}
            />
            {/* 상담상세 수정페이지 */}
            <Route path="/counsel/edit/:counselId" element={<CounselEdit />} />
            {/* 상담개설 페이지 */}
            <Route
              path="/counsel/make"
              element={
                <CheckCounselor
                  authenticated={loginStatus}
                  component={<CounselMake />}
                />
              }
            />
            {/* 상담사리스트페이지 */}
            <Route path="/counselor" element={<Counselor />} />
            {/* 상담사상세페이지 */}
            <Route
              path="/counselor/:counselorId"
              element={<CounselorDetail />}
            />
            {/* 상담 준비페이지 */}
            <Route path="/counsel/ready/counselId" element={<CounselReady />} />
            {/* 상담 시작페이지 */}
            <Route path="/counsel/start/counselId" element={<CounselStart />} />
            {/* 상담일지 리스트 */}
            {/* <Route
              path="/counsel/:counselId/counselorJournal/:userEmail"
              element={<CounselJournal />}
            /> */}
            {/* <Route path="/counselorJournal/1" element={<CounselJournal />} /> */}
            {/* QnA 게시판페이지 */}
            <Route path="/qna" element={<Qna />} />
            {/* Qna 작성페이지 */}
            <Route
              path="/qna/write"
              element={
                <CheckLogin
                  authenticated={loginStatus}
                  component={<QnaWrite />}
                />
              }
            />
            {/* QnA 상세페이지 */}
            <Route path="/qna/:qnaId" element={<QnaDetail />} />
            {/* QnA 수정페이지 */}
            <Route path="/qna/edit/:qnaId" element={<QnaEdit />} />
            {/* 알림 */}
            <Route path="/alarm/:userId" element={<Alarm />} />
            {/* 서비스소개 */}
            <Route path="/service" element={<Service />} />
            {/* 마약종류 */}
            <Route path="/drug" element={<Drug />} />
            {/* 상담받고있는 내담자리스트 */}
            <Route
              path="/counsel/clientlist/:counselId"
              element={<ClientList />}
            />
            {/* 나의 소감문 리스트*/}
            <Route path="/testimony/:userId" element={<Testimony />} />
            {/* 내담자의 소감문
            <Route
              path="/counsel/testimony/:counselId/:userId"
              element={<ClientList />}
            /> */}
            {/* 상담사 자격 심사 중이라는것을 회원에게 보여주는 페이지 */}
            <Route path="/counselorconfirm" element={<CounselorConfirm />} />
            {/* 관리자 상담사 자격 확인하기 위한 페이지 */}
            <Route
              path="/counselorconfirmadmin/:userId"
              element={
                <CheckAdmin
                  authenticated={loginStatus}
                  component={<CounselorConfirmAdmin />}
                />
              }
            />
            {/* 내가 쓴 댓글 페이지 */}
            <Route path="/mycomments/:userId" element={<MyComments />} />
            {/* 내가 쓴 게시글 페이지 */}
            <Route path="/myboards/:userId" element={<MyBoards />} />
            {/* 자조모임 페이지 */}
            <Route path="/selfhelpgroup" element={<SelfHelpGroup />} />
            {/* 상담 */}
            <Route
              path="counseling/:curriculumId"
              element={<WrappedCounselingComponent />}
            />
            {/* <Route path="/write" element={<Write />} /> */}
            {/* 나머지모든페이지 notfound로으로 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  )
}

function WrappedCounselingComponent() {
  const params = useParams<CurriculumParams>()

  return <CounselOpenvidu curriculumId={params.curriculumId} />
}

export default App
