import React, { ReactNode, MouseEventHandler } from 'react'
import styled from 'styled-components'

const PointerText = styled.span`
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  color: black;
`

interface PointerComponentProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLSpanElement>
}

// 그냥 text인데 포인터 들어간 text
export const PointerComponent: React.FC<PointerComponentProps> = ({
  children,
  onClick,
}) => {
  return <PointerText onClick={onClick}>{children}</PointerText>
}
