import React from 'react'
import NavbarLogin from './../components/NavbarLogin'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { NoneStyledLink } from './../styles/Custom'
import StyledButton from './../styles/StyledButton'

const steps = ['회원가입 신청', '상담사 자격 심사 중', '회원가입 실패']

export const CounselorConfirmFail = () => {
  return (
    <div>
      {/* 인증 대기중 */}
      <NavbarLogin />
      <div
        className="confirmation-page"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          className="content"
          style={{
            textAlign: 'center',
            padding: '40px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px', // content의 최대 가로 너비를 600px로 설정
            width: '90%', // content의 너비를 부모 요소에 대한 90%로 설정
            height: '40%',
            border: '1px solid #3b478f',
          }}
        >
          <br />
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '20px',
            }}
          >
            상담사 인증 반려되었습니다.
          </h1>
          <p style={{ fontSize: '18px', color: '#555' }}>
            주민등록증, 자격증사진, 프로필 사진을 새로 올바르게 입력해주세요
            <br />
            <br />
            <StyledButton fontSize="15px">
              <NoneStyledLink to="/signup" style={{ color: 'white' }}>
                회원가입 하러 가기
              </NoneStyledLink>
            </StyledButton>
          </p>
          <br />
          <br />
          <br />
          <br />

          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={2} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </div>
    </div>
  )
}
