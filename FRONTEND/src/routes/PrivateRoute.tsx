import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms/userState'

interface PrivateRouteProps {
  authenticated: number
  component: JSX.Element
}

// 로그인 햇는지 안했는지 체크
// authenticated false이면 즉 0
export const CheckLogin = ({
  authenticated,
  component: Component,
}: PrivateRouteProps) => {
  const [user, setUser] = useRecoilState(userState)
  if (user.isLoggedIn === false) {
    window.alert('로그인이 필요한 서비스입니다.')
    return <Navigate to="/" />
  }

  return Component
}

// 상담사인지 체크
export const CheckCounselor = ({
  authenticated,
  component: Component,
}: PrivateRouteProps) => {
  if (authenticated !== 2 && authenticated !== 3) {
    window.alert('상담사인증이 필요한 서비스입니다.')
    return <Navigate to="/" />
  }

  return Component
}

// 관리자인지 체크
export const CheckAdmin = ({
  authenticated,
  component: Component,
}: PrivateRouteProps) => {
  if (authenticated !== 3) {
    window.alert('관리자만 이용할 수 있습니다.')
    return <Navigate to="/" />
  }

  return Component
}
