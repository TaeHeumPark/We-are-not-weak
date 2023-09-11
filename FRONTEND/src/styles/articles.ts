import styled from 'styled-components'

export const CustumDiv = styled.div`
  width: 80%;
  height: 90%;
  border-top: 4px solid #3b478f;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
`

// Emotion 스타일 컴포넌트
export const ArticleContainer = styled.div`
  margin: 50px 150px;
  min-height: 800px;
  border: 1px solid gray;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`

export const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ArticleTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid gray;
`

export const ArticleContent = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  min-height: 300px;
  padding: 20px;
  border: 1px solid #e0e0e0;
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 20px;
`
