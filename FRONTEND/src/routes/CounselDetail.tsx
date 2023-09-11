import React, { useEffect, useState } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import { useNavigate } from 'react-router-dom'
import PreviewBox from '../components/PreviewBox'
import CounselCard from '../components/CounselCard'
import CounselorCard from '../components/CounselorCard'
import Button from '../components/Button'
import Footer from '../components/Footer'
import Modal from 'react-modal'
import styled from 'styled-components'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms/userState'
import { Counsel, CounselorData, Curriculrum } from '../model/counsel'
import { formatDateDetail } from '../utils/dateUtils'

export interface UserData {
  buyer_name?: string
  buyer_email?: string
  buyer_id: number | null
}

export interface RequestPayAdditionalParams {
  digital?: boolean
  vbank_due?: string
  m_redirect_url?: string
  app_scheme?: string
  biz_num?: string
}

export interface Display {
  card_quota?: number[]
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string
  pay_method?: string
  escrow?: boolean
  merchant_uid?: string
  name?: string
  amount: number
  custom_data?: any
  tax_free?: number
  currency?: string
  language?: string
  buyer_name?: string
  buyer_tel?: string
  buyer_email?: string
  buyer_addr?: string
  buyer_postcode?: string
  notice_url?: string | string[]
  display?: Display
  buy_time?: Date
  user: UserData
  counsel_id: number
}

export interface RequestPayAdditionalResponse {
  apply_num?: string
  vbank_num?: string
  vbank_name?: string
  vbank_holder?: string | null
  vbank_date?: number
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean
  error_code: string
  error_msg: string
  imp_uid: string | null
  merchant_uid: string
  pay_method?: string
  paid_amount?: number
  status?: string
  name?: string
  pg_provider?: string
  pg_tid?: string
  buyer_name?: string
  buyer_email?: string
  buyer_tel?: string
  buyer_addr?: string
  buyer_postcode?: string
  custom_data?: any
  paid_at?: number
  receipt_url?: string
  counsel_id: number
}

export type RequestPayResponseCallback = (response: RequestPayResponse) => void

export interface Iamport {
  init: (accountID: string) => void
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback,
  ) => void
}

declare global {
  interface Window {
    IMP?: Iamport
  }
}

interface ClientData {
  userId: number
}

