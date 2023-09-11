import React, { useEffect, useState } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import CounselCard from '../components/CounselCard'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms/userState'
import axios from 'axios'
import { formatDateDetail } from '../utils/dateUtils'

export const Counsel = () => {
  const [user, setUser] = useRecoilState(userState)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const [counselData, setCounselData] = useState<any[]>([])

  const createCounsel = () => {
    // 상담 개설 페이지로 이동
    navigate(`/counsel/make`)
  }

  // 검색어에 매칭되는 데이터만 필터링
  const filteredData = counselData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const counselButtonClick = (id: number) => {
    navigate(`/counsel/${id}`)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}counsel`)
      .then((response) => {
        console.log(response.data)
        setCounselData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error)
      })
  }, [])

  console.log('필터데이터', filteredData)

  return (
    <div>
      <div className="Navbar">
        <NavbarLogin />
      </div>
      <div
        className="blank"
        style={{
          height: '165px',
          width: '100%',
          backgroundColor: '#ECF9FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          type="search box"
          placeholder="찾을 상담 제목을 입력해주세요"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '882px',
            height: '66px',
            borderRadius: '10px',
            border: '1.5px solid #40BFFF',
          }}
        />
      </div>
      <div
        className="blank"
        style={{
          marginTop: '50px',
          height: '531px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {user.type === 2 || user.type === 3 ? (
          <div
            className="counsel create button"
            style={{
              position: 'absolute',
              right: '5px',
              width: '170px',
              height: '43px',
              backgroundColor: '#15E506',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0px 0px 0px 0px',
              cursor: 'pointer',
              bottom: '510px',
            }}
            onClick={createCounsel}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              상담 개설
            </div>
          </div>
        ) : null}

        <div
          className="Counsel Cart List"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '20px',
            margin: '40px',
          }}
        >
          {/* 필터링된 데이터를 렌더링 */}
          {filteredData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <div style={{ margin: '10px 60px' }}>
                <CounselCard
                  buttonText="상세보기"
                  name={item.counselorName}
                  grade={item.clientCount}
                  gradeCount=""
                  startTime={formatDateDetail(item.startDate)}
                  endTime={formatDateDetail(item.endDate)}
                  title={item.title}
                  minParticipantCount={item.minClient}
                  maxParticipantCount={item.maxClient}
                  sessionCount={item.weekCount}
                  price={item.price}
                  onClick={() => counselButtonClick(item.counselId)}
                />
              </div>
            ))}
        </div>
      </div>
      <div
        className="page change"
        style={{
          height: '100px',
          width: '100%',
          marginTop: '700px',
          backgroundColor: '#ECF9FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          style={{
            cursor: 'pointer',
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: '#00AAFF',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          Prev
        </div>
        <div
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            borderRadius: '10px',
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          {currentPage}
        </div>
        <div
          onClick={() =>
            setCurrentPage(
              Math.min(
                Math.ceil(filteredData.length / itemsPerPage),
                currentPage + 1,
              ),
            )
          }
          style={{
            cursor: 'pointer',
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: '#00AAFF',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          Next
        </div>
      </div>
      <Footer />
    </div>
  )
}
