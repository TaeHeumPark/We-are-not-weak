import React, { ReactElement, useState } from 'react'
import styled from '@emotion/styled'
import { Modal } from '@mui/material'
import { CounselJournal } from './../routes/CounselJournal'
import StyledButton from './../styles/StyledButton'
import axios from 'axios'
import { TestimonyData } from '../model/counsel'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

const TestimonyBtn = styled.button`
  color: white;
  font-size: 30px;
  cursor: pointer;
  background-color: red;
`
const CounselJournalBtn = styled.button`
  color: white;
  font-size: 30px;
  cursor: pointer;
  background-color: red;
`
const RolePlayBtn = styled.button`
  color: white;
  font-size: 30px;
  cursor: pointer;
  background-color: red;
`
const DesignationBtn = styled.button`
  color: white;
  font-size: 30px;
  cursor: pointer;
  background-color: red;
`

export const Test: React.FC = () => {
  const navigate = useNavigate()
  const [testimonyModal, setTestimonyModal] = useState(false)
  const [counselJournalModal, setCounselJournalModal] = useState(false)
  const [rolePlayModal, setRolePlayModal] = useState(false)
  const [testimony, setTestimony] = useState({
    content: '',
    userId: 1,
    counselId: 1,
  })
  //   const [designationModal, setDesignationModal] = useState(false)

  const { content, userId, counselId } = testimony

  const openTestimony = () => {
    setTestimonyModal(true)
  }
  const closeTestimony = () => {
    setTestimonyModal(false)
  }
  const openCounselJournal = () => {
    setTestimonyModal(!counselJournalModal)
  }
  const openRolePlay = () => {
    setTestimonyModal(!rolePlayModal)
  }
  const handleTestimony = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestimony((prevTestimony) => ({
      ...prevTestimony,
      content: e.target.value,
    }))
  }

  const postMyTestimony = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 기본 폼 제출 동작 방지
    if (content.length === 0) {
      alert('내용을 입력해주세요.')
    } else {
      if (window.confirm('소감문을 등록하시겠습니까?')) {
        const response = axios.post(
          `${process.env.REACT_APP_BASE_URL}counsel/${counselId}/testimony/`,
          testimony,
        )
      }
    }
  }

  return (
    <>
      <TestimonyBtn onClick={openTestimony}>소감문</TestimonyBtn>

      <Modal open={testimonyModal} onClose={openTestimony}>
        <form onSubmit={postMyTestimony}>
          <p>username님의 소감문</p>
          <textarea value={content} onChange={handleTestimony} />
          <StyledButton type="submit">완료</StyledButton>
          <StyledButton onClick={closeTestimony}>취소</StyledButton>
        </form>
      </Modal>

      <CounselJournalBtn onClick={openCounselJournal}>
        상담일지
      </CounselJournalBtn>
      <RolePlayBtn onClick={openRolePlay}>역할극</RolePlayBtn>
      <DesignationBtn>지목하기</DesignationBtn>
    </>
  )
}
