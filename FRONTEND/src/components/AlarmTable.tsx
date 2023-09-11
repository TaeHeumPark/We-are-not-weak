import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

type TestData = {
  id: number
  title: string
  year: string
}

// interface NoticeTableProps {
//   data: TestData[]
// }

interface NoticeTableProps<T> {
  data: T[]
}

// interface NoticeTableProps {
//   data: Board[]
// }

// 예시로 서버에서 가져온 데이터를 설정
// const serverData = [
//   { idx: 1, title: 'Ice cream sandwich', regDate: '2023-07-26' },
//   { idx: 2, title: 'Eclair', regDate: '2023-06-26' },
//   { idx: 3, title: 'Cupcake', regDate: '2023-05-20' },
//   { idx: 4, title: 'Gingerbread', regDate: '2023-04-16' },
// ]

const AlarmTable: React.FC<NoticeTableProps<TestData>> = ({ data }) => {
  console.log(data)
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
              알람 내용
            </TableCell>
            <TableCell
              sx={{ fontWeight: 'bold', fontSize: '18px' }}
              align="right"
            >
              등록일
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((alarm) => (
            <TableRow key={alarm.id}>
              <TableCell component="th" scope="row">
                {alarm.id}
              </TableCell>
              {/* 알람메시지 들어갈 부분 */}
              <TableCell>{alarm.title}</TableCell>

              <TableCell align="right">{alarm.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default AlarmTable
