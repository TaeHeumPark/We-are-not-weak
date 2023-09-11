import React, { ChangeEvent } from 'react'

type InputProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  width?: string
  type?: 'text' | 'password'
  maxLength?: number // 최대 글자 수 제한을 위한 속성 추가
  marginBottom?: string
  padding?: string
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  width,
  type = 'text',
  maxLength = 255, // 최대 글자 수 제한의 기본값 15로 설정
  padding = '7px',
  marginBottom = '20px',
}) => {
  const inputStyle: React.CSSProperties = {
    borderBottom: '1px solid black',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    outline: 'none',
    padding: padding,
    width: width || '550px',
    marginBottom: marginBottom,
    fontSize: '18px',
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={inputStyle}
      maxLength={maxLength} // 최대 글자 수 제한을 input 요소에 전달
    />
  )
}

export default Input
