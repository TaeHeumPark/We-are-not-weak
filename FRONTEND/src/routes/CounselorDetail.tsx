import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  FlexContainerRow,
  FlexContainer,
  BackgroundBox,
} from '../styles/MainStyle'
import NavbarLogin from '../components/NavbarLogin'
import axios from 'axios'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { userState } from '../recoil/atoms/userState'
import { useRecoilState } from 'recoil'
import StyledButton from './../styles/StyledButton'
import Stack from '@mui/material/Stack'

interface Evaluation {
  evaluation_rate: number
  evaluation_content: string
}
interface CounselorData {
  counselorId: number
  userId: number
  name: string
  profile: string | null
  regist: string | null
  license: string | null
  school: string | null
  company: string | null
  introduction: string | null | undefined
  rateSum: number
  state: number
  careers: string[]
}
interface Counselor {
  id: string
  imageUrl: string
  counselor_name: string
  counselor_introduction: string
  career_content: string[]
  counselor_school: string
  evaluations: Evaluation[]
}

// const DUMMY_DATA: { [key: string]: Counselor } = {
//   '1': {
//     id: '1',
//     imageUrl:
//       'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/5U3n/image/MEdGxSIxzO4h9s6d_SjkKtd_sjA.jpg',
//     counselor_name: '박태흠', // 나중에 총 평점 평균 로직 작성
//     counselor_introduction: '당신에게 소금 같은 사람이 되고 싶습니다.',
//     career_content: [
//       '상담심리사 2급 (한국상담심리학회)',
//       '전문코치 KPC (한국코치협회)',
//       '전문심리상담 및 코치 경력 (8년)',
//     ],
//     counselor_school: '연세대학교 일반대학원 상담심리 석사 졸업',
//     evaluations: [
//       {
//         evaluation_rate: 4.5,
//         evaluation_content:
//           '잘 공감해 주시고 위로해주시고 제 문제를 접근하는 구체적인 방법을 설명해주셨습니다',
//       },
//       {
//         evaluation_rate: 4,
//         evaluation_content:
//           '문제를 접근하는 구체적인 방법을 설명해주셨습니다문제를 접근하는 구체적인 방법을 설명해주셨습니다문제를 접근하는 구체적인 방법을 설명해주셨습니다문제를 접근하는 구체적인 방법을 설명해주셨습니다문제를 접근하는 구체적인 방법을 설명해주셨습니다문제를 접근하는 구체적인 방법을 설명해주셨습니다문제를 접근하는 구체적인 방법을 설명해주셨습니다문제를 접근하는 구체적인 방법을 설명해주셨습니다문제를 접근하는 구체적인 방법을 설명해주셨습니다문제를 접근하는 구체적인 방법을 설명해주셨습니다',
//       },
//       {
//         evaluation_rate: 5,
//         evaluation_content: '답답한게 쫌 시원해져요',
//       },
//       {
//         evaluation_rate: 5,
//         evaluation_content:
//           '답답한게 쫌 시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해시원해져요',
//       },
//     ],
//   },
// }
interface CounselorReviewData {
  id: number
  rate: number
  content: string
  date: string
  state: number
  clientId: any[]
}

