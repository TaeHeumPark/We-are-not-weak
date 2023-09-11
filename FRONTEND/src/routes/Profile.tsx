import React, { useState, useEffect } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms/userState'
import axios from 'axios'

export const Profile = () => {
  const [careers, setCareers] = useState([])
  const [nickname, setNickname] = useState('족구왕')
  const [email, setEmail] = useState('jokguking@jokgu.com')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('010-6723-8879')
  const [school, setSchool] = useState('서울대학교')
  const [introduction, setIntroduction] = useState('족구왕이 될 사나이')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')

  const [user, setUser] = useRecoilState(userState)
  console.log('프로필 페이지 진입')
  console.log(user)

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  let imageURL: string
  if (profileImageFile) {
    imageURL = URL.createObjectURL(profileImageFile)
  } else {
    imageURL = '/image/default_Image.jpg'
  }

  const modalStyles = {
    content: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'flex-start',
      padding: '0px',
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '480px',
      height: '320px',
      borderRadius: '13px',
    },
  }
  const navigate = useNavigate()
  const myArticle = () => {
    navigate(`/myboards/${user.id}`)
  }
  const myReview = () => {
    navigate(`/myComments/${user.id}`)
  }
  const myCounsel = () => {
    navigate(`/${user.id}/myBoards`)
  }
  const myCounselJournal = () => {
    navigate(`/${user.id}/myBoards`)
  }
  const myTestimony = () => {
    navigate(`/testimony/${user.id}`)
  }
  const editUserData = () => {
    navigate(`/profile/edit`)
  }
  const Unsubscribe = () => {
    if (confirmationText === '회원 탈퇴에 동의합니다.') {
      // 회원 탈퇴 로직
      setModalIsOpen(false)
    } else {
      alert('문구를 정확히 입력해주세요.')
    }
  }
  const passwordReset = () => {
    navigate('/')
  }

  useEffect(() => {
    if (user.type === 2) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}userinfo/counselor/${user.id}`)
        .then((response) => {
          const userData = response.data
          console.log('프로필 페이지 진입 후 데이터 가져옴')
          console.log(userData)
          setNickname(userData.nickname)
          setEmail(userData.email)
          setPhoneNumber(userData.phone)
          setName(userData.name)
          setCareers(userData.careers)
        })
        .catch((error) => {
          console.error('Error fetching user data: ', error)
        })
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}userinfo/${user.id}`)
        .then((response) => {
          const userData = response.data
          console.log('프로필 페이지 진입 후 데이터 가져옴')
          console.log(userData)
          setNickname(userData.nickname)
          setEmail(userData.email)
          setPhoneNumber(userData.phone)
          setName(userData.name)
        })
        .catch((error) => {
          console.error('Error fetching user data: ', error)
        })
    }
  }, [])

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '16px',
            gap: '10px',
            width: '448px',
            height: '51px',
            background: '#FFFFFF',
            marginBottom: '-1px',
          }}
        >
          <h2 style={{ font: 'normal 600 16px/19px Inter', color: '#000000' }}>
            정말 <span style={{ color: 'red' }}>탈퇴</span>하시겠습니까?
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '16px',
            gap: '10px',
            width: '430px',
            height: '110px',
            background: '#FFFFFF',
            borderTop: '1px solid #CED4DA',
            marginBottom: '-1px',
            marginLeft: '10px',
          }}
        >
          <p
            style={{
              width: '436px',
              height: '78px',
              font: 'normal 400 16px/26px Inter',
              color: '#6C757D',
            }}
          >
            함께한 시간을 다시 한번 생각해주세요. 탈퇴하시려면 아래 문구를
            정확히 따라 입력해주세요. <br />
            <span style={{ color: '#FF0000' }}>“회원 탈퇴에 동의합니다.”</span>
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '16px',
            gap: '8px',
            width: '430px',
            height: '71px',
            background: '#FFFFFF',
            borderTop: '1px solid #CED4DA',
            marginLeft: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              gap: '8px',
              width: '436px',
              height: '39px',
            }}
          >
            <input
              style={{
                width: '296px',
                height: '39px',
                background: '#FFFFFF',
                border: '1px solid #CED4DA',
                borderRadius: '4px',
              }}
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
            />
            <button
              style={{
                width: '62px',
                height: '39px',
                background: '#6C757D',
                borderRadius: '4px',
                color: '#FFFFFF',
                font: 'normal 600 16px/19px Inter',
              }}
              onClick={() => setModalIsOpen(false)}
            >
              취소
            </button>
            <button
              style={{
                width: '62px',
                height: '39px',
                background: '#80D4FF',
                borderRadius: '4px',
                color: '#FFFFFF',
                font: 'normal 600 16px/19px Inter',
              }}
              onClick={Unsubscribe}
            >
              탈퇴
            </button>
          </div>
        </div>
      </Modal>
      <div className="navbar">
        <NavbarLogin />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          minHeight: '800px',
          marginBottom: '5px',
        }}
      >
        <div
          className="left"
          style={{
            margin: '100px 0px 0px 330px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '5px 0px 5px -2px rgba(0, 0, 0, 0.2)',
            minHeight: '600px',
            width: '500px',
          }}
        >
          <div
            className="left top"
            style={{
              position: 'relative',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className="profile image">
              <img
                src={imageURL}
                alt="user profile"
                style={{ width: '200px', height: '200px', borderRadius: '50%' }}
              />
            </div>
            <div
              className="profile name"
              style={{
                minWidth: '30px',
                minHeight: ' 30px',
                fontWeight: 'bold',
                fontSize: '20px',
                margin: '10px 0px 10px 0px',
              }}
            >
              {nickname}
            </div>
            <div
              style={{
                width: '145px',
                color: 'lightgray',
                cursor: 'pointer',
              }}
              onClick={passwordReset}
            >
              비밀번호 재설정 &gt;&gt;
            </div>
          </div>
          <div
            className="left bottom"
            style={{
              width: '300px',
              height: '210px',
              margin: '60px 0px 0px 0px',
            }}
          >
            {!user.type ? (
              <div>
                <div
                  className="my article"
                  style={{
                    width: '300px',
                    height: '70px',
                    border: '1px solid lightgray',
                    borderRadius: '10px 10px 0px 0px',
                    cursor: 'pointer',
                  }}
                  onClick={myArticle}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    내가 쓴 게시글 보기
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    {'>>'}
                  </div>
                </div>
                <div
                  className="my review"
                  style={{
                    width: '300px',
                    height: '70px',
                    border: '1px solid lightgray',
                    borderRadius: '0px 0px 10px 10px',
                    cursor: 'pointer',
                  }}
                  onClick={myReview}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    내가 쓴 댓글 보기
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    {'>>'}
                  </div>
                </div>
                {/* <div
                  className="my counsel"
                  style={{
                    width: '300px',
                    height: '70px',
                    border: '1px solid lightgray',
                    borderRadius: '0px 0px 0px 0px',
                    cursor: 'pointer',
                  }}
                  onClick={myCounsel}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    내 상담 보기
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    {'>>'}
                  </div>
                </div> */}
                {/* <div
                  className="my testimony"
                  style={{
                    width: '300px',
                    height: '70px',
                    border: '1px solid lightgray',
                    borderRadius: '0px 0px 10px 10px',
                    cursor: 'pointer',
                  }}
                  onClick={myTestimony}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    소감문 보기
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    {'>>'}
                  </div>
                </div> */}
              </div>
            ) : (
              <div>
                <div
                  className="my article"
                  style={{
                    width: '300px',
                    height: '70px',
                    border: '1px solid lightgray',
                    borderRadius: '10px 10px 0px 0px',
                    cursor: 'pointer',
                  }}
                  onClick={myArticle}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    내가 쓴 게시글 보기
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    {'>>'}
                  </div>
                </div>
                <div
                  className="my review"
                  style={{
                    width: '300px',
                    height: '70px',
                    border: '1px solid lightgray',
                    borderRadius: '0px 0px 10px 10px',
                    cursor: 'pointer',
                  }}
                  onClick={myReview}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    내가 쓴 댓글 보기
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    {'>>'}
                  </div>
                </div>
                {/* <div
                  className="my counsel"
                  style={{
                    width: '300px',
                    height: '70px',
                    border: '1px solid lightgray',
                    borderRadius: '0px 0px 0px 0px',
                    cursor: 'pointer',
                  }}
                  onClick={myCounsel}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    내 상담 보기
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    {'>>'}
                  </div>
                </div> */}
                {/* <div
                  className="my counsel journal"
                  style={{
                    width: '300px',
                    height: '70px',
                    border: '1px solid lightgray',
                    borderRadius: '0px 0px 10px 10px',
                    cursor: 'pointer',
                  }}
                  onClick={myCounselJournal}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    내 상담일지 보기
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      margin: '10px 0px 0px 10px',
                    }}
                  >
                    {'>>'}
                  </div>
                </div> */}
              </div>
            )}
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
              margin: '95px 0px 0px 100px',
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
                padding: '16px 10px 0px 10px',
              }}
            >
              <div
                className="name"
                style={{
                  width: '400px',
                  height: '40px',
                  borderBottom: '1px solid lightgray',
                  margin: '0px 0px 15px 0px',
                  display: 'flex',
                  justifyContent: 'left ',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    margin: '0px 0px 0px 10px',
                  }}
                >
                  {name ? (
                    <div>{name}</div>
                  ) : (
                    <div style={{ color: 'gray', fontStyle: 'italic' }}>
                      이름을 입력해주세요
                    </div>
                  )}
                </div>
              </div>
              <div
                className="email address"
                style={{
                  width: '400px',
                  height: '40px',
                  borderBottom: '1px solid lightgray',
                  margin: '0px 0px 15px 0px',
                  display: 'flex',
                  justifyContent: 'left ',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    margin: '0px 0px 0px 10px',
                  }}
                >
                  {email}
                </div>
              </div>
              <div
                className="phone number"
                style={{
                  width: '400px',
                  height: '40px',
                  borderBottom: '1px solid lightgray',
                  margin: '0px 0px 15px 0px',
                  display: 'flex',
                  justifyContent: 'left ',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    margin: '0px 0px 0px 10px',
                  }}
                >
                  {user.phoneNumber ? (
                    <div>{user.phoneNumber}</div>
                  ) : (
                    <div style={{ color: 'gray', fontStyle: 'italic' }}>
                      전화번호를 입력해주세요.
                    </div>
                  )}
                </div>
              </div>

              <div
                className="point"
                style={{
                  width: '400px',
                  height: '40px',
                  borderBottom: '1px solid lightgray',
                  margin: '0px 0px 15px 0px',
                  display: 'flex',
                  justifyContent: 'left ',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    margin: '0px 0px 0px 10px',
                  }}
                >
                  {user.point || 0}p
                </div>
              </div>
              {user.type ? (
                <div>
                  <div
                    className="school"
                    style={{
                      width: '400px',
                      height: '40px',
                      borderBottom: '1px solid lightgray',
                      margin: '0px 0px 15px 0px',
                      display: 'flex',
                      justifyContent: 'left ',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        margin: '0px 0px 0px 10px',
                      }}
                    >
                      {school}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="right bottom">
            {user.type === 2 || user.type === 3 ? (
              <div>
                <h3
                  style={{
                    marginLeft: '100px',
                  }}
                >
                  이력
                </h3>
                <div
                  className="career"
                  style={{
                    width: '400px',
                    minHeight: '80px',
                    border: '1px solid lightgray',
                    borderRadius: '6px',
                    margin: '0px 0px 0px 100px',
                    backgroundColor: 'white',
                  }}
                >
                  {careers.map((career, index) => (
                    <span
                      key={index}
                      style={{ fontSize: '12px', margin: '4px' }}
                    >
                      {career}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            <h3
              style={{
                marginLeft: '100px',
              }}
            >
              소개
            </h3>
            <div
              className="right bottom top"
              style={{
                width: '400px',
                height: '130px',
                border: '1px solid lightgray',
                borderRadius: '6px',
                margin: '0px 0px 0px 100px',
                display: 'flex',
                justifyContent: 'center ',
                alignItems: 'center',
                backgroundColor: 'white',
              }}
            >
              {user.introduction ? (
                <div>{user.introduction}</div>
              ) : (
                <div style={{ color: 'gray', fontStyle: 'italic' }}>
                  소개를 입력해주세요.
                </div>
              )}
            </div>

            <div>
              <div
                className="right bottom bottom"
                style={{ display: 'flex', margin: '20px 0px 0px 281px' }}
              >
                <div style={{ margin: '0px 20px 0px 0px' }}>
                  <Button
                    size={{ width: '100px', height: '40px' }}
                    text="회원정보 수정"
                    color={{ background: '#00AAFF', color: 'white' }}
                    onClick={editUserData}
                  />
                </div>
                <div>
                  <Button
                    size={{ width: '100px', height: '40px' }}
                    text="회원탈퇴"
                    color={{ background: '#FF4D4D', color: 'white' }}
                    onClick={() => setModalIsOpen(true)}
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
