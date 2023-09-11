import React from 'react'
import { LeftPictureCard, RightPictureCard } from '../components/PictureCard'
import NavbarLogin from '../components/NavbarLogin'
import { styled, keyframes } from 'styled-components'
import Footer from '../components/Footer'

// Import the font.css file
import '../fonts/font.css'

type TitleProps = {
  delay?: string
}

const PageContainer = styled.div`
  padding: 50px;
  background-color: #fafafa;
  min-height: 100vh;
  font-family: 'Arial';
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Title = styled.h1<TitleProps>`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 30px;
  opacity: 0;
  animation: ${fadeIn} 2s forwards;
  animation-delay: ${(props) => props.delay || '0s'};
`

const Subtitle = styled.h2<{ shouldFadeIn: boolean }>`
  font-size: 1.8em;
  text-align: center;
  margin-bottom: 50px;
  opacity: ${(props) => (props.shouldFadeIn ? '1' : '0')};
  transition: opacity 2s;
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`

export const Service = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const subtitleRef = React.useRef<HTMLHeadingElement | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1, // 10%가 보이면 알림을 받습니다.
      },
    )

    if (subtitleRef.current) {
      observer.observe(subtitleRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <>
      <NavbarLogin />
      <PageContainer>
        <Title style={{ marginTop: '35px' }} delay="0.3s">
          '우린 약하지 않아' 에서
        </Title>
        <Title style={{ marginBottom: '50px' }} delay="0.8s">
          단약 의지를 강화해보세요
        </Title>
        <img
          src="https://modo-phinf.pstatic.net/20211205_216/1638700998315KFpFr_PNG/mosaSSrNq0.png?type=w1100"
          alt=""
          style={{ width: '100%', marginBottom: '50px' }}
        />
        <Subtitle ref={subtitleRef} shouldFadeIn={isVisible}>
          우리의 핵심 기능들을 만나보세요.
        </Subtitle>
        <CardsContainer style={{ margin: '0px 200px 0px 200px' }}>
          <LeftPictureCard
            imageSrc="/image/group.jpg"
            title="집단 상담"
            subtitle=""
            content="동료 중독자들과 함께하는 집단상담을 통해 서로의 경험을 공유하고, 회복을 위한 지원과 격려를 받을 수 있습니다."
          />
          <RightPictureCard
            imageSrc="/image/expert.jpg"
            title="전문가 지도"
            subtitle=""
            content="경험 많은 상담사와 전문가들이 상담 프로세스를 안내합니다. 개인의 상황에 맞는 조언과 지원을 받을 수 있습니다."
          />
          <LeftPictureCard
            imageSrc="/image/accessibility.jpg"
            title="편리한 접근성"
            subtitle=""
            content="언제 어디서나 온라인으로 상담 서비스를 이용할 수 있습니다. 회복의 여정을 시작하려는 당신을 위해 항상 열려 있습니다."
          />
          <RightPictureCard
            imageSrc="/image/secret.jpg"
            title="비밀 보장"
            subtitle=""
            content="모든 이야기와 정보는 엄격히 비밀로 처리됩니다. 자유롭고 솔직하게 자신의 이야기를 나눌 수 있습니다."
          />
          {/* <LeftPictureCard
            imageSrc="/image/dog.png"
            title="서비스 3"
            subtitle="서비스 3 설명"
            content="이곳에는 서비스의 상세 설명이 들어갑니다."
          /> */}
        </CardsContainer>
        {/* <div style={{ height: '800px' }}>
          <h1>서비스 이용 방법, 서비스 스크린샷 찍기</h1>
        </div> */}
      </PageContainer>
      <Footer />
    </>
  )
}
