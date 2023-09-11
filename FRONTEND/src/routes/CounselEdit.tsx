import React, { useState, useRef } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import Modal from 'react-modal'

export const CounselEdit = () => {
  const days = ['월', '화', '수', '목', '금', '토', '일']
  const hours = Array.from({ length: 23 }, (_, i) => i)
  const [checkedDays, setCheckedDays] = useState(Array(7).fill(false))
  const [counselTitle, setCounselTitle] = useState('')
  const [counselContent, setCounselContent] = useState('')
  const [curriculumCount, setCurriculumCount] = useState(0)

  const [curriculums, setCurriculums] = useState(
    Array(curriculumCount).fill(''),
  )
  const navigate = useNavigate()
  const [minimumMember, setMinimumMember] = useState(4)
  const [maximumMember, setMaximumMember] = useState(8)
  const [amount, setAmount] = useState('')
  const [checkedDaysCount, setCheckedDaysCount] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const tempCurriculums = useRef<string[]>([])

  const [timeRangeByDay, setTimeRangeByDay] = useState(
    days.reduce(
      (acc: Record<string, { start: number; end: number }>, cur: string) => {
        acc[cur] = { start: 0, end: 0 }
        return acc
      },
      {},
    ),
  )
  const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
  `

  const CurriculumInputList = styled.div`
    display: flex;
    flex-direction: column;
  `
  const createCounsel = () => {
    navigate(`/counsel`)
  }
  const cancle = () => {
    navigate(`/counsel/counselId`)
    window.scrollTo(0, 0)
  }

  const handleCheckChange = (index: number) => {
    // 체크 상태를 반전시킨다.
    const newCheckedDays = checkedDays.map((checked, idx) =>
      idx === index ? !checked : checked,
    )
    setCheckedDays(newCheckedDays)

    // 체크된 요일의 개수를 계산한다.
    const newCheckedDaysCount = newCheckedDays.filter(
      (checked) => checked,
    ).length

    // 이미 3개의 요일이 선택되었는데, 추가로 선택하려고 한다면 막는다.
    if (newCheckedDaysCount > 2) {
      alert('최대 2개의 요일만 선택할 수 있습니다.')
      return
    }

    // 체크된 요일의 개수를 업데이트한다.
    setCheckedDaysCount(newCheckedDaysCount)
  }

  const handleTimeChange = (
    day: string,
    startOrEnd: string,
    selectedTime: number,
  ) => {
    setTimeRangeByDay((prevTimeRange) => {
      const timeDifference = Math.abs(
        selectedTime -
          prevTimeRange[day][startOrEnd === 'start' ? 'end' : 'start'],
      )

      // 시작 시간을 선택하고, 그 시간이 종료 시간보다 늦은 경우
      // 또는 선택한 시작 시간과 종료 시간의 차이가 3시간을 넘는 경우
      if (
        startOrEnd === 'start' &&
        (selectedTime > prevTimeRange[day].end || timeDifference > 3)
      ) {
        return {
          ...prevTimeRange,
          [day]: {
            ...prevTimeRange[day],
            start: selectedTime,
            end: selectedTime + 3 > 23 ? 23 : selectedTime + 3, // 종료 시간을 시작 시간과 동일하게 설정, 하지만 23시를 넘지 않도록 함
          },
        }
      }
      // 종료 시간을 선택하고, 그 시간이 시작 시간보다 이른 경우
      // 또는 선택한 시작 시간과 종료 시간의 차이가 3시간을 넘는 경우
      else if (
        startOrEnd === 'end' &&
        (selectedTime < prevTimeRange[day].start || timeDifference > 3)
      ) {
        return {
          ...prevTimeRange,
          [day]: {
            ...prevTimeRange[day],
            start: selectedTime - 3 < 0 ? 0 : selectedTime - 3, // 시작 시간을 종료 시간과 동일하게 설정, 하지만 0시를 넘지 않도록 함
            end: selectedTime,
          },
        }
      } else {
        // 그 외의 경우 (시간 선택이 유효한 경우)
        return {
          ...prevTimeRange,
          [day]: {
            ...prevTimeRange[day],
            [startOrEnd]: selectedTime,
          },
        }
      }
    })
  }

  const curriculumOpen = () => {
    setIsModalOpen(true)
  }

  return (
    <div
      style={{
        marginBottom: '100px',
      }}
    >
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          tempCurriculums.current = [...curriculums]
          setIsModalOpen(false)
        }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            color: 'lightsteelblue',
          },
        }}
        contentLabel="Curriculum Modal"
      >
        <ModalHeader>
          <h1>Curriculum</h1>
          <div>
            <div
              style={{
                backgroundColor: '#15E506',
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
                setCurriculums([...tempCurriculums.current])
                setIsModalOpen(false)
              }}
            >
              <div style={{ color: 'white' }}>Save</div>
            </div>
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
                tempCurriculums.current = [...curriculums]
                setIsModalOpen(false)
              }}
            >
              <div style={{ color: 'white' }}>Close</div>
            </div>
          </div>
        </ModalHeader>

        <CurriculumInputList>
          {Array.from({ length: curriculumCount }, (_, index) => (
            <textarea
              style={{
                resize: 'none',
                margin: '10px 0px 10px 0px',
                borderRadius: '10px',
                width: '1000px',
                height: '45px',
              }}
              placeholder={`${index + 1} 회차 내용을 입력해주세요`}
              value={curriculums[index]}
              onChange={(e) => {
                tempCurriculums.current[index] = e.target.value
              }}
            />
          ))}
        </CurriculumInputList>
      </Modal>

      <div className="Navbar">
        <NavbarLogin />
      </div>
      <div
        className="header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid black',
          width: '935px',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '80px',
        }}
      >
        <div
          className="text"
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        >
          상담 수정하기
        </div>
        <div className="button" style={{ display: 'flex' }}>
          <div
            className="create button"
            style={{
              backgroundColor: '#15E506',
              cursor: 'pointer',
              marginRight: '20px',
              width: '80px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '13px',
            }}
            onClick={createCounsel}
          >
            <div
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              수정
            </div>
          </div>
          <div
            className="cancle button"
            style={{
              backgroundColor: '#EF5C5C',
              cursor: 'pointer',
              width: '80px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '13px',
            }}
            onClick={cancle}
          >
            <div
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              취소
            </div>
          </div>
        </div>
      </div>
      <div
        className="body top"
        style={{
          marginTop: '40px',
          textAlign: 'center',
        }}
      >
        <div>
          <textarea
            className="counsel title input"
            placeholder="제목을 입력해주세요"
            value={counselTitle}
            onChange={(e) => setCounselTitle(e.target.value)}
            style={{
              width: '935px',
              height: '66px',
              borderRadius: '10px',
              border: '1.5px solid #40BFFF',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              alignItems: 'center',
              resize: 'none',
            }}
          />
        </div>
        <div>
          <textarea
            className="counsel content input"
            placeholder="내용을 입력해주세요"
            value={counselContent}
            onChange={(e) => setCounselContent(e.target.value)}
            style={{
              width: '920px',
              height: '66px',
              borderRadius: '10px',
              border: '1.5px solid #40BFFF',
              marginTop: '20px',
              padding: '10px',
              overflowY: 'auto',
              resize: 'none',
            }}
          />
        </div>
      </div>
      <div className="body bottom" style={{ display: 'flex' }}>
        <div
          className="body bottom left"
          style={{
            margin: '70px 10px 0px 300px',
            width: '50%',
          }}
        >
          <div
            className="day check"
            style={{
              display: 'flex',
              marginBottom: '20px',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            <div style={{ fontWeight: 'bold', marginRight: '20px' }}>
              상담 요일 :
            </div>
            {days.map((day, index) => (
              <label
                key={index}
                style={{
                  // display: 'flex',
                  flexDirection: 'row',
                  marginRight: '10px',
                  color: checkedDays[index] ? '#00AAFF' : 'black',
                }}
              >
                {day}
                <input
                  type="checkbox"
                  style={{ marginLeft: '5px' }}
                  checked={checkedDays[index]}
                  onChange={() => handleCheckChange(index)}
                  disabled={checkedDaysCount >= 2 && !checkedDays[index]}
                />
              </label>
            ))}
          </div>
          {days.map((day, index) => (
            <div
              key={day}
              style={{ display: checkedDays[index] ? 'block' : 'none' }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ color: '#00AAFF' }}>{day}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '200px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  시작 시간:
                  <select
                    style={{
                      marginTop: '5px',
                      width: '80px',
                    }}
                    value={timeRangeByDay[day].start}
                    onChange={(e) =>
                      handleTimeChange(day, 'start', Number(e.target.value))
                    }
                  >
                    <option disabled selected value="">
                      선택
                    </option>
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  종료 시간:
                  <select
                    style={{
                      marginTop: '5px',
                      width: '80px',
                    }}
                    value={timeRangeByDay[day].end}
                    onChange={(e) =>
                      handleTimeChange(day, 'end', Number(e.target.value))
                    }
                  >
                    <option disabled selected value="">
                      선택
                    </option>
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
          <div className="date setting">
            <div>
              <div
                style={{
                  // display: 'flex',
                  // justifyContent: 'space-between',
                  width: '400px',
                  marginBottom: '20px',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                <div
                  className="start day setting"
                  style={{
                    display: 'flex',
                  }}
                >
                  <div style={{ marginRight: '20px' }}>시작 날짜 :</div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => {
                      setStartDate(date)
                      if (endDate && date && date > endDate) {
                        setEndDate(date)
                      }
                    }}
                  />
                </div>
                <div
                  className="end day setting"
                  style={{
                    display: 'flex',
                    marginTop: '15px',
                  }}
                >
                  <div style={{ marginRight: '20px' }}>종료 날짜 :</div>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    minDate={startDate}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="curriculum input" style={{ display: 'flex' }}>
            <div style={{ fontWeight: 'bold' }}>회차 수 :</div>
            <div
              style={{
                marginLeft: '10px',
              }}
            >
              <input
                className="curriculum count input"
                type="number"
                style={{
                  width: '40px',
                  marginLeft: '26px',
                  marginRight: '4px',
                }}
                value={curriculumCount}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value)
                  if (isNaN(newValue)) {
                    alert('회차 수는 숫자여야 합니다.')
                  } else if (newValue > 20) {
                    alert('회차 수는 20을 초과할 수 없습니다.')
                  } else if (newValue < 0) {
                    alert('회차 수는 0보다 작을 수 없습니다.')
                  } else {
                    setCurriculumCount(parseInt(e.target.value))
                  }
                }}
              />
              회
            </div>
            <div
              className="curriculum open"
              style={{
                borderRadius: '5px  ',
                backgroundColor: '#40BFFF',
                width: '80px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '10px',
              }}
              onClick={curriculumOpen}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                커리큘럼 열기
              </div>
            </div>
          </div>
        </div>
        <div
          className="body bottom right"
          style={{
            margin: '70px 300px 0px 10px',
            width: '50%',
            borderLeft: '1px solid #A8A8A8',
          }}
        >
          {' '}
          <div className="minimum member" style={{ display: 'flex' }}>
            <div
              style={{
                fontWeight: 'bold',
                marginLeft: '50px ',
              }}
            >
              최소 인원 :
            </div>
            <div
              style={{
                marginLeft: '10px',
              }}
            >
              <input
                className="minimum member input"
                type="number"
                style={{
                  width: '40px',
                  marginLeft: '26px',
                  marginRight: '4px',
                }}
                value={minimumMember}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value)
                  if (isNaN(newValue)) {
                    alert('인원은 숫자여야 합니다.')
                  } else if (newValue > 8) {
                    alert('최소 인원은 8명을 초과할 수 없습니다.')
                  } else if (newValue < 4) {
                    alert('최소 인원은 4명 보다 적을 수 없습니다.')
                  } else {
                    setMinimumMember(parseInt(e.target.value))
                  }
                }}
              />
              회 (4 ~ 8)
            </div>
          </div>
          <div
            className="minimum member"
            style={{ display: 'flex', marginTop: '10px' }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginLeft: '50px ',
              }}
            >
              최대 인원 :
            </div>
            <div
              style={{
                marginLeft: '10px',
              }}
            >
              <input
                className="minimum member input"
                type="number"
                style={{
                  width: '40px',
                  marginLeft: '26px',
                  marginRight: '4px',
                }}
                value={maximumMember}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value)
                  if (isNaN(newValue)) {
                    alert('인원은 숫자여야 합니다.')
                  } else if (newValue > 8) {
                    alert('최대 인원은 8명을 초과할 수 없습니다.')
                  } else if (newValue < 4) {
                    alert('최대 인원은 4명 보다 적을 수 없습니다.')
                  } else {
                    setMaximumMember(parseInt(e.target.value))
                  }
                }}
              />
              회 (4 ~ 8)
            </div>
          </div>
          <div
            className="amount"
            style={{ display: 'flex', marginTop: '10px' }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginLeft: '50px ',
              }}
            >
              금 액 :
            </div>
            <div
              style={{
                marginLeft: '42px',
              }}
            >
              <input
                className="amount input"
                type="number"
                style={{
                  width: '100px',
                  marginLeft: '26px',
                  marginRight: '4px',
                }}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
              />
              원
            </div>
          </div>
          <div
            className="Total amount"
            style={{
              display: 'flex',
              marginTop: '10px',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginLeft: '50px ',
              }}
            >
              총 액 :
            </div>
            {minimumMember * parseInt(amount) > 1 &&
              maximumMember * parseInt(amount) > 1 && (
                <div
                  style={{
                    marginLeft: '68px',
                  }}
                >
                  {minimumMember * parseInt(amount)}원~
                  {maximumMember * parseInt(amount)}원
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