export const CounselDetail = () => {
  // 상담상세데이터
  const [clients, setClients] = useState<ClientData[]>([])
  const [checkClient, setCheckClient] = useState(false)
  const [counselData, setCounselData] = useState<Counsel>({
    counselid: 0,
    startDate: '',
    endDate: '',
    counselCount: 0,
    title: '',
    state: 0,
    clientCount: 0,
    price: 0,
    counselorId: 1,
    introduction: '',
    weekCount: 0,
    maxClient: 1,
    minClient: 0,
    counselorName: '',
  })
  const [user, setUser] = useRecoilState(userState)
  const [counselor, setCounselor] = useState<CounselorData>({
    counselorId: 0,
    counselorName: '',
    userId: 0,
    name: '',
    profile: '',
    regist: '',
    license: '',
    school: '',
    company: '',
    introduction: '',
    rateSum: 0,
    state: 0,
    careers: [],
  })
  const { counselId } = useParams()
  // 커리큘럼 리스트
  const [conunselCurriculums, setConunselCurriculums] = useState<Curriculrum[]>(
    [],
  )
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    userId: user.id,
    counselId: counselId,
  })

  const navigate = useNavigate()
  const userStatus: number = 2
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [curriculumModalIsOpen, setCurriculumModalIsOpen] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')
  // const [curriculms, setCurriculms] = useState<Curriculrum[]>([])

  const {
    counselid,
    startDate,
    endDate,
    counselCount,
    title,
    state,
    clientCount,
    price,
    counselorId,
    introduction,
    weekCount,
  } = counselData

  // 내담자정보 가져오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}counsel/client/${counselId}`)
      .then((res) => {
        setClients([...res.data])

        res.data.forEach((userId: any) => {
          console.log(user.id === userId.userId)
          if (user.id && user.id === userId) {
            setCheckClient(true)
          } else if (user.id && user.type === 3) {
            setCheckClient(true)
          }
        })
      })
      .catch((err) => console.log(err))
  }, [])
  console.log('내담자인지확인', checkClient)
  // 커리큘럼 가져와서 저장하기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}curriculum/counsel/${counselId}`)
      .then((res) => {
        console.log('커리큘럼', res)
        setConunselCurriculums([...res.data])
      })
      .catch((err) => console.log(err))
  }, [])

  // 상담정보 가져오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}counsel/${counselId}`)
      .then((res) => {
        setCounselData(res.data)
        if (res.data.counselorId === user.id) {
          setCheckClient(true)
        }
        console.log(res)
      })
      .catch((err) => console.log(err))
  }, [])

  //상담사 정보 가져오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}userinfo/counselor/${counselorId}`)
      .then((res) => {
        setCounselor(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const counselEntrance = (id: number) => {
    navigate(`/counseling/${id}`)
  }

  const onClickPayment = () => {
    if (!window.IMP) return
    /* 1. 가맹점 식별하기 */
    const { IMP } = window
    IMP.init('imp74733355') // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'kakaopay.TC0ONETIME',

      // pay_method: 'card', // 결제수단
      // merchant_uid: 'IMP' + `${new Date().getTime()}+${user.id}`,
      amount: 1,
      // amount: counselData.price,
      name: counselData.title,
      user: {
        buyer_id: user.id,
      },
      counsel_id: counselid,
      // buy_time: new Date(),
      // buyer_tel: '01012341234', // 구매자 전화번호

      // buyer_addr: '신사동 661-16', // 구매자 주소
      // buyer_postcode: '06018', // 구매자 우편번호
    }
    setPaymentData({ ...paymentData, amount: counselData.price })

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback)
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: RequestPayResponse) {
    const { success, error_msg } = response

    if (success) {
      alert('결제 성공')
      axios
        .post(`${process.env.REACT_APP_BASE_URL}payment`, paymentData)
        .then((res) =>
          axios
            .get(`${process.env.REACT_APP_BASE_URL}userinfo/${user.id}`)
            .then((res) => {
              setUser((prevUser) => ({
                ...prevUser,
                type: res.data.type,
              }))
            }),
        )
        .catch((err) => console.log('포스트실패', err))
    } else {
      alert(`결제 실패: ${error_msg}`)
    }
  }

  const onCardClick = () => {
    navigate(`/counselor/${counselData.counselorId}`)
  }
  const handleCounselViewClick = () => {
    if (user.type === 1 || user.type === 3) {
      navigate(`/testimony/${user.id}`)
      window.scrollTo(0, 0)
    } else if (user.type === 2) {
      navigate(`/counsel/counseljournal/${counselId}`)
      window.scrollTo(0, 0)
    }
  }
  const editCounselDetail = () => {
    navigate('/counsel/edit/:counselId/')
  }

  const deleteCounselDetail = () => {
    if (confirmationText === '상담 삭제에 동의합니다.') {
      // 회원 탈퇴 로직
      setDeleteModalIsOpen(false)
    } else {
      alert('문구를 정확히 입력해주세요.')
    }
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

  const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
  `

  const CurriculumInputList = styled.div`
    display: flex;
    flex-direction: column;
  `
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}curriculum`)
      .then((response) => {
        setConunselCurriculums([...response.data])
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}counsel/${counselId}`)
      .then((response) => {
        setCounselData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error)
      })
  }, [])

  return (
    <div>
      <Modal
        isOpen={curriculumModalIsOpen}
        onRequestClose={() => {
          setCurriculumModalIsOpen(false)
        }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            color: 'darkslategray',
            width: '780px',
            height: '600px',
            top: '5%',
            left: '23%',
          },
        }}
        contentLabel="Curriculum Modal"
      >
        <ModalHeader>
          <h1>Curriculum</h1>
          <div>
            <div
              style={{
                backgroundColor: '#EF5C5C',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100px',
                height: '30px ',
                borderRadius: '10px',
                margin: '10px ',
                cursor: 'pointer',
              }}
              onClick={() => {
                setCurriculumModalIsOpen(false)
              }}
            >
              <div style={{ color: 'white' }}>Close</div>
            </div>
          </div>
        </ModalHeader>

        <CurriculumInputList>
          {conunselCurriculums.map((curriculum, index) => (
            <div
              key={index}
              style={{
                margin: '10px 0px 10px 23px',
                borderRadius: '10px',
                width: '700px',
                padding: '10px',
                backgroundColor: 'lightgray',
              }}
            >
              {index + 1} 회차: {curriculum.content}
            </div>
          ))}
        </CurriculumInputList>
      </Modal>

      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
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
            정말 <span style={{ color: 'red' }}>삭제 </span>하시겠습니까?
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
            삭제한 상담 내용은 복구할 수 없습니다. 삭제하시려면 아래 문구를
            정확히 따라 입력해주세요.
            <br />
            <span style={{ color: '#FF0000' }}>“상담 삭제에 동의합니다.”</span>
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
              onClick={() => setDeleteModalIsOpen(false)}
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
              onClick={deleteCounselDetail}
            >
              탈퇴
            </button>
          </div>
        </div>
      </Modal>
      <div className="Navbar">
        <NavbarLogin />
      </div>

      <div
        className="top"
        style={{
          display: 'flex',
          height: '430px',
        }}
      >
        <div
          className="top left"
          style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            margin: '30px 0px 0px 200px ',
            width: '50%',
          }}
        >
          <div
            style={{
              border: '1px solid #3b478f',
              borderRadius: '13px',
              width: '702px',
              minHeight: '260px',
              padding: '20px',
              position: 'relative',
              background: 'white',
            }}
          >
            <h2 style={{ textAlign: 'left', margin: '0px 0px 5px 0px' }}>
              상담 소개
            </h2>
            <hr style={{ borderTop: '2px solid black' }} />
            <div
              style={{
                fontWeight: 'bold',
              }}
            >
              {counselData.introduction}
            </div>
          </div>
        </div>

        <div
          className="right"
          style={{
            margin: '78px 0px 0px 35px',
          }}
        >
          <div className="right top">
            <CounselCard
              buttonText="결제하기"
              name={counselData.counselorName}
              grade={counselor.rateSum}
              gradeCount={''}
              startTime={formatDateDetail(counselData.startDate)}
              endTime={formatDateDetail(counselData.endDate)}
              title={counselData.title}
              minParticipantCount={4}
              maxParticipantCount={12}
              sessionCount={counselData.counselCount}
              price={counselData.price}
              onClick={onClickPayment}
            />
          </div>

          <div
            className="right middle"
            style={{
              margin: '80px 0px 0px 30px',
            }}
          >
            <CounselorCard
              onCardClick={onCardClick}
              name={counselor.name}
              grade={counselor.rateSum}
              gradeCount={45}
              introduce={counselor.introduction}
              imgSrc={counselor.profile}
            />
          </div>
          <div className="right bottom" style={{ margin: '85px 0px 0px 41px' }}>
            {user.type !== 0 && (
              <div>
                <div
                  className="counsel journal open"
                  style={{ marginBottom: '10px' }}
                >
                  <Button
                    size={{ width: '284px', height: '60px' }}
                    text={user.type === 1 ? '소감문 보기' : '상담일지 보기'}
                    color={{ background: '#00AAFF', color: 'white' }}
                    onClick={handleCounselViewClick}
                  />
                </div>
                {counselData.counselorId === user.id ||
                  (user.type === 3 && (
                    <div className="edit" style={{ marginBottom: '10px' }}>
                      <Button
                        size={{ width: '284px', height: '60px' }}
                        text="수정하기"
                        color={{ background: '#40BFFF', color: 'white' }}
                        onClick={editCounselDetail}
                      />
                    </div>
                  ))}
                {counselData.counselorId === user.id ||
                  (user.type === 3 && (
                    <div className="delete" style={{ marginBottom: '10px' }}>
                      <Button
                        size={{ width: '284px', height: '60px' }}
                        text="삭제하기"
                        color={{ background: '#EF5C5C', color: 'white' }}
                        onClick={() => setDeleteModalIsOpen(true)}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="middle"
        style={{
          margin: '0px 0px 0px 200px',
          width: '800px',
        }}
      >
        <div
          style={{
            border: '1px solid #3b478f',
            borderRadius: '13px',
            width: '702px',
            minHeight: '235px',
            padding: '20px',
            position: 'relative',
            background: 'white',
          }}
        >
          <h2 style={{ textAlign: 'left', margin: '0 0 5px 0' }}>
            상담 커리큘럼
          </h2>
          <hr style={{ borderTop: '2px solid black' }} />
          {conunselCurriculums &&
            conunselCurriculums.map(
              (conunselCurriculum: any, index: number) => (
                <React.Fragment key={conunselCurriculum.id}>
                  <div
                    style={{
                      display: 'flex',
                      // justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: '5px 0',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '700px',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '11px',
                          fontWeight: 'normal',
                          margin: '7px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {conunselCurriculum.content}
                      </h4>
                      {checkClient && (
                        <div
                          style={{
                            cursor: 'pointer',
                            borderRadius: '5px',
                            border: '1px solid #40BFFF',
                            width: '80px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            backgroundColor: '#40BFFF',
                            color: 'white',
                            margin: '0px 0px 0px 0px',
                          }}
                          onClick={() =>
                            counselEntrance(conunselCurriculum.curriculumId)
                          }
                        >
                          상담 입장하기
                        </div>
                      )}
                    </div>
                  </div>
                  {index < 6 && (
                    <hr
                      style={{ borderTop: '1px solid gray', margin: '0px 0' }}
                    />
                  )}
                </React.Fragment>
              ),
            )}
        </div>
      </div>
      <div
        className="bottom"
        style={{
          margin: '30px 0px 0px 200px ',
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <img
            src="/image/counsel_detail.png"
            alt="counsel_detail"
            style={{
              width: '350px',
              height: '330px',
              margin: '0px 35px 0px 5px',
            }}
          />
          <img
            src="/image/counsel_detail2.png"
            alt="counsel_detail"
            style={{
              width: '350px',
              height: '330px',
              margin: '0px 0px 0px 0px',
            }}
          />
        </div>
      </div>
      <div
        className="blank"
        style={{
          width: '1440px',
          height: '150px',
        }}
      ></div>
      <Footer />
    </div>
  )
}
