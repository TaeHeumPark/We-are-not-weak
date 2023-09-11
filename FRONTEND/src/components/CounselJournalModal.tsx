import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import StyledButton from './../styles/StyledButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { StyledTextArea } from './Write'
const style = {
  position: 'absolute' as 'absolute',
  top: '70%',
  left: '70%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #3b478f',
  //   boxShadow: 24,
  p: 4,
}

interface CounselJournalModalProps {
  nickname: string
}

interface CounselJournalData {
  nickname: string
  content: string
}

export default function CounselJournalModal(props: CounselJournalModalProps) {
  const [open, setOpen] = React.useState(true)
  const [content, setContent] = React.useState('')
  // const [userId, setUserId] = React.useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    const existingData = JSON.parse(
      localStorage.getItem('counselJournal') || '[]',
    )
    const userJournal = existingData.find(
      (item: CounselJournalData) => item.nickname === props.nickname,
    )

    if (userJournal) {
      setContent(userJournal.content)
    } else {
      setContent('')
    }
  }, [open, props.nickname]) // open과 props.nickname이 변경될 때마다 실행

  const handleCounselJournal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value
    setContent(updatedContent)

    // 객체 형태로 저장하기 위한 데이터 구성
    const newData = {
      nickname: props.nickname,
      content: updatedContent,
    }

    // 기존 localStorage에서 데이터를 가져오기
    const existingData = JSON.parse(
      localStorage.getItem('counselJournal') || '[]',
    )

    // 존재하는 nickname 데이터의 인덱스를 찾기
    const existingDataIndex = existingData.findIndex(
      (item: CounselJournalData) => item.nickname === props.nickname,
    )

    if (existingDataIndex !== -1) {
      // 만약 존재하면, 해당 데이터를 수정
      existingData[existingDataIndex] = newData
    } else {
      // 존재하지 않으면, 새로운 데이터를 추가
      existingData.push(newData)
    }

    // localStorage에 다시 저장
    localStorage.setItem('counselJournal', JSON.stringify(existingData))
  }

  const postMyTestimony = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 기본 폼 제출 동작 방지
    if (content.length === 0) {
      alert('내용을 입력해주세요.')
    } else {
      // if (window.confirm('소감문을 등록하시겠습니까?')) {
      //   const response = axios.post(
      //     `${process.env.REACT_APP_BASE_URL}counsel/${counselId}/counseljournal/`,
      //     // counselJournal,
      //   )
      // }
    }
  }
  return (
    <div>
      {/* <StyledButton width="200px" onClick={handleOpen}>
        상담일지 작성
      </StyledButton> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>상담일지를 입력해 주세요</h2>
          <h3>내담자 이름 : {props.nickname}</h3>
          <br />
          <form onSubmit={postMyTestimony}>
            <textarea
              required
              style={{ width: '300px', height: '200px' }}
              value={content}
              onChange={handleCounselJournal}
            />
            <div>
              <br />
              <StyledButton onClick={handleClose}>완료</StyledButton>
              <StyledButton onClick={handleClose}>취소</StyledButton>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
