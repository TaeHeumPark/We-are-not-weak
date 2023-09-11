import React, { useState, useEffect } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import { CommunityFree } from '../components/CommunityFree'
import { QnaTable } from '../components/QnaTable'
import { useQuery } from 'react-query'
import StyledButton from '../styles/StyledButton'
import { useNavigate } from 'react-router'
// import { BoardData } from '../model/board'
import { getBoard, getBoards } from '../hooks/useboard'
import { BoardData } from '../model/board'
import Pagination from 'react-js-pagination'
import axios from 'axios'
import './Notice.css'
import { CommunityNotice } from '../components/CommunityNotice'
import NoticeTable from '../components/NoticeTable'
import { userState } from '../recoil/atoms/userState'
import { useRecoilState } from 'recoil'

export const Notice = () => {
  const navigate = useNavigate()

  const [boardList, setBoardList] = useState<BoardData[]>([]) // axios에서 받아온 전체 게시글 데이터
  const [currentPost, setCurrentPost] = useState<BoardData[]>(boardList) // 페이지네이션을 통해 보여줄 게시글
  const [page, setPage] = useState<number>(1) // 현재 페이지 번호
  const [user, setUser] = useRecoilState(userState)

  const postPerPage: number = 15 // 페이지 당 게시글 개수
  const indexOfLastPost: number = page * postPerPage
  const indexOfFirstPost: number = indexOfLastPost - postPerPage

  const handlePageChange = (page: number) => {
    setPage(page)
  }
  interface BoardApiResponse {
    reverse(): BoardApiResponse
    data: BoardData[]
  }
  // axios data파일 받아오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}articles/notice`)
      .then((response) => {
        setBoardList([...response.data].reverse())
      })

      .catch(function (error) {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    setCurrentPost(boardList.slice(indexOfFirstPost, indexOfLastPost))
  }, [boardList, page])
  console.log(user.type)
  return (
    <div>
      <NavbarLogin />
      <CommunityNotice />
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          marginRight: '250px',
        }}
      >
        {user.type === 3 ? (
          <StyledButton
            primary
            marginTop="20px"
            marginBottom="20px"
            fontSize="18px"
            width="100px"
            height="50px"
            onClick={() => navigate('/notice/write')}
          >
            글 쓰기
          </StyledButton>
        ) : null}
      </div>
      <div className="board-list">
        {boardList && <NoticeTable data={currentPost} />}

        <Pagination
          activePage={page}
          itemsCountPerPage={postPerPage}
          totalItemsCount={boardList.length}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}
