import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Board, BoardData } from '../model/board'
import { Link } from 'react-router-dom'
import { NoneStyledLink } from './../styles/Custom'
import StyledButton from './../styles/StyledButton'
import { formatDate } from '../utils/dateUtils'

interface NoticeTableProps {
  data: BoardData[]
}

const NoticeTable: React.FC<NoticeTableProps> = ({ data }) => {
  return (
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
      <Table sx={{ width: '80%', margin: '0 auto' }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ background: '#F8F8F8' }}>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              번호
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              제목
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
          {data &&
            [...data]
              .filter((row) => row.type === 1)
              .map((notice, index, filteredData) => (
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
                      {notice.title}
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
  )
}
export default NoticeTable
