import React, { useState, useEffect, ChangeEvent } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import ArticleBar from './../components/ArticleBar'
import StyledButton from './../styles/StyledButton'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getBoard } from '../hooks/useboard'
import { useQuery } from 'react-query'
import { BoardData, CommentData } from '../model/board'
import Comment from './../components/Comment'
import { CenteredDiv, SpacedDiv, StyledForm } from '../components/Write'
import styled from '@emotion/styled'
import { formatDateDetail } from '../utils/dateUtils'
import {
  Container,
  CommentItem,
  Author,
  Content,
  Date,
  BorderTop,
} from '../styles/Comment'
import {
  ArticleContainer,
  ArticleHeader,
  ArticleContent,
  ArticleMeta,
  ArticleTitle,
  ButtonGroup,
} from '../styles/articles'
import { userState } from '../recoil/atoms/userState'
import { useRecoilState } from 'recoil'
import Input from '../components/Input'

export const FreeBoardDetail = () => {
  const navigate = useNavigate()
  const [user, setUser] = useRecoilState(userState)
  let { freeboardId } = useParams()
  const id = freeboardId ? parseInt(freeboardId, 10) : null
  const [checkUser, setCheckUser] = useState(false)
  const [comments, setComments] = useState<CommentData[]>([])
  const [comment, setComment] = useState('')
  const [board, setBoard] = useState({
    title: '',
    content: '',
    nickname: '',
    date: '',
    level: 0,
    views: 0,
    userId: 0,
  })
  const { title, content, nickname, date, level, views, userId } = board
  // const {
  //   commentId,
  //   commentContent,
  //   commentUserId,
  //   commentNickname,
  //   commentDate,
  // } = comments

  const {
    isLoading,
    data: article,
    isError,
    error,
    isFetched,
    refetch,
  } = useQuery<BoardData>(['freeboard', id], () => getBoard(id))
  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const postComment = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}comments`, {
        content: comment,
        userId: user.id,
        postId: id,
      })
      .then((response) => {
        console.log(response)
        // alert('댓글작성완료')
        window.location.reload()
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    // article 데이터가 있는 경우 board 상태를 설정합니다.
    if (article) {
      setBoard({
        title: article.title,
        content: article.content,
        nickname: article.nickname,
        date: article.date,
        level: article.level,
        views: article.views,
        userId: article.userId,
      })
      if ((user.id && user.id === board.userId) || user.type === 3) {
        setCheckUser(true)
      }

      axios
        .get(`${process.env.REACT_APP_BASE_URL}comments/${id}`)
        .then((res) => {
          setComments(res.data)
        })
        .catch((err) => {
          console.log(err)
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

  const deleteFreeBoard = () => {
    if (user.id === board.userId || user.type === 3) {
      if (window.confirm('게시글을 삭제하시겠습니까?')) {
        axios
          .delete(`${process.env.REACT_APP_BASE_URL}articles/${freeboardId}`)
          .then(function (response) {
            alert('게시글이 삭제되었습니다.')
            navigate('/freeboard')
          })
          .catch((error) => console.log(error))
      }
    }
  }

  const deleteComment = (commentId: number) => {
    if (user.id === commentId || user.type === 3) {
      if (window.confirm('댓글을 삭제하시겠습니까?')) {
        axios
          .delete(`${process.env.REACT_APP_BASE_URL}comments/${commentId}`)
          .then(function (response) {
            console.log(response)
            // alert('댓글이 삭제되었습니다.')
            window.location.reload()
          })
          .catch((error) => {
            alert('댓글 작성자가 아닙니다.')
            console.log(error)
          })
      }
    } else {
      alert('댓글을 삭제할 수 없습니다.')
    }
  }

  return (
    <>
      <NavbarLogin />
      <div style={{ marginTop: '30px' }}>
        <ArticleBar name="게시판 상세정보" />
      </div>
      <ArticleContainer>
        <ArticleHeader>
          <ArticleTitle>{board.title}</ArticleTitle>
        </ArticleHeader>
        <ArticleMeta>
          <span>작성자 : {board.nickname}</span>
          <span style={{ marginLeft: '35px' }}>조회수 : {board.views}</span>
          <span style={{ marginLeft: '35px' }}>
            등록일 : {formatDateDetail(board.date)}
          </span>
        </ArticleMeta>
        <ArticleContent>{board.content}</ArticleContent>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={comment}
            onChange={handleChangeComment}
            style={{
              height: '30px',
              width: '90%',
              marginTop: '10px',
              marginRight: '30px',
              fontSize: '15px',
            }}
            placeholder="댓글을 작성해주세요!"
          />
          <StyledButton
            onClick={postComment}
            width="10%"
            fontSize="15px"
            style={{ width: '70px' }}
          >
            작성
          </StyledButton>
        </div>

        <Container>
          {/* <Input value={comment} onChange={handleChangeComment} /> */}
          <BorderTop>
            {comments &&
              comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <Author>{comment.nickname}</Author>
                  <Content>{comment.content}</Content>
                  <Date>{formatDateDetail(comment.date)}</Date>
                  <StyledButton
                    width="5px"
                    height="5px"
                    color="red"
                    background="white"
                    onClick={() => deleteComment(comment.id)}
                    style={{ height: 'auto' }}
                  >
                    X
                  </StyledButton>
                </CommentItem>
              ))}
          </BorderTop>
        </Container>
        <ButtonGroup>
          {checkUser && (
            <StyledButton
              green
              onClick={() => navigate(`/freeboard/edit/${freeboardId}`)}
            >
              수정
            </StyledButton>
          )}

          {checkUser && (
            <StyledButton red onClick={deleteFreeBoard}>
              삭제
            </StyledButton>
          )}
        </ButtonGroup>
      </ArticleContainer>
    </>
  )
}