export const CounselorDetail: React.FC = () => {
  const [checkClient, setCheckClient] = useState(false)
  const [counselorReviews, setCounselorReviews] = useState<
    CounselorReviewData[]
  >([])
  const params = useParams<{ counselorId: string }>()
  const [counselorReview, setCounselorReview] = useState('')
  const [counselorRate, setCounselorRate] = useState<number | null>(0)
  const { counselorId } = useParams()
  const [user, setUser] = useRecoilState(userState)
  const [counselor, setCounselor] = useState<CounselorData>({
    counselorId: 0,
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

  // 상담사 정보 가지고오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}userinfo/counselor/${counselorId}`)
      .then((res) => {
        console.log(res.data)
        setCounselor(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // 상담후기 가져오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}evaluations/${counselorId}`)
      .then((res) => {
        setCounselorReviews([...res.data])
      })
      .catch((err) => console.log(err))
  })

  const [expandedEvaluations, setExpandedEvaluations] = useState<{
    [key: number]: boolean
  }>({})

  const toggleExpanded = (index: number) => {
    setExpandedEvaluations((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleCounselorReivew = (e: ChangeEvent<HTMLInputElement>) => {
    setCounselorReview(e.target.value)
  }

  // id 값이 존재하는지 체크
  if (!params.counselorId) {
    return <div>Invalid id provided.</div>
  }

  // 상담사 데이터 가져오기, 지금은 더미데이터임
  const counselorData = counselor

  // undefined 체크
  if (!counselorData) {
    return <div>상담사 정보를 찾을 수 없습니다.</div>
  }
  const postCounselorReview = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}evaluation`, {
        content: counselorReview,
        rate: counselorRate,
        counselorId: counselorId,
        clientId: 1,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  // 평가 점수의 총 합을 계산
  // const totalRate = counselorData.evaluations.reduce(
  //   (acc, evaluation) => acc + evaluation.evaluation_rate,
  //   0,
  // )

  // 평가 점수의 평균을 계산, 소수점 두 번째 자리에서 반올림
  // const averageRate =
  // Math.round((totalRate / counselorData.evaluations.length) * 10) / 10

  return (
    <div className="container">
      <NavbarLogin />
      <FlexContainerRow style={{ padding: '50px' }}>
        <div style={{ width: '30%' }}>
          <FlexContainer
            style={{
              position: 'fixed',
              top: '120px',
              left: '50px',
              zIndex: 1,
              width: '20%',
            }}
          >
            <h2>{counselorData.name}</h2>
            <img
              src={counselorData.profile || '/image/star.png'}
              alt="Profile"
              style={{ width: 200, height: 200 }}
            />
            <div>
              <img
                src="/image/star.png"
                alt="star"
                style={{
                  marginRight: '10px',
                  width: '15px',
                  height: '15px',
                }}
              />{' '}
              {counselorData.rateSum || 0}
              {/* {'(' + counselorData.evaluations.length + ')'} */}
            </div>
          </FlexContainer>
        </div>

        <FlexContainer
          style={{ padding: '0px', marginLeft: '50px', width: '70%' }}
        >
          <BackgroundBox>
            <FlexContainer>
              <h2>소개</h2>
              <h4>{counselorData.introduction}</h4>
            </FlexContainer>
          </BackgroundBox>
          <BackgroundBox>
            <FlexContainerRow style={{ background: '#ecf9ff' }}>
              <FlexContainer>
                <h2>경력</h2>
                <ul>
                  {counselorData.careers.map((career, index) => (
                    <li key={index} style={{ paddingBottom: '10px' }}>
                      {career}
                    </li>
                  ))}
                </ul>
              </FlexContainer>
              <FlexContainer>
                <h4>학력</h4>
                <p>{counselorData.school}</p>
              </FlexContainer>
            </FlexContainerRow>
          </BackgroundBox>
          <BackgroundBox>
            <FlexContainer>
              <h2>상담사 후기 게시판</h2>

              {/* <Typography component="legend">상담사 별점</Typography> */}

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <Rating
                  name="simple-controlled"
                  value={counselorRate}
                  onChange={(event, newValue) => {
                    setCounselorRate(newValue)
                  }}
                />
                <input
                  type="text"
                  value={counselorReview}
                  onChange={handleCounselorReivew}
                />
                <StyledButton onClick={postCounselorReview}>제출</StyledButton>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(35%, 1fr))',
                  gap: '50px 40px',
                  justifyContent: 'center',
                }}
              >
                {counselorReviews.map((review, index) => (
                  <div key={index}>
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating-read"
                        value={review.rate} // 해당 리뷰의 평점 값으로 변경
                        precision={0.5}
                        readOnly
                      />
                      <span>{review.content}</span>
                    </Stack>
                  </div>
                ))}

                {/* {counselorData.evaluations.map((evaluation, index) => (
                  <div key={index}>
                    <img
                      src="/image/star.png"
                      alt="star"
                      style={{
                        marginRight: '10px',
                        width: '15px',
                        height: '15px',
                      }}
                    />{' '}
                    {evaluation.evaluation_rate}
                    <br />
                    {expandedEvaluations[index]
                      ? evaluation.evaluation_content
                      : `${evaluation.evaluation_content.substring(0, 100)}`}
                    {evaluation.evaluation_content.length >= 100 && (
                      <p
                        onClick={() => toggleExpanded(index)}
                        style={{ cursor: 'pointer', color: 'gray' }}
                      >
                        {expandedEvaluations[index] ? '줄이기' : '...더보기'}
                      </p>
                    )}
                  </div>
                ))}*/}
              </div>
            </FlexContainer>
          </BackgroundBox>
        </FlexContainer>
      </FlexContainerRow>
    </div>
  )
}
function useEffeect(arg0: () => void) {
  throw new Error('Function not implemented.')
}
