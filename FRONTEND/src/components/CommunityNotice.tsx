import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NoticeBtn = styled.button`
  background-color: #80d4ff;
  width: 47.4rem;
  padding: 0.5rem 1rem;
  height: 5.5625rem;
  border-radius: 0.1875rem;
  color: white;
  border: 1px solid white;
  font-size: 30px;
  font-weight: bold;
  font-family: Apple;

  text-shadow:
    -1px -1px 0 #0098e6,
    /* 왼쪽 상단 */ 1px -1px 0 #0098e6,
    /* 오른쪽 상단 */ -1px 1px 0 #0098e6,
    /* 왼쪽 하단 */ 1px 1px 0 #0098e6; /* 오른쪽 하단 */
  cursor: pointer;
`

export const FreeBtn = styled.button`
  background-color: rgba(63, 137, 176, 0.7);
  width: 47.4rem;
  padding: 0.5rem 1rem;
  height: 5.5625rem;
  border-radius: 0.1875rem;
  color: gray;
  border: 1px solid white;
  font-size: 30px;
  font-weight: bold;
  font-family: Apple;

  cursor: pointer;
`

export const CommunityTitle = styled.p`
  color: white;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Set the height to 100% to fill the CommunityBackground vertically */
  margin: 0; /* Remove any default margin to avoid extra spacing */
  // text-shadow: -1px -1px 0 #0098e6;
`

export const CommunityBackground = styled.div`
  background-image: url('./image/space.jpg');

  height: 25.125rem;
  border-radius: 0.375rem;
  background-size: cover;
  position: relative; /* Add relative positioning */
`

export const Bar = styled.div`
  /* The Bar doesn't need any styling changes for this layout */
  background-color: rgba(63, 137, 176, 0.7);
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  position: absolute; /* Position the Bar relative to CommunityBackground */
  bottom: 0; /* Position the Bar at the bottom */
  width: 100%; /* Make sure the Bar covers the entire width of the CommunityBackground */
`

export const ButtonsContainer = styled.div`
  /* This container will hold the buttons and arrange them side by side */
  display: flex;
`

export const CommunityNotice = () => {
  return (
    <div>
      <CommunityBackground>
        <CommunityTitle>공지사항</CommunityTitle>
        <Bar>
          <ButtonsContainer>
            <Link to="/notice">
              <NoticeBtn>공지사항</NoticeBtn>
            </Link>
            <Link to="/qna">
              <FreeBtn>QnA</FreeBtn>
            </Link>
          </ButtonsContainer>
        </Bar>
      </CommunityBackground>
    </div>
  )
}
