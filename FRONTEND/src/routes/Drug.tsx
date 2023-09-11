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

export const Drug = () => {
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

      <Title style={{ marginTop: '35px' }} delay="0.3s">
        당신은 마약에 대해 얼마나 알고 있으신가요?
      </Title>
      <Title style={{ marginBottom: '50px' }} delay="0.8s">
        마약에 대해 알려드릴게요
      </Title>
      <img
        src="/image/drugtitle.jpg"
        alt=""
        style={{ width: '100%', marginBottom: '50px', height: '80vh' }}
      />
      {/* <PageContainer> */}
      <Subtitle
        style={{ fontSize: '40px' }}
        ref={subtitleRef}
        shouldFadeIn={isVisible}
      >
        마약의 종류
      </Subtitle>
      <div style={{ backgroundColor: '#f7f9fc' }}>
        <CardsContainer style={{ margin: '0px 200px 0px 200px' }}>
          <LeftPictureCard
            imageSrc="/image/drug1.jpg"
            title="펜타닐"
            subtitle="펜타닐의 부작용 및 위험성"
            content={
              <div>
                <h3>호흡 억제</h3>
                <span>
                  펜타닐을 과도하게 복용하면 호흡이 억제될 수 있으며,
                  중독증상이나 과다복용으로 사망에 이르기도 합니다.
                </span>
                <h3>중독</h3>
                <span>
                  펜타닐은 아주 강력한 약물이기 때문에, 오용하거나 잘못된 용도로
                  사용할 경우 신체적으로나 정신적으로 중독되는 위험이 큽니다.
                </span>
                <h3>심각한 부작용</h3>
                <p>
                  사용자에 따라 펜타닐은 혼란, 혼수, 어지러움, 구토 등의 심각한
                  부작용을 일으킬 수 있습니다.
                </p>
              </div>
            }
          />
        </CardsContainer>
      </div>
      <CardsContainer style={{ margin: '0px 200px 0px 200px' }}>
        <RightPictureCard
          imageSrc="/image/drug2.jpg"
          title="엑스터시"
          subtitle="엑스터시의 부작용"
          content={
            <div>
              <h3>세로토닌 신드롬</h3>
              <span>
                MDMA는 뇌에서 세로토닌의 방출을 증가시킵니다. 과도한 복용이나
                다른 세로토닌 수준을 높이는 약물과 함께 복용할 경우, 위험하고
                때로는 치명적인 세로토닌 신드롬의 위험이 있습니다.
              </span>
              <h3>인지기능 저하</h3>
              <span>
                지속적인 MDMA 사용은 기억 및 학습 능력에 부정적인 영향을 줄 수
                있습니다.
              </span>
              <h3>물리적 위험</h3>
              <p>
                엑스터시는 체온 상승, 땀 흘림증, 두통, 구역질 및 기타 부작용을
                유발할 수 있습니다.
              </p>
              <h3>신경손상</h3>
              <p>
                MDMA의 장기적인 사용이 뇌의 세로토닌 생산 뉴런에 손상을 줄 수
                있습니다.
              </p>
            </div>
          }
        />
      </CardsContainer>
      <div style={{ backgroundColor: '#f7f9fc' }}>
        <CardsContainer style={{ margin: '0px 200px 0px 200px' }}>
          <LeftPictureCard
            imageSrc="/image/drug3.jpg"
            title="마리화나"
            subtitle="마리화나의 위험성과 부작용"
            content={
              <div>
                <h3>기억력 및 학습 능력 저하</h3>
                <span>
                  마리화나 사용은 기억력 및 학습 능력에 영향을 줄 수 있으며,
                  집중력이 떨어질 수 있습니다.
                </span>
                <h3>정신 건강 영향</h3>
                <span>
                  장기적인 사용이 정신 건강에 영향을 미칠 수 있으며, 불안,
                  우울증, 정신병 리스크가 증가할 수 있습니다.
                </span>
                <h3>호흡기 문제</h3>
                <p>
                  흡연을 통한 마리화나 섭취는 흡연으로 인한 폐 건강 문제를
                  야기할 수 있습니다.
                </p>
                <h3>동기와 에너지 감소</h3>
                <p>
                  일부 사용자는 마리화나 섭취 후 동기와 에너지 감소를 느낄 수
                  있습니다.
                </p>
              </div>
            }
          />
        </CardsContainer>
      </div>
      <CardsContainer style={{ margin: '0px 200px 0px 200px' }}>
        <RightPictureCard
          imageSrc="/image/drug4.jpg"
          title="필로폰"
          subtitle="필로폰의 위험성과 부작용"
          content={
            <div>
              <h3>중독성</h3>
              <span>
                메스암페타민은 강력한 중독성을 가지며, 사용자는 물리적 및 정신적
                중독에 빠질 수 있습니다.
              </span>
              <h3>신체 건강 문제</h3>
              <span>
                장기 사용 시 심혈관 및 호흡기계 문제, 체중 감소, 수면 부족, 암
                등과 관련된 위험이 증가할 수 있습니다.
              </span>
              <h3>정신 건강 문제</h3>
              <p>
                정신적으로 불안, 공황, 편집증 등의 증상이 나타날 수 있으며,
                불안, 우울, 헷갈림 등의 정신적인 증상도 나타날 수 있습니다.
              </p>
            </div>
          }
        />
      </CardsContainer>
      <div style={{ backgroundColor: '#f7f9fc' }}>
        <CardsContainer style={{ margin: '0px 200px 0px 200px' }}>
          <LeftPictureCard
            imageSrc="/image/drug5.jpg"
            title="헤로인"
            subtitle="헤로인의 위험성과 부작용"
            content={
              <div>
                <h3>신체 건강 문제</h3>
                <span>
                  헤로인은 강력한 중독성을 가지며, 신체 건강에 심각한 영향을
                  미칠 수 있습니다. 주사를 통해 사용할 경우 감염 및 각종 신체
                  건강 문제가 발생할 수 있습니다.
                </span>
                <h3>정신 건강 문제</h3>
                <span>
                  정신적으로 불안, 우울, 감정 변동 등을 유발할 수 있습니다.
                  헤로인 중독자들은 정서적인 안정을 찾기 위해 약물에 의존하기
                  쉽습니다.
                </span>
                <h3>사회적 문제</h3>
                <p>
                  헤로인 중독은 가족, 사회 관계, 직장 등을 파괴할 수 있으며,
                  범죄와 법적 문제를 유발할 수 있습니다.
                </p>
              </div>
            }
          />
        </CardsContainer>
      </div>
      <CardsContainer style={{ margin: '0px 200px 0px 200px' }}>
        <RightPictureCard
          imageSrc="/image/drug6.jpg"
          title="프로포폴"
          subtitle="프로포폴의 위험성과 부작용"
          content={
            <div>
              <h3>호흡 억제</h3>
              <span>
                과도한 양의 프로포폴 사용은 호흡 억제를 유발할 수 있어
                호흡기능을 위협할 수 있습니다.
              </span>
              <h3>혼수 상태</h3>
              <span>
                높은 농도의 프로포폴 사용은 혼수 상태로 이어질 수 있습니다.
              </span>
              <h3>경련</h3>
              <p>일부 환자에서 경련 발작을 유발할 수 있습니다.</p>
              <h3>선천성 포르피린 증후군</h3>
              <p>
                특정 유전적인 조건을 가진 환자들에게는 위험한 조건을 악화시킬 수
                있습니다.
              </p>
            </div>
          }
        />
        {/* <img
          src="/image/effect.jpg"
          alt=""
          style={{
            width: '100%',
            marginBottom: '50px',
            height: 'auto',
            marginTop: '150px',
          }}
        /> */}
      </CardsContainer>
      {/* </CardsContainer> */}

      {/* </PageContainer> */}
      <Footer />
    </>
  )
}
