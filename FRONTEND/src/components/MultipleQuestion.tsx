import React, { useState } from 'react'
import {
  QuestionContainer,
  QuestionText,
  ChoicesContainer,
  ChoiceLabel,
  ChoiceInput,
} from '../styles/MultipleQuestion'

interface MultipleQuestionProps {
  question: string
}

const MultipleQuestion: React.FC<MultipleQuestionProps> = ({ question }) => {
  const choices = [
    '전혀 그렇지 않다',
    '그렇지 않다',
    '보통이다',
    '그렇다',
    '매우 그렇다',
    '잘 모르겠다',
  ]
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    null,
  )

  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoiceIndex(Number(event.target.value))
  }

  return (
    <QuestionContainer>
      <QuestionText>{question}</QuestionText>
      <ChoicesContainer>
        {choices.map((choice, index) => (
          <ChoiceLabel key={index}>
            <ChoiceInput
              type="radio"
              id={`choice-${index}`}
              name="choice"
              value={index}
              checked={selectedChoiceIndex === index}
              onChange={handleChoiceChange}
            />
            <label htmlFor={`choice-${index}`}>{choice}</label>
          </ChoiceLabel>
        ))}
      </ChoicesContainer>
      <p>
        선택한 답변: {selectedChoiceIndex !== null ? selectedChoiceIndex : ''}
      </p>
    </QuestionContainer>
  )
}

export default MultipleQuestion
