import React from 'react'

import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import NavbarLogin from '../components/NavbarLogin'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
`

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
`

const Description = styled.p`
  font-size: 18px;
  text-align: left;
  margin-bottom: 20px;
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

export const SelfHelpGroup = () => {
  const navigate = useNavigate()
  const openInfo = () =>
    (window.location.href =
      'https://ko.wikipedia.org/wiki/%EC%9D%B8%EC%B9%B4%EC%9A%B4%ED%84%B0_%EA%B7%B8%EB%A3%B9')
  return (
    <>
      <NavbarLogin />

      <Container>
        <h1>자조모임에 대해 알아보세요</h1>
        <Description>
          자조모임은 일반적으로 사람들이 비슷한 경험이나 문제를 공유하고
          서로에게 지원을 제공하며 함께 성장하고 치유하는 그룹 활동입니다. 이
          활동은 많은 사람들이 어려운 상황이나 감정적인 어려움, 심리적인 부담을
          나누고 해결하기 위해 모이는 곳으로, 그룹의 일원들은 각자의 경험과
          지식을 통해 서로에게 도움을 주고 받습니다.
          <Title>자조모임의 주요 특징</Title>
          <h3>공감과 이해의 공간</h3>
          <p>
            자조모임은 비슷한 경험이나 문제를 가진 사람들이 모여서 서로의
            이야기를 듣고 공감해줄 수 있는 안전한 공간을 제공합니다. 이는
            참여자들에게 심리적 안정감을 줄 수 있습니다.
          </p>
          <h3>정보 공유와 경험 공유</h3>
          <p>
            자조모임은 각 참여자들의 고유한 경험과 지식을 통해 해결책을 찾기
            위한 플랫폼을 제공합니다. 이는 단순히 해결책을 얻는 것 뿐만 아니라
            다양한 관점에서 문제를 바라볼 수 있도록 도와줍니다.
          </p>
          <h3>감정적인 지원과 치유</h3>
          <p>
            자조모임은 멘탈 힐링과 정서적 지원을 받을 수 있는 장소입니다. 다른
            사람들의 지원을 받으며 스트레스나 우울과 같은 감정적 어려움을 함께
            극복할 수 있습니다
          </p>
          <h3>사회적 연결성 강화</h3>
          <p>
            자조모임은 사회적인 연결성을 강화하고 새로운 인간 관계를 형성하는데
            도움을 줍니다. 같은 문제를 가진 사람들끼리 모여 함께 시간을 보내며
            친밀한 관계를 형성할 수 있습니다.
          </p>
          <h3>자아 발견과 성장</h3>
          <p>
            자조모임에 참여하면서 자신의 강점이나 자아를 발견하고 성장할 수 있는
            기회를 가질 수 있습니다. 다른 사람들과의 상호작용을 통해 자신의
            생각을 정립하고 발전시킬 수 있습니다.
          </p>
          자조모임은 다양한 주제나 문제에 따라 형성될 수 있으며, 예를 들어
          우울증, 뇌병변, 가족 문제, 중독 등 다양한 주제로 구성된 자조모임이
          있을 수 있습니다. 이러한 모임은 그룹의 목적과 참여자들의 필요에 따라
          다양한 형태로 운영됩니다.
        </Description>
        <Button onClick={openInfo}>더 알아보기</Button>
      </Container>
    </>
  )
}
