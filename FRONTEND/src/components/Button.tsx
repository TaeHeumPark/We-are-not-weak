import React from 'react'
import { Color, Size, Border } from '../model/custom'

interface ButtonProps {
  border?: Border
  color?: Color
  size?: Size
  text?: string
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  border = { radius: '0.625rem', borderColor: '#40BFFF' },
  color = { background: '#40BFFF', color: 'white' },
  text = '버튼',
  size = { width: '100px', height: '50px' },
  onClick = () => {},
}) => (
  <button
    style={{
      backgroundColor: color.background,
      color: color.color,
      width: size.width,
      height: size.height,
      borderRadius: border.radius,
      borderColor: border.borderColor,
      border: 'none',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    {text}
  </button>
)

export default Button
