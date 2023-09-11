import React, { useState, useEffect } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import ArticleBar from './../components/ArticleBar'
import StyledButton from './../styles/StyledButton'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getBoard } from '../hooks/useboard'
import { useQuery } from 'react-query'
import { BoardData } from '../model/board'
import Comment from './../components/Comment'
import { CenteredDiv, SpacedDiv, StyledForm } from '../components/Write'
import styled from '@emotion/styled'
import { formatDateDetail } from '../utils/dateUtils'
import {
  ArticleContainer,
  ArticleHeader,
  ArticleContent,
  ArticleMeta,
  ArticleTitle,
  ButtonGroup,
} from '../styles/articles'

export const NoticeDetail = () => {
  const navigate = useNavigate()
  const [checkUser, setCheckUser] = useState(false)

  let { noticeId } = useParams()
  const id = noticeId ? parseInt(noticeId, 10) : null
  const [board, setBoard] = useState({
    title: '',
    content: '',
    date: '',
    views: 0,
  })
  const { title, content, date } = board

  const {
    isLoading,
    data: article,
    isError,
    error,
    isFetched,
    refetch,
  } = useQuery<BoardData>(['qna', id], () => getBoard(id))

  console.log(article)
  useEffect(() => {
    // article 데이터가 있는 경우 board 상태를 설정합니다.
    if (article) {
      setBoard({
        title: article.title,
        content: article.content,
        date: article.date,
        views: article.views,
      })
    }
  }, [article])

  if (isLoading) {
    return <h1>로딩중입니다</h1>
  }
  if (isError) {
    console.log(error)
    return <h1>화면을 불러오는데 문제가 있습니다.</h1>
  }

  const deleteNotice = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}articles/${noticeId}`, {})
        .then(function (response) {
          alert('게시글이 삭제되었습니다.')
          navigate('/qna')
        })
        .catch((error) => console.log(error))
    } else {
      return false
    }
  }

  return (
    <>
      <NavbarLogin />
      <div style={{ marginTop: '30px' }}>
        <ArticleBar name="공지사항 상세정보" />
      </div>
      <ArticleContainer>
        <ArticleHeader>
          <ArticleTitle>{board.title}</ArticleTitle>
        </ArticleHeader>
        <ArticleMeta>
          <span>조회수 : {board.views}</span>
          <span style={{ marginLeft: '35px' }}>
            등록일 : {formatDateDetail(board.date)}
          </span>
        </ArticleMeta>
        <ArticleContent>{board.content}</ArticleContent>

        <ButtonGroup>
          {checkUser && (
            <StyledButton
              green
              onClick={() => navigate(`/notice/edit/${noticeId}`)}
            >
              수정
            </StyledButton>
          )}
          {checkUser && (
            <StyledButton red onClick={deleteNotice}>
              삭제
            </StyledButton>
          )}
        </ButtonGroup>
      </ArticleContainer>
    </>
  )
}
