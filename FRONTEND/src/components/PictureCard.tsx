import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface CardProps {
  imageSrc: string
  title: string
  subtitle: string
  content: ReactNode
  onCardClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const CardContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  padding: 37px;
  margin-bottom: 30px;
  border-radius: 15px;
  background-color: #f2f2f2;
  box-shadow: -10px 10px 15px rgba(0, 0, 0, 0.1);
`

const ImageContainer = styled.div`
  width: 45%;
  img {
    width: 250px;
    height: 250px;
    border-radius: 8px;
    object-fit: fill;
  }
`

const TextContainer = styled.div`
  white-space: pre-line;
  background-color: white;
  padding: 20px;
  border-radius: 10%;
  width: 45%;
  h2 {
    margin-bottom: 15px;
  }

  h3 {
    margin-bottom: 35px;
    color: gray;
  }

  p {
    margin-top: 8px;
  }
`

export const LeftPictureCard: React.FC<CardProps> = ({
  imageSrc,
  title,
  subtitle,
  content,
  onCardClick,
}) => {
  return (
    <CardContainer onClick={onCardClick}>
      <ImageContainer>
        <img src={imageSrc} alt="카드 이미지" />
      </ImageContainer>
      <TextContainer>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>{content}</p>
      </TextContainer>
    </CardContainer>
  )
}

export const RightPictureCard: React.FC<CardProps> = ({
  imageSrc,
  title,
  subtitle,
  content,
}) => {
  return (
    <CardContainer>
      <TextContainer>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>{content}</p>
        {/* <p
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
        /> */}
      </TextContainer>
      <ImageContainer>
        <img src={imageSrc} alt="카드 이미지" />
      </ImageContainer>
    </CardContainer>
  )
}
