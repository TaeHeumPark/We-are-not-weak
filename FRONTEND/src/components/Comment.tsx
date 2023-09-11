import React from 'react'
import {
  Container,
  CommentItem,
  Author,
  Content,
  Date,
  BorderTop,
} from '../styles/Comment'

const Comment: React.FC = () => {
  const comments = [
    {
      author: '잼민이',
      content: '너무 좋아요!',
      date: '2023-07-30',
    },
    {
      author: '스미스',
      content: 'Thanks for sharing this information!',
      date: '2023-07-29',
    },
    {
      author: '박태흠',
      content: '다들 힘내요!',
      date: '2023-07-28',
    },
    {
      author: '리삭수',
      content: '성공적인 프로젝트 화이팅',
      date: '2023-07-27',
    },
    {
      author: '존시나',
      content: 'Keep up the good work!',
      date: '2023-07-26',
    },
  ]

  return (
    <div style={{}}>
      <Container>
        <BorderTop>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
              <Author>{comment.author}</Author>
              <Content>{comment.content}</Content>
              <Date>{comment.date}</Date>
            </CommentItem>
          ))}
        </BorderTop>
      </Container>
    </div>
  )
}

export default Comment
