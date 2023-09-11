import React from 'react'
import MicIcon from '@mui/icons-material/Mic'
import { ButtonContainer } from '../styles/CounselButton'

interface ButtonProps {
  onClick: () => void
}

const micButton: React.FC<ButtonProps> = ({ onClick }) => (
  <ButtonContainer onClick={onClick}>
    <MicIcon />
  </ButtonContainer>
)

export default micButton
