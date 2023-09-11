import React, {
  ChangeEvent,
  useState,
  useEffect,
  ReactHTMLElement,
} from 'react'
import NavbarLogin from '../components/NavbarLogin'
import { styled } from 'styled-components'
import Input from '../components/Input'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import {
  FlexContainer,
  FlexContainerAlignStart,
  FlexContainerRow,
} from '../styles/MainStyle'
import Button from '../components/Button'
import {
  CounselorLoginCheck,
  CounselorLoginNoCheck,
  NormalLoginCheck,
  NormalLoginNoCheck,
} from '../styles/SignBtn'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms/userState'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
// const LoginTab = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   align-item: center;
//   padding: 50px;
//   max-width: 650px;
//   height: 80px;
//   margin: 0 auto;

//   > div {
//     width: 50%;
//     text-align: center;
//     font-size: 2.3rem;
//     border-bottom: 3px solid #40bfff;
//     cursor: pointer;

//     &.active {
//       border-top: 3px solid #40bfff;
//       border-right: 2px solid #40bfff;
//       border-left: 3px solid #40bfff;
//       border-bottom: 0;
//     }
//   }
// `

// const LoginTabList = [
//   {
//     id: 0,
//     name: '일반 로그인',
//   },
//   {
//     id: 1,
//     name: '상담사 로그인',
//   },
// ]

export const Login = () => {
  const [userType, setUserType] = useState(0)
  const [inputEmailValue, setinputEmailValue] = useState('')
  const [inputPassValue, setinputPassValue] = useState('')
  const [passwordCheck, setpasswordCheck] = useState(1)
  const [inputPassCheckValue, setinputPassCheckValue] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useRecoilState(userState)

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputEmailValue(event.target.value)
  }
  const handlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputPassValue(event.target.value)
    if (event.target.value === inputPassCheckValue) {
      setpasswordCheck(1)
    } else {
      setpasswordCheck(0)
    }
  }
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // 엔터 키가 눌렸을 때 로그인 처리하는 로직을 여기에 구현
      handleLogIn()
    }
  }

  const handleLogIn = () => {
    const email = inputEmailValue
    const password = inputPassValue

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.')
      return
    }
    const data = {
      email,
      password,
    }
    axios

      .post(`${process.env.REACT_APP_BASE_URL}login`, data)
      .then((response) => {
        console.log(response)
        // 헤더 정보
        const accessToken = response.data.token
        const type = response.data.type
        const userId = response.data.userId
        const nickname = response.data.nickname

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        localStorage.setItem('accesstoken', accessToken)
        setUser((prevUser) => ({
          ...prevUser,
          isLoggedIn: true,
          nickname: nickname,
          type: type,
          id: userId,
          email: email,
        }))
        toast.success('로그인 완료')
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        // if (error.response) {
        //   console.log('Server Response:', error.response.data)
        // } else {
        //   console.log('Error Message:', error.message)
        // }
        setUser((prevUser) => ({ ...prevUser, isLoggedIn: false }))

        toast.error('로그인 실패')
      })
  }
  const passwordFind = () => {
    if (!inputEmailValue) {
      toast.warning('이메일을 입력한 뒤에 비밀번호 찾기를 눌러주세요!')
    } else {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}userinfo/findPassword`, {
          email: inputEmailValue,
        })
        .then((res) => {
          console.log(res)
          toast.success('임시 비밀번호를 이메일로 발송했습니다.')
        })
        .catch((err) => {
          console.log(err)
          toast.error('가입되지 않은 이메일입니다.')
        })
    }
  }

  // 일반 회원인지 상담사 회원인지
  const switchUserType = () => {
    setUserType(userType === 0 ? 1 : 0)
  }
  return (
    <section>
      <NavbarLogin />

      {/* <LoginTab>
        {LoginTabList.map((tabItem) => (
          <div
            className={userType === tabItem.id ? 'active' : undefined}
            onClick={() => setUserType(tabItem.id)}
          >
            {tabItem.name}
          </div>
        ))}
      </LoginTab> */}
      <FlexContainer>
        {userType === 0 ? (
          <>
            <span>
              <NormalLoginCheck>일반 로그인</NormalLoginCheck>
              <CounselorLoginNoCheck onClick={switchUserType}>
                상담사 로그인
              </CounselorLoginNoCheck>
            </span>
          </>
        ) : (
          <span>
            <NormalLoginNoCheck onClick={switchUserType}>
              일반 로그인
            </NormalLoginNoCheck>
            <CounselorLoginCheck>상담사 로그인</CounselorLoginCheck>
          </span>
        )}
        <FlexContainerAlignStart>
          <FlexContainerRow>
            <Input
              value={inputEmailValue}
              onChange={handleEmailChange}
              placeholder="이메일"
              maxLength={50}
            />
          </FlexContainerRow>
          <input
            style={{
              borderBottom: '1px solid black',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              outline: 'none',
              padding: '7px',
              width: '550px',
              marginBottom: '20px',
              fontSize: '18px',
            }}
            value={inputPassValue}
            onChange={handlePassChange}
            placeholder="비밀번호"
            type="password"
            maxLength={255}
            onKeyDown={handleEnter}
          />
        </FlexContainerAlignStart>
        <Button
          onClick={handleLogIn}
          text="로그인"
          size={{ width: '570px', height: '50px' }}
        ></Button>
        <div style={{ height: '15px' }}></div>
        <Button
          color={{ background: '#3b478f', color: 'white' }}
          onClick={passwordFind}
          text="비밀번호 찾기"
          size={{ width: '570px', height: '50px' }}
        ></Button>
      </FlexContainer>
      <ToastContainer />
    </section>
  )
}
