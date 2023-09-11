import React, { useState, useEffect } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import ArticleBar from '../components/ArticleBar'
import {
  CenteredDiv,
  SpacedDiv,
  StyledForm,
  StyledFileInput,
  StyledTextArea,
  StyledTitleInput,
} from '../components/Write'

import StyledButton from './../styles/StyledButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { getBoard } from '../hooks/useboard'
import { BoardData } from '../model/board'
import axios from 'axios'
import { userState } from '../recoil/atoms/userState'
import { useRecoilState } from 'recoil'
interface BoardApiResponse {
  data: BoardData[]
}
export const FreeBoardEdit = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  // params를 받아올때 route url을 어떻게 쎃는지 중요하다 같은걸로 params받아와야함
  let { freeboardId } = useParams()
  const [user, setUser] = useRecoilState(userState)

  const id = freeboardId ? parseInt(freeboardId, 10) : null
  const [board, setBoard] = useState({
    title: '',
    content: '',
    level: 0,
    // views: 0,
    // userId: 1,
    // type: 2,
    // status: 0,
  })
  const { title, content } = board

  // 이전에 썻던 내용이랑 제목 가져오기!
  const {
    isLoading,
    data: article,
    isError,
    error,
    isFetched,
    refetch,
  } = useQuery<BoardData>(['freeboard', id], () => getBoard(id), { retry: 0 })

  useEffect(() => {
    // article 데이터가 있는 경우 board 상태를 설정합니다.
    if (article) {
      setBoard({
        title: article.title,
        content: article.content,
        level: article.level,
      })
    }
  }, [article])

  useEffect(() => {
    if (article) {
      setBoard({
        content: article.content,
        title: article.title,
        level: article.level,
      })
    }
  }, [article])

  if (isLoading) {
    return <h1>로딩 중입니다!!</h1>
  }

  if (isError || !article) {
    console.error(error) // 콘솔에 에러 메시지를 표시합니다.
    return (
      <div>
        <h2>데이터를 불러오는데 에러가 발생했습니다...</h2>
      </div>
    )
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      title: e.target.value,
    }))
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      content: e.target.value,
    }))
  }

  const updateFreeboard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 기본 폼 제출 동작 방지
    if (title.length === 0) {
      alert('제목을 입력해 주세요.')
    } else if (content.length === 0) {
      alert('내용을 입력해 주세요.')
    } else {
      if (window.confirm('게시글을 수정하시겠습니까?')) {
        axios
          .put(`${process.env.REACT_APP_BASE_URL}articles/${id}`, board)
          .then(() => {
            alert('게시글이 수정되었습니다.')
            navigate(`/qna`)
          })
      }
    }
  }
  console.log(board)
  return (
    <>
      <NavbarLogin />
      <ArticleBar name="자유게시판 수정" />
      <SpacedDiv />
      <CenteredDiv>
        <StyledForm
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={updateFreeboard}
        >
          <SpacedDiv />
          {/* 입력되어 있는 값 띄우기 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledTitleInput
              required
              maxLength={40}
              value={title}
              onChange={handleTitleChange}
            />
            <span
              style={{
                marginLeft: '30px',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              작성자 : {user.nickname}
            </span>
          </div>
          <p style={{ marginLeft: '30px', fontSize: '10px' }}>
            * 음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민,
            형사상의 책임을 질 수 있습니다. [저작권법 안내] [게시물 활용 안내]
          </p>
          <SpacedDiv />
          <StyledTextArea
            required
            value={content}
            onChange={handleContentChange}
          />
          <SpacedDiv />

          {/* <StyledFileInput />
          <div style={{ marginLeft: '30px', width: '400px' }}>
            <StyledButton>파일 업로드</StyledButton>
          </div> */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '30px',
              marginTop: '10px', // Add some top margin to separate buttons from textarea
              marginBottom: '10px',
            }}
          >
            <div style={{ marginRight: '10px' }}>
              <StyledButton
                red
                onClick={() => navigate(`/freeboard/${freeboardId}`)}
              >
                취소
              </StyledButton>
            </div>
            <StyledButton type="submit" primary>
              수정
            </StyledButton>
          </div>
        </StyledForm>
      </CenteredDiv>
    </>
  )
}
