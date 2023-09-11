import React from 'react'
import styled from 'styled-components'

interface LoginBtnProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const NormalLogin = styled.button`
  border-top: 1px solid #b1b6b9;
  border-right: 1px solid #b1b6b9;
  border-bottom: 2px solid #40bfff;
  border-left: none;
  width: 20.3125rem;
  height: 5.5625rem;
  border-radius: 5px;
  background-color: rgba(119, 119, 119, 0.3);
`

const CounselorLogin = styled.button`
  background-color: white;
  border-top: 2px solid #40bfff;
  border-right: 2px solid #40bfff;
  border-left: 2px solid #40bfff;
  border-bottom: none;
  width: 20.3125rem;
  height: 5.5rem;
  border-radius: 5px;
`

const handleClick = () => {
  alert('상담사 로그인')
}

export const CounSelorLoginBtn = (props: LoginBtnProps) => {
  return (
    <div>
      <NormalLogin>일반 로그인</NormalLogin>
      <CounselorLogin onClick={handleClick}>상담사 로그인</CounselorLogin>
    </div>
  )
}
