import React from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { ButtonContainer } from '../styles/CounselButton'

interface ButtonProps {
  onClick: () => void
}

const cameraButton: React.FC<ButtonProps> = ({ onClick }) => (
  <ButtonContainer onClick={onClick}>
    <CameraAltIcon />
  </ButtonContainer>
)

export default cameraButton
