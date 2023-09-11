import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import StyledButton from './../styles/StyledButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { StyledTextArea } from './Write'

interface TestimonyModalProps {
  curriculumId: number
}

const style = {
  position: 'absolute' as 'absolute',
  top: '70%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #3b478f',
  //   boxShadow: 24,
  p: 4,
}

export default function TestimonyModal({
  curriculumId: propsCurriculumId,
}: TestimonyModalProps) {
  const [open, setOpen] = React.useState(true)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const loginUserString: string | null = sessionStorage.getItem('loginUser')
  let nicknameFromSession: string = ''

  if (loginUserString) {
    const userState = JSON.parse(loginUserString).userState
    if (userState && userState.nickname) {
      nicknameFromSession = userState.nickname
    }
  }

  const [testimony, setTestimony] = React.useState({
    curriculumId: propsCurriculumId,
    content: '',
    nickname: nicknameFromSession,
  })

  const navigate = useNavigate()

  // 여기에 clientId, counselId 값 변경 해야 함 - counselId(params), clientId...? userId?

  const { curriculumId, content, nickname } = testimony

  const handleTestimony = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestimony((prevTestimony) => ({
      ...prevTestimony,
      content: e.target.value,
    }))
  }

  const postMyTestimony = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 기본 폼 제출 동작 방지
    console.log(testimony)
    console.log('dnl 위는 테스팀모니')
    if (content.length === 0) {
      alert('내용을 입력해주세요.')
    } else {
      if (window.confirm('소감문을 등록하시겠습니까?')) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}review`, testimony)
          .then((response) => {
            alert('소감문이 성공적으로 등록되었습니다.')
            navigate('/') // 메인페이지로
          })
          .catch((error) => {
            alert('소감문 등록에 실패하였습니다. 다시 시도해 주세요.')
          })
      }
    }
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>소감문을 입력해 주세요</h2>
          <br />
          <form onSubmit={postMyTestimony}>
            <textarea
              style={{ width: '300px', height: '200px' }}
              value={content}
              onChange={handleTestimony}
            />

            <div>
              <br />
              <StyledButton type="submit">완료</StyledButton>
              <StyledButton onClick={handleClose}>취소</StyledButton>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
