import '../fonts/font.css'
import NavbarLogin from '../components/NavbarLogin'
import ArticleBar from '../components/ArticleBar'
import {
  CenteredDiv,
  SpacedDiv,
  StyledForm,
  StyledFileInput,
  StyledTextArea,
  StyledTitleInput,
} from './../components/Write'
import StyledButton from './../styles/StyledButton'
import { useState } from 'react'
import { usePostBoard } from '../hooks/useboard'
import { BoardData } from '../model/board'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { userState } from '../recoil/atoms/userState'
import { useRecoilState } from 'recoil'
export const QnaWrite: React.FC = () => {
  //type 공지사항 ,qna, 자유게시판인지
  // status 삭제상태 or 게시상태
  const queryClient = useQueryClient()
  const [user, setUser] = useRecoilState(userState)

  const navigate = useNavigate()
  const [board, setBoard] = useState({
    title: '',
    content: '',
    level: 0,
    views: 0,
    userId: 1,
    type: 2,
    status: 0,
    nickname: '병신',
    email: 'wef@sd',
  })
  const {
    title,
    content,
    level,
    views,
    userId,
    type,
    status,
    nickname,
    email,
  } = board

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
  const { mutate: postArticle } = usePostBoard()
  const postQna = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 기본 폼 제출 동작 방지
    if (title.length === 0) {
      alert('제목을 입력해 주세요.')
    } else if (content.length === 0) {
      alert('내용을 입력해 주세요.')
    } else {
      if (window.confirm('게시글을 등록하시겠습니까?')) {
        const article = {
          title: title,
          content: content,
          level: 0,
          views: 0,
          userId: 1,
          type: 2,
          status: 0,
          date: new Date().toISOString(),
          nickname: '병신',
          email: '23@asdf',
        }
        postArticle(article, {
          onSuccess: () => {
            alert('게시글이 등록되었습니다.')
            navigate(`/qna`)
          },
          onError: (error) => {
            console.error('Error posting article:', error)
          },
        })
      }
    }
  }

  return (
    <div>
      <NavbarLogin />
      <ArticleBar name="QnA 작성" />
      <SpacedDiv />
      <CenteredDiv>
        <StyledForm
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={postQna}
        >
          <SpacedDiv />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledTitleInput
              required
              placeholder="제목을 입력하세요"
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
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
            required
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
            {/* 버튼 구현하기 */}
            <div style={{ marginRight: '10px' }}>
              <StyledButton red onClick={() => window.location.replace('/qna')}>
                취소
              </StyledButton>
            </div>
            <StyledButton type="submit" primary>
              등록
            </StyledButton>
          </div>
        </StyledForm>
      </CenteredDiv>
    </div>
  )
}
