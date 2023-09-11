import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'
import { NoneStyledLink } from '../styles/Custom'
import StyledButton from './../styles/StyledButton'
import { BoardData } from '../model/board'
import { formatDate } from '../utils/dateUtils'

interface FreeBoardTableProps {
  data: BoardData[]
}

export const FreeBoardTable: React.FC<FreeBoardTableProps> = ({ data }) => {
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
            <TableCell
              align="right"
              sx={{ fontWeight: 'bold', fontSize: '18px' }}
            >
              작성자
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: 'bold', fontSize: '18px' }}
            >
              조회수
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            [...data]
              .filter((row) => row.type === 0)
              .map((row, index, filteredData) => (
                <TableRow
                  key={index}
                  style={{
                    border: 'solid',
                    borderWidth: '0px 0px 1px',
                    borderColor: '#e6e6e6',
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ border: 'none' }}
                  >
                    {filteredData.length - index}
                  </TableCell>
                  <TableCell style={{ border: 'none' }}>
                    <NoneStyledLink
                      style={{ padding: '0px', display: 'block' }}
                      to={`/freeboard/${row.id}`}
                    >
                      {row.title}
                    </NoneStyledLink>
                  </TableCell>

                  <TableCell align="right" style={{ border: 'none' }}>
                    {formatDate(row.date)}
                  </TableCell>
                  <TableCell align="right" style={{ border: 'none' }}>
                    {row.nickname}({row.level})
                  </TableCell>
                  <TableCell align="right" style={{ border: 'none' }}>
                    {row.views}
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
