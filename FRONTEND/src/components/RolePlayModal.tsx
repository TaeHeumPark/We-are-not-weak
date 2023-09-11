import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { FlexContainerRow } from '../styles/MainStyle'
import StyledButton from '../styles/StyledButton'

interface RolePlayModalProps {
  nickname: string
}

const style = {
  position: 'absolute',
  top: '70%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #3b478f',
  p: 4,
} as const // 'as const'는 모든 속성을 리터럴 타입으로 만듭니다.

export default function RolePlayModal(props: RolePlayModalProps) {
  const [open, setOpen] = React.useState(true)
  const [role, setRole] = React.useState<string>('')

  const handleClose = () => setOpen(false)

  const updateRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          역할을 배정해 주세요!
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h3">
          지목된 이름 : {props.nickname}
        </Typography>

        <div style={{ paddingBottom: '30px' }}>
          <FlexContainerRow>
            <input
              type="text"
              value={role}
              onChange={updateRole}
              style={{ width: '700px' }}
            />
            <StyledButton>선택</StyledButton>
          </FlexContainerRow>
        </div>
        <FlexContainerRow
          style={{ position: 'fixed', top: '120px', right: '100px', zIndex: 1 }}
        >
          &nbsp;
        </FlexContainerRow>
      </Box>
    </Modal>
  )
}
