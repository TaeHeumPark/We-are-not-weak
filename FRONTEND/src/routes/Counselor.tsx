import React, { useEffect, useState } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import CounselorCard from '../components/CounselorCard'
import { CounselorData } from '../model/counsel'
import axios from 'axios'

export const Counselor = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [counselors, setCounselors] = useState<CounselorData[]>([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}userinfo/counselor`)
      .then((res) => {
        setCounselors([...res.data])

        console.log('counselors', res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  // 검색어에 매칭되는 데이터만 필터링
  const filteredData = counselors.filter(
    (item) => item.name && item.name.includes(searchTerm),
  )

  const counselorButtonClick = (id: number) => {
    navigate(`/counselor/${id}`)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

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
        {/* 상담사 name으로 검색 */}
        <input
          type="search box"
          placeholder="찾을 상담사를 입력해주세요"
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
          height: '100px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        <div
          className="Counselor Cart List"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '20px',
            margin: '40px',
          }}
        >
          {/* 필터링된 데이터를 렌더링 */}
          {/* {filteredData */}
          {counselors
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <div style={{ margin: '10px 60px' }}>
                <CounselorCard
                  onCardClick={() => counselorButtonClick(item.counselorId)}
                  name={item.counselorName}
                  grade={item.rateSum}
                  introduce={
                    item.introduction && item.introduction.length > 27
                      ? item.introduction.substring(0, 27) + '...'
                      : item.introduction
                  }
                  imgSrc={item.profile}
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
