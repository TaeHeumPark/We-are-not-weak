import React, { ChangeEvent, useState } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Input from '../components/Input'
import { NoneStyledLink } from '../styles/Custom'
import {
  FlexContainer,
  FlexContainerAlignStart,
  FlexContainerRow,
} from '../styles/MainStyle'
import Button from '../components/Button'
import IconButton from '@mui/material/IconButton'

import {
  NormalLoginCheck,
  NormalLoginNoCheck,
  CounselorLoginNoCheck,
  CounselorLoginCheck,
} from '../styles/SignBtn'
import Modal from 'react-modal'
import StyledButton from '../styles/StyledButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { ErrorMessage } from '../styles/ErrorMessage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
// import { userState } from '../recoil/atoms/userState'
// import { useRecoilState } from 'recoil'
import { BadWords } from './../model/BadWords'

interface UserCommonData {
  nickname: string
  email: string
  password: string
}

interface UserType1Data extends UserCommonData {
  education: string
  career: string[]
  profileImg: string
  certificationImg: string
  residentRegistrationImg: string
}

interface UserDto {
  email: string
  password: string
  name?: string
  nickname?: string
  // profileImg: File | null
}

interface CounselorDto {
  registImg: string | File | null
  licenseImg: string | File | null
  school: string
  company: string
  introduction: string
}
interface Career {
  content: string
}

interface CounselorData {
  userDto: UserDto
  counselorDto: CounselorDto
  careersDto: String[]
}

