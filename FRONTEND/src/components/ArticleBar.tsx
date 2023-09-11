import React from 'react'

interface ArticleBarProps {
  name: string
}

const ArticleBar: React.FC<ArticleBarProps> = ({ name }) => (
  <div
    className="article bar"
    style={{
      width: '100%',
      height: '122px',
      borderTop: '3px solid #0081C2',
      borderBottom: '3px solid #0081C2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
    }}
  >
    <p
      className="article type"
      style={{
        fontSize: '50px',
        color: '#007BB8',
        paddingLeft: '50px',
      }}
    >
      {name}
    </p>
  </div>
)

export default ArticleBar
