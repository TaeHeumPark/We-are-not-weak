import React, { useEffect, useState } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import ArticleBar from '../components/ArticleBar'
import { useNavigate } from 'react-router'
import { BoardData } from '../model/board'
import Pagination from 'react-js-pagination'
import axios from 'axios'
import './Question.css'
import Modal from 'react-modal'
import { TestimonyTable } from '../components/TestimonyTable'
import { useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms/userState'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { formatDate } from '../utils/dateUtils'
import { NoneStyledLink } from '../styles/Custom'

export const MyComments = () => {
  const modalStyle = {
    content: {
      width: '500px',
      height: '300px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '2px solid lightgray',
      padding: '20px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 어두워짐 효과
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }
  const navigate = useNavigate()
  const [user, setUser] = useRecoilState(userState)

  const [boardList, setBoardList] = useState<BoardData[]>([]) // axios에서 받아온 전체 게시글 데이터
  const [currentPost, setCurrentPost] = useState<BoardData[]>(boardList) // 페이지네이션을 통해 보여줄 게시글
  const [page, setPage] = useState<number>(1) // 현재 페이지 번호
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<{
    title: string
    content: string
  }>({
    title: '',
    content: '',
  })

  const postPerPage: number = 15 // 페이지 당 게시글 개수
  const indexOfLastPost: number = page * postPerPage
  const indexOfFirstPost: number = indexOfLastPost - postPerPage

  interface BoardApiResponse {
    reverse(): BoardApiResponse
    data: BoardData[]
  }
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}comments/user/${user.id}`)
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

  const detailTestimony = (post: BoardData) => {
    setModalContent({ title: post.title, content: post.content })
    setShowModal(true)
  }
  return (
    <div>
      <NavbarLogin />
      <ArticleBar name="내가 쓴 댓글" />
      <div className="board-list">
        <div
          style={{
            borderTop: '3px gray',
            marginBottom: '30px',
            marginTop: '10px',
            paddingLeft: '10px', // 좌측 여백 추가
            paddingRight: '10px', // 우측 여백 추가
          }}
        >
          {/* table head 부분 */}
          <Table
            sx={{ width: '80%', margin: '0 auto' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow style={{ background: '#F8F8F8' }}>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                  번호
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                  댓글
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 'bold', fontSize: '18px' }}
                  align="right"
                >
                  등록일
                </TableCell>
              </TableRow>
            </TableHead>

            {/* 테이블 바디 각각의 data를 출력하는 부분 */}
            <TableBody>
              {boardList &&
                boardList.map((notice, index, filteredData) => (
                  <TableRow
                    key={index}
                    style={{
                      border: 'solid',
                      borderWidth: '0px 0px 1px',
                      borderColor: '#e6e6e6',
                    }}
                  >
                    <TableCell
                      style={{ border: 'none' }}
                      component="th"
                      scope="row"
                    >
                      {filteredData.length - index}
                    </TableCell>

                    <TableCell style={{ border: 'none' }}>
                      <NoneStyledLink
                        style={{ padding: '0px', display: 'block' }}
                        to={`/notice/${notice.id}`}
                      >
                        {notice.content}
                      </NoneStyledLink>
                    </TableCell>
                    <TableCell style={{ border: 'none' }} align="right">
                      {formatDate(notice.date)}
                    </TableCell>
                    {/* <StyledButton background="white" color="red" fontSize="15px">
                X
              </StyledButton> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

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
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={modalStyle}
        contentLabel="Content Modal"
      >
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
          }}
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <h2>{modalContent.title}</h2>
        <p>{modalContent.content}</p>
      </Modal>
    </div>
  )
}
