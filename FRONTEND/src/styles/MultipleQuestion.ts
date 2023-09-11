import styled from 'styled-components'

export const QuestionContainer = styled.div`
  margin-bottom: 20px;
`

export const QuestionText = styled.h2`
  margin-bottom: 10px;
`

export const ChoicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
`

export const ChoiceLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`

export const ChoiceInput = styled.input`
  margin-right: 5px;
`
