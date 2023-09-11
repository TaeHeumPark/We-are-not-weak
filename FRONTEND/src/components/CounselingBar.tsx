import React from 'react'
import Bar from '@mui/material/AppBar'
import { Icon } from '@mui/material'
import styled from '@emotion/styled'

interface CounselingBarProps {
  title: string
  episodeCount: number
}

const StyledAppBar = styled(Bar)`
  {
    background-color: rgba(0, 0, 0, 0.5);
    color: #ff99a0;
    font-size: 1rem;
    font-weight: 800;
  }
`

const CounselingBar: React.FC<CounselingBarProps> = ({
  title,
  episodeCount,
}) => {
  return (
    <Bar position="static" color="primary">
      <Icon>
        <img
          src="./image/NoticeBell.png"
          alt="User profile"
          style={{ width: '40px', height: '40px' }}
        />
      </Icon>
      <div className="counseling-bar">
        <h2>
          {title} - {episodeCount}회차
        </h2>
      </div>
    </Bar>
  )
}

export default CounselingBar
