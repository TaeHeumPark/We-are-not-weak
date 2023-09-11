import React, { useRef, ChangeEvent, useState } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import ArticleBar from './ArticleBar'
import { styled } from 'styled-components'
import StyledButton from '../styles/StyledButton'

type WriteProps = {
  // name: string
}

export const StyledForm = styled.form`
  width: 80%;
  height: 90%;
  border-top: 4px solid #3b478f;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
`

export const StyledTitleInput = styled.input`
  width: 730px;
  height: 40px;
  border: 1px solid gray;
  margin-left: 30px;
`

export const StyledTextArea = styled.textarea`
  width: 80%;
  height: 70%;
  border: 1px solid gray;
  margin-left: 30px;
`

export const StyledFileInput = styled.input`
  display: none;
`

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 가운데 정렬을 위한 화면 높이 설정 */
`

export const SpacedDiv = styled.div`
  margin-top: 30px; /* ArticleBar와 30px 간격 */
`

export const Write: React.FC<WriteProps> = ({}) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState<string>('')

  const handleButtonClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  /** 파일이 존재하고 파일이 업로드할 때 가장 최신것을 저장*/
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
    }
  }

  /** Title이  */
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <div>
      <NavbarLogin />
      {/* <ArticleBar name={name} /> */}
      <div>
        <input
          type="text"
          placeholder="제목을 입력해라"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <textarea
          style={{
            resize: 'none',
            width: '80%',
            borderRadius: '5px',
            border: '1px solid #ccc',
            padding: '5px',
          }}
          placeholder="Type your content here..."
        />
      </div>

      <StyledButton fontSize="13px" onClick={handleButtonClick}>
        파일 업로드
      </StyledButton>
      <input
        type="file"
        ref={fileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
