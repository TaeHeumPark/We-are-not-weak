import React, { useState, useRef } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { FlexContainer, FlexContainerRow } from '../styles/MainStyle'
import StyledButton from '../styles/StyledButton'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms/userState'
import axios from 'axios'

export const ProfileEdit = () => {
  const [user, setUser] = useRecoilState(userState)
  const [schoolInput, setSchoolInput] = useState('')
  const [nicknameInput, setNicknameInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [phoneNumberInput, setPhoneNumberInput] = useState('')
  const [introductionInput, setIntroductionInput] = useState('')

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  console.log('프로필 수정 페이지 진입')
  console.log(user)
  let imageURL: string
  if (profileImageFile) {
    imageURL = URL.createObjectURL(profileImageFile)
  } else {
    imageURL = '/image/default_Image.jpg'
  }
  const handleEditProfileImageClick = () => {
    console.log('Edit button clicked!')

    // Input element를 통해 사용자가 이미지 파일을 선택할 수 있게 합니다.
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImageFile(event.target.files[0])
    }
  }

  // 모달을 띄울 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 이력 저장할 State
  const [careers, setCareers] = useState<string[]>([''])

  // 모달 띄우기
  const openCareerModal = () => {
    setIsModalOpen(true)
  }

  // 모달 닫기
  const closeCareerModal = () => {
    setIsModalOpen(false)
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

  const navigate = useNavigate()
  const saveUserdata = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}userinfo/${user.id}`,
        {
          school: schoolInput || user.school,
          nickname: nicknameInput || user.nickname,
          name: nameInput || user.name,
          phone: phoneNumberInput || user.phoneNumber,
          introduction: introductionInput || user.introduction,
        },
      )
      setUser((prevUser) => ({
        ...prevUser,
        nickname: nicknameInput || prevUser.nickname,
        name: nameInput || prevUser.name,
        phoneNumber: phoneNumberInput || prevUser.phoneNumber,
        introduction: introductionInput || prevUser.introduction,
      }))

      console.log(response.data)
      alert('수정 성공')

      navigate('/profile/1')
    } catch (error) {
      console.error('사용자 데이터 저장 중 오류 발생:', error)
    }

    navigate(`/profile/${user.id}`)
  }

  const cancle = () => {
    navigate(`/profile/${user.id}`)
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
      <div className="navbar">
        <NavbarLogin />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '800px',
        }}
      >
        <div
          className="left"
          style={{
            margin: '100px 0px 0px 330px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '5px 0px 5px -2px rgba(0, 0, 0, 0.2)',
            height: '600px',
            width: '500px',
          }}
        >
          <div
            className="left top"
            style={{
              position: 'relative',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="profile image">
              <img
                src={imageURL}
                alt="user profile"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div
                onClick={handleEditProfileImageClick}
                style={{
                  bottom: '70px',
                  right: '200px',
                  position: 'absolute',
                  padding: '5px 10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)')
                }
              >
                Edit
              </div>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <div
              className="profile nickname"
              style={{
                minWidth: '70px',
                minHeight: ' 50px',
                fontWeight: 'bold',
                fontSize: '20px',
                margin: '10px 0px 0px 0px',
              }}
            >
              <input
                type="text"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                placeholder={user.nickname || '닉네임을 입력해주세요.'}
                style={{
                  width: '200px',
                  margin: '10px 0px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="right"
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(250, 251, 253)',
            width: '1000px',
            margin: '7px 0px 0px 10px',
          }}
        >
          <div
            className="right top"
            style={{
              margin: '95px 0px 25px 100px',
              border: '1px solid #3b478f',
              borderRadius: '20px',
              width: '420px ',
              minHeight: '100px',
              backgroundColor: 'white',
            }}
          >
            <div
              className="user data"
              style={{
                padding: '10px 10px 0px 10px',
              }}
            >
              {/* <div className="email address">
                이메일 :
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={user.email}
                  style={{
                    width: '400px',
                    height: '40px',
                    margin: '0px 0px 15px 0px',
                    display: 'flex',
                    justifyContent: 'left ',
                    alignItems: 'center',
                  }}
                />
              </div> */}

              <div className="name">
                이름 :
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={user.name || '이름을 입력해주세요'}
                  style={{
                    width: '400px',
                    height: '40px',
                    margin: '0px 0px 15px 0px',
                    display: 'flex',
                    justifyContent: 'left ',
                    alignItems: 'center',
                  }}
                />
              </div>
              <div className="phone number">
                전화번호 :
                <input
                  type="text"
                  value={phoneNumberInput}
                  onChange={(e) => setPhoneNumberInput(e.target.value)}
                  placeholder={user.phoneNumber || '전화번호를 입력해주세요'}
                  style={{
                    width: '400px',
                    height: '40px',
                    margin: '0px 0px 15px 0px',
                    display: 'flex',
                    justifyContent: 'left ',
                    alignItems: 'center',
                  }}
                />
              </div>
              {user.type ? (
                <div className="school">
                  <input
                    type="text"
                    value={schoolInput}
                    onChange={(e) => setSchoolInput(e.target.value)}
                    placeholder={user.school || '학력을 입력해주세요'}
                    style={{
                      width: '400px',
                      height: '40px',
                      margin: '0px 0px 15px 0px',
                      display: 'flex',
                      justifyContent: 'left ',
                      alignItems: 'center',
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="right bottom">
            <div
              style={{
                marginLeft: '100px',
              }}
            >
              {/* {user.type ? (
              {user.type === 2 || user.type === 3 ? (
                <Button
                  text="이력 수정"
                  size={{ width: '420px', height: '50px' }}
                  onClick={openCareerModal}
                ></Button>
              ) : null} */}
            </div>
            <div className="right bottom top">
              <div
                style={{
                  margin: '0px 0px 0px 110px',
                }}
              >
                소개 :{' '}
              </div>
              <input
                type="text"
                value={introductionInput}
                onChange={(e) => setIntroductionInput(e.target.value)}
                placeholder={user.introduction || '소개를 입력해주세요'}
                style={{
                  width: '400px',
                  height: '215px',
                  margin: '0px 0px 0px 110px',
                  display: 'flex',
                  justifyContent: 'center ',
                  alignItems: 'center',
                }}
              />
            </div>
            <div>
              <div
                className="right bottom bottom"
                style={{ display: 'flex', margin: '20px 0px 0px 281px' }}
              >
                <div style={{ margin: '0px 20px 0px 0px' }}>
                  <Button
                    size={{ width: '100px', height: '40px' }}
                    text="저장"
                    color={{ background: '#00AAFF', color: 'white' }}
                    onClick={saveUserdata}
                  />
                </div>
                <div>
                  <Button
                    size={{ width: '100px', height: '40px' }}
                    text="취소"
                    color={{ background: '#FF4D4D', color: 'white' }}
                    onClick={cancle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
