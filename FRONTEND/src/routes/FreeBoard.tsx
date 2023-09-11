import React, { useState, useEffect } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import StyledButton from '../styles/StyledButton'
import { useNavigate } from 'react-router'
import { BoardData } from '../model/board'
import Pagination from 'react-js-pagination'
import axios from 'axios'
import './FreeBoard.css'
import ArticleBar from '../components/ArticleBar'
import { FreeBoardTable } from '../components/FreeBoardTable'

export const FreeBoard = () => {
  const navigate = useNavigate()

  const [boardList, setBoardList] = useState<BoardData[]>([]) // axios에서 받아온 전체 게시글 데이터
  const [currentPost, setCurrentPost] = useState<BoardData[]>(boardList) // 페이지네이션을 통해 보여줄 게시글
  const [page, setPage] = useState<number>(1) // 현재 페이지 번호

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
      .get(`${process.env.REACT_APP_BASE_URL}articles/community`)
      .then((response) => {
        console.log(response.data)
        setBoardList([...response.data].reverse())
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    setCurrentPost(boardList.slice(indexOfFirstPost, indexOfLastPost))
  }, [boardList, page])

  return (
    <div>
      <NavbarLogin />
      <ArticleBar name="자유게시판" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          marginRight: '250px',
        }}
      >
        <StyledButton
          primary
          marginTop="20px"
          marginBottom="20px"
          fontSize="18px"
          width="100px"
          height="50px"
          onClick={() => navigate('/freeboard/write')}
        >
          글 쓰기
        </StyledButton>
      </div>
      <div className="board-list">
        {boardList && <FreeBoardTable data={currentPost} />}

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
