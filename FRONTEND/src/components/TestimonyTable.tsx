import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { BoardData } from '../model/board'
import { formatDate } from '../utils/dateUtils'

export interface TestimonyData {
  content: string
  nickname: string
  date: string
}

interface TestimonyTableProps {
  data: TestimonyData[]
  // DetailTestimony: (post: BoardData) => void
}

export const TestimonyTable: React.FC<TestimonyTableProps> = ({
  data,
  // DetailTestimony,
}) => {
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
              {/* 작성자 */}
            </TableCell>
            <TableCell
              sx={{ fontWeight: 'bold', fontSize: '18px' }}
              align="right"
            >
              등록일
            </TableCell>
            <TableCell
              sx={{ fontWeight: 'bold', fontSize: '18px' }}
              align="right"
            >
              {/* 조회수 */}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow
                key={index}
                style={{
                  border: 'solid',
                  borderWidth: '0px 0px 1px',
                  borderColor: '#e6e6e6',
                }}
              >
                {/* 프론트에서 번호 증가시키기 */}
                <TableCell
                  style={{ border: 'none' }}
                  component="th"
                  scope="row"
                >
                  {data.length - index}
                </TableCell>
                {/* userId를 그냥 id로 수정해야함 board의 id로 */}
                <TableCell style={{ border: 'none' }}>
                  <div
                    // onClick={() => DetailTestimony(row)}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    {row.content}
                  </div>
                </TableCell>

                <TableCell style={{ border: 'none' }} align="right">
                  {/* {row.nickname} */}
                </TableCell>
                <TableCell style={{ border: 'none' }} align="right">
                  {formatDate(row.date)}
                </TableCell>
                <TableCell style={{ border: 'none' }} align="right">
                  {row.nickname}
                </TableCell>
                {/* 삭제버튼 */}
                <TableCell style={{ border: 'none' }} align="right">
                  {/* {row.views} */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
