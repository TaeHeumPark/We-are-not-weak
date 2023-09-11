import { useState } from 'react'

export function useInput(initialValue: string | number) {
  const [inputValue, setInputValue] = useState(initialValue)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return { inputValue, handleInputChange, setInputValue }
}
