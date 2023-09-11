import React from 'react'

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => (
  <div
    style={{
      width: '100%',
      height: '220px',
      borderTop: '2px solid #828181',
      backgroundColor: '#EFEFEF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <p>© 2023 Company Name</p>
    <p>대전광역시 유성구 동서대로 98-39</p>
    <p>Email: info@yourcompany.com | Tel: 02-123-4567</p>
  </div>
)

export default Footer