export const SignUp = () => {
  const initialCounselorData: CounselorData = {
    userDto: {
      email: '',
      password: '',
      name: '',
      nickname: '',
      // profileImg: null,
    },
    counselorDto: {
      registImg: '',
      licenseImg: '',
      school: '',
      company: '',
      introduction: '',
    },
    careersDto: [],
  }
  const navigate = useNavigate()
  const [inputNameValue, setInputNameValue] = useState('')
  const [inputNicknameValue, setinputNicknameValue] = useState('')
  const [inputEmailValue, setinputEmailValue] = useState('')
  const [inputAuthNumValue, setinputAuthNumeValue] = useState('')
  const [inputPassValue, setinputPassValue] = useState('')
  const [inputPassCheckValue, setinputPassCheckValue] = useState('')
  const [inputEducation, setinputEducation] = useState('')
  const [passwordCheck, setpasswordCheck] = useState(1)
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [emailCheck, setEmailCheck] = useState(false)
  const [nickNameCheck, setNickNameCheck] = useState(false)
  const [profileImg, setProfileImg] = useState<File | null>(null)
  const [certificationImg, setCertificationImg] = useState<File | null>(null)
  const [residentRegistrationImg, setResidentRegistrationImg] =
    useState<File | null>(null)

  const [counselorData, setCounselorData] =
    useState<CounselorData>(initialCounselorData)
  // 모달을 띄울 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 이력 저장할 State
  const [careers, setCareers] = useState<string[]>([''])

  // 인증 버튼 3개의 style을 하나로 묶기
  const buttonSize = { width: '130px', height: '37px' }

  // 버튼을 표시할 유저 타입을 설정하는 state.
  const [userType, setUserType] = useState(0) // 기본값은 0으로 설정.

  // 모달 띄우기
  const openCareerModal = () => {
    setIsModalOpen(true)
  }

  // 모달 닫기
  const closeCareerModal = () => {
    setIsModalOpen(false)
  }
  const validateEmail = (email: string) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const validatePassword = (password: string) => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return re.test(password)
  }

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputNicknameValue(event.target.value)
    setNickNameCheck(false)
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(event.target.value)
  }

  // 닉네임 중복확인

  const checkNickName = () => {
    if (BadWords.includes(inputNicknameValue)) {
      toast.error('사용 불가능한 닉네임입니다.', {
        position: 'top-center',
      })
    } else if (inputNicknameValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}signup/exists`, {
          params: {
            nickname: inputNicknameValue,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setNickNameCheck(true)
            toast.success('사용가능한 닉네임입니다.', {
              position: 'top-center',
            })
          }
        })
        .catch((err) => {
          toast.error('이미 존재하는 닉네임입니다.')
        })
    } else {
      toast.warning('닉네임은 최소 2글자 이상이어야 합니다.')
    }
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputEmailValue(event.target.value)
    setEmailCheck(false)
    if (!validateEmail(event.target.value)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.')
    } else {
      setEmailError('')
    }
  }
  const handleAuthNumChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputAuthNumeValue(event.target.value)
  }
  const handlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputPassValue(event.target.value)
    if (!validatePassword(event.target.value)) {
      setPasswordError(
        '비밀번호는 8자 이상이며, 숫자, 대문자, 소문자를 모두 포함해야 합니다.',
      )
    } else {
      setPasswordError('')
      if (event.target.value === inputPassCheckValue) {
        setpasswordCheck(1)
      } else {
        setpasswordCheck(0)
      }
    }
  }
  const handlePassCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputPassCheckValue(event.target.value)
    if (event.target.value === inputPassValue) {
      setpasswordCheck(1)
    } else {
      setpasswordCheck(0)
    }
  }
  const handleEducation = (event: ChangeEvent<HTMLInputElement>) => {
    setinputEducation(event.target.value)
  }

  // 이력 추가
  const addCareer = () => {
    setCareers([...careers, ''])
  }

  // 이력 삭제
  const deleteCareer = (index: number) => {
    setCareers(careers.filter((career, idx) => idx !== index))
  }

  // 이력 업데이트
  const updateCareer = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedCareers = [...careers]
    updatedCareers[index] = event.target.value
    setCareers(updatedCareers)
  }
  // 인증번호 전송
  const handleEmailClick = () => {
    if (inputEmailValue) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}signup/email`, {
          email: inputEmailValue,
        })
        .then((res) => {
          alert('인증번호를 전송했습니다.')
          console.log(res)
        })
        .catch((err) => {
          alert('이메일을 다시 확인해 주십시오')
          console.log('이메일 전송 오류:', err)
        })
    } else {
      alert('이메일을 다시 확인해 주십시오')
    }
  }
  const handleCheckClick = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}signup/email/auth`, {
        email: inputEmailValue,
        authCode: inputAuthNumValue,
      })
      .then((res) => {
        if (res.status === 200) {
          setEmailCheck(true)
        } else {
          alert('인증번호가 틀립니다.')
        }
      })
      .catch((err) => alert('인증번호가 틀립니다.'))
  }
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setter(file)
    }
  }

  ////////////////////////////////
  //          회원가입          //
  ///////////////////////////////
  const handleSignUp = (): void => {
    let userData: UserCommonData | UserType1Data | undefined
    let counselorData: CounselorData | undefined

    if (userType === 0) {
      userData = {
        nickname: inputNicknameValue,
        email: inputEmailValue,
        password: inputPassValue,
      }
    } else if (userType === 1) {
      counselorData = {
        userDto: {
          email: inputEmailValue,
          password: inputPassValue,
          name: inputNicknameValue,
          nickname: inputNicknameValue,
        },
        counselorDto: {
          licenseImg: '',
          registImg: '',
          school: inputEducation,
          company: 'samsung',
          introduction: '족구왕이 될 사나이',
        },
        // careersDto: careers,
        careersDto: [],
      }
    }

    if (
      userType === 0 &&
      userData &&
      userData.nickname &&
      userData.email &&
      userData.password &&
      emailCheck &&
      passwordCheck &&
      nickNameCheck
    ) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}signup`, userData)
        .then((response) => {
          console.log(response.data)
          alert('회원가입이 성공적으로 완료되었습니다.')
          navigate('/')
        })
        .catch((error: any) => {
          console.error('Error registering new user:', error)
          alert('회원가입 중 오류가 발생했습니다.')
        })
    } else if (
      userType === 1 &&
      counselorData &&
      emailCheck &&
      passwordCheck &&
      nickNameCheck
    ) {
      const formData = new FormData()

      // formData.append('request', JSON.stringify(counselorData))
      formData.append(
        'request',
        new Blob([JSON.stringify(counselorData)], { type: 'application/json' }),
      )

      if (certificationImg) {
        formData.append('file1', certificationImg)
        formData.append('file2', certificationImg)
        formData.append('file3', certificationImg)
      }

      axios
        .post(`${process.env.REACT_APP_BASE_URL}signup/counselor`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          alert('회원가입이 성공적으로 완료되었습니다.')
          navigate('/')
        })
        .catch((error: any) => {
          console.error('Error registering new user:', error)
          alert('회원가입 중 오류가 발생했습니다.')
          console.log('상담사 정보')
          console.log(counselorData)
          console.log(JSON.stringify(counselorData))
          console.log('이미지 정보')
          console.log(certificationImg)
          console.log('폼 데이터 정보')
          console.log('Keys:', Array.from(formData.keys()))
          console.log('Values:', Array.from(formData.values()))
        })
    }
  }
  const handleProfileUpload = () => {
    const input = document.getElementById(
      'profileUploadInput',
    ) as HTMLInputElement
    input?.click()
  }

  const handleCertificateUpload = () => {
    const input = document.getElementById(
      'certificateUploadInput',
    ) as HTMLInputElement
    input?.click()
  }

  const handleIdentUpload = () => {
    const input = document.getElementById(
      'identUploadInput',
    ) as HTMLInputElement
    input?.click()
  }

  // 일반 회원인지 상담사 회원인지
  const switchUserType = () => {
    setUserType(userType === 0 ? 1 : 0)
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} onRequestClose={closeCareerModal}>
        <FlexContainer>
          <h1>이력</h1>
        </FlexContainer>
        <FlexContainerRow>
          <FlexContainer>
            {careers.map((career, index) => (
              <div key={index} style={{ paddingBottom: '30px' }}>
                <FlexContainerRow>
                  <input
                    type="text"
                    value={career}
                    onChange={(event) => updateCareer(index, event)}
                    style={{ width: '900px', borderBlockColor: '#40BFFF' }}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteCareer(index)}
                    style={{ scale: '1.5' }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </FlexContainerRow>
              </div>
            ))}
          </FlexContainer>
          <FlexContainerRow
            style={{
              position: 'fixed',
              top: '120px',
              right: '100px',
              zIndex: 1,
            }}
          >
            <StyledButton
              fontSize="14px"
              width="50px"
              height="30px"
              onClick={addCareer}
            >
              Add
            </StyledButton>
            &nbsp;
            <StyledButton
              fontSize="12px"
              width="50px"
              height="30px"
              onClick={closeCareerModal}
              background="#ef5c5c"
            >
              Close
            </StyledButton>
            &nbsp;
            <StyledButton
              fontSize="14px"
              width="50px"
              height="30px"
              background="#15e506"
              onClick={() => alert('저장되었습니다.')}
            >
              Save
            </StyledButton>
          </FlexContainerRow>
        </FlexContainerRow>
      </Modal>
      <NavbarLogin />
      <FlexContainer>
        {userType === 0 ? (
          <>
            <span>
              <NormalLoginCheck>일반 회원가입</NormalLoginCheck>
              <CounselorLoginNoCheck onClick={switchUserType}>
                상담사 회원가입
              </CounselorLoginNoCheck>
            </span>
          </>
        ) : (
          <span>
            <NormalLoginNoCheck onClick={switchUserType}>
              일반 회원가입
            </NormalLoginNoCheck>
            <CounselorLoginCheck>상담사 회원가입</CounselorLoginCheck>
          </span>
        )}
        <FlexContainerAlignStart>
          <FlexContainerRow style={{ width: '100%' }}>
            <Input
              value={inputNicknameValue}
              onChange={handleNicknameChange}
              placeholder={userType === 1 ? '이름' : '닉네임'}
              width="420px"
              maxLength={20}
            />

            <Button
              border={{ radius: '0.625rem', borderColor: '#40BFFF' }}
              size={{ width: '100px', height: '35px' }}
              color={{
                background: nickNameCheck ? 'gray' : '#40BFFF',
                color: 'white',
              }}
              text="중복확인"
              onClick={checkNickName}
            />
          </FlexContainerRow>
          <FlexContainerRow style={{ width: '100%' }}>
            <div>
              <Input
                marginBottom="5px"
                value={inputEmailValue}
                onChange={handleEmailChange}
                placeholder="이메일"
                width="420px"
                maxLength={30}
              />
              <p
                style={{
                  fontSize: '1px',
                  margin: '0px 0px 10px 0px',
                  padding: '0px',
                }}
              >
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
              </p>
            </div>
            <Button
              border={{ radius: '0.625rem', borderColor: '#40BFFF' }}
              size={{ width: '100px', height: '35px' }}
              color={{ background: '#40BFFF', color: 'white' }}
              text="인증번호 전송"
              onClick={handleEmailClick}
            />
          </FlexContainerRow>
          <FlexContainerRow style={{ width: '100%' }}>
            <Input
              value={inputAuthNumValue}
              onChange={handleAuthNumChange}
              placeholder="인증번호"
              width="420px"
              type="password"
            />
            <Button
              border={{ radius: '0.625rem', borderColor: '#40BFFF' }}
              size={{ width: '100px', height: '35px' }}
              color={{
                background: emailCheck ? 'gray' : '#40BFFF',
                color: 'white',
              }}
              text="인증번호 확인"
              onClick={handleCheckClick}
              disabled={emailCheck}
            />
          </FlexContainerRow>
          <Input
            value={inputPassValue}
            onChange={handlePassChange}
            placeholder="비밀번호"
            type="password"
          />
          <Input
            value={inputPassCheckValue}
            onChange={handlePassCheckChange}
            placeholder="비밀번호확인"
            type="password"
            padding="6px"
            marginBottom="5px"
          />
          <p
            style={{
              fontSize: '1px',
              margin: '0px 0px 10px 0px',
              padding: '0px',
            }}
          >
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </p>
          {userType === 1 ? (
            <>
              <Input
                value={inputEducation}
                onChange={handleEducation}
                placeholder="학력"
                type="text"
                maxLength={40}
              />
              <Button
                text="이력 작성하기"
                size={buttonSize}
                onClick={openCareerModal}
              ></Button>
              <br />
              <h3>상담사 인증하기</h3>
              <FlexContainerRow style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    text="프로필 사진"
                    size={buttonSize}
                    onClick={handleProfileUpload}
                  />
                  <input
                    type="file"
                    id="profileUploadInput"
                    hidden
                    onChange={(e) => handleFileChange(e, setProfileImg)}
                  />
                  {profileImg && (
                    <img
                      src={URL.createObjectURL(profileImg)}
                      alt="Profile"
                      width="100"
                      height="100"
                      style={{ marginTop: '20px' }}
                    />
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    text="자격증 사진"
                    size={buttonSize}
                    onClick={handleCertificateUpload}
                  />
                  <input
                    type="file"
                    id="certificateUploadInput"
                    hidden
                    onChange={(e) => handleFileChange(e, setCertificationImg)}
                  />
                  {certificationImg && (
                    <img
                      src={URL.createObjectURL(certificationImg)}
                      alt="Certification"
                      width="100"
                      height="100"
                      style={{ marginTop: '20px' }}
                    />
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    text="주민등록증 사진"
                    size={buttonSize}
                    onClick={handleIdentUpload}
                  />
                  <input
                    type="file"
                    id="identUploadInput"
                    hidden
                    onChange={(e) =>
                      handleFileChange(e, setResidentRegistrationImg)
                    }
                  />
                  {residentRegistrationImg && (
                    <img
                      src={URL.createObjectURL(residentRegistrationImg)}
                      alt="Resident Registration"
                      width="100"
                      height="100"
                      style={{ marginTop: '20px' }}
                    />
                  )}
                </div>
              </FlexContainerRow>
            </>
          ) : null}
        </FlexContainerAlignStart>

        <NoneStyledLink to="/login">
          이미 회원이신가요? 로그인하기&gt;
        </NoneStyledLink>
        <Button
          onClick={handleSignUp}
          text="회원가입"
          size={{ width: '700px', height: '50px' }}
        ></Button>
      </FlexContainer>
      <ToastContainer />
    </div>
  )
}
