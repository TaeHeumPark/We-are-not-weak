import React from 'react'
import NavbarLogin from './../components/NavbarLogin'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const steps = ['회원가입 신청', '상담사 자격 심사 중', '회원가입 완료']

export const CounselorConfirmWait = () => {
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
            상담사 심사 확인 중입니다.
          </h1>
          <p style={{ fontSize: '18px', color: '#555' }}>
            회원가입 신청이 접수되었습니다.
            <br />
            <br />
            심사에는 약 이틀이 소요됩니다.
          </p>
          <br />
          <br />
          <br />
          <br />

          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
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
