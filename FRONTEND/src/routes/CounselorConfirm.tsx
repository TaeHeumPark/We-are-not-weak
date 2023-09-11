import React from 'react'
import NavbarLogin from './../components/NavbarLogin'
import { CounselorConfirmWait } from './../components/CounselorConfirmWait'
import { CounselorConfirmFail } from './../components/CounselorConfirmFail'

export const CounselorConfirm = () => {
  const status = 0

  return (
    <div>
      {status ? <CounselorConfirmWait /> : <CounselorConfirmFail />}
      {/* 상담사 상태가 대기상태일때 */}

      {/* 상담사 상태가 인증 실패일때 */}
    </div>
  )
}
