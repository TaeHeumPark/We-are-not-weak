import styled from 'styled-components'

export const ProfileInput = styled.input`
  border: 1px solid var(--gray-300, #dee2e6);
  border-radius: 6px;
  background: var(--default-white, #fff);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`
const GridLayout = styled.div`
  max-width: 1280px;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 300px auto;
  gap: 20px;
  padding: 0 24px;
  margin: 50px auto 0;
`

const GridProfileArea = styled.div`
  display: grid;
  grid-template-rows: 350px auto;
  align-items: center; /* 가로축 가운데 정렬을 위해 추가 */
`

const GridInputArea = styled.div`
  display: flex;
  width: 480px;
  flex-direction: column;
  align-items: center; /* 가로축 가운데 정렬을 위해 수정 */
  gap: 6px;
`

const ProfileImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;

  > img {
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > h2 {
    width: 100%;
    text-align: center;
  }
`

const ProfileMenu = styled.ul`
  width: 100%;
  border-radius: 20px;
  border: 2px solid #ccc;
  padding: 5px;

  > li {
    border-bottom: 2px solid #ccc;
    padding: 5px;
    margin: 0px;

    > h3 {
      margin: 0px;
      padding: 0px;
    }

    &:last-child {
      border: 0;
    }
  }
`
const ProfileMenuWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: grid; /* Grid 컨테이너로 설정 */
  grid-template-columns: auto auto; /* 두 개의 자식 요소를 자동 크기로 배치 */
  gap: 6px; /* 컬럼 사이의 간격 설정 */
`