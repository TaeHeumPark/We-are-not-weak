import React, { useState } from 'react'
import Button from './Button'
import styles from './curriculum.module.css'
// type InputProps = {
//   value: string
//   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//   placeHolder: string
// }

export const CurriculumBox = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = () => {
    alert(inputValue)
    setInputValue('')
  }

  return (
    <div className={`${styles.div}`}>
      <input
        className={`${styles.border}`}
        value={inputValue}
        onChange={handleChange}
        placeholder="커리큘럼을 입력하세요"
      />
      <Button
        border={{ radius: '0.625rem', borderColor: '#40BFFF' }}
        size={{ width: '100px', height: '100px' }}
        color={{ background: '#40BFFF', color: 'white' }}
        text="버튼"
        onClick={handleSubmit}
      />
    </div>
  )
}
