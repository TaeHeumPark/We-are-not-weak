# 우린 약하지 않아
마약 중독자들을 위한 온라인 자조모임 서비스<br>
<br>
삼성 청년 SW 아카데미 공통 프로젝트<br>
2023. 07. 10. ~ 2023. 08. 18.
<br>
<br>
<br>
## 서비스 배경
<hr/>
우리나라는 더이상 마약청정국이 아닙니다.
또한 점점 늘어가는 마약사범과 마약 복용 상태로 추가적인 범죄가 늘어가는 추세입니다.
마약사범을 대면으로 치료하길 꺼려하는 문제점과 마약을 접한 이들에게 상담이라는 진입장벽을 낮춰주고자 화상 채팅으로 진행 되는 온라인 마약 자조모임를 기획하게 되었습니다.
<br>
<br>
<br>

## 서비스 이름 및 설명
<hr/>
"우린 약하지 않아"는 내면으로 힘들어하고 있을 마약 중독자들에게 "당신은 약하지 않습니다." 라는 느낌을 주고, 더이상 약을 복용하지 않는다는 이중적 의미를 담고 있기 때문에 이러한 뜻을 서비스 이름에 담았습니다.
<br>
<br>

## 개발 환경 및 기술 스택
<hr/>

### FE
- HTML
- CSS
- JavaScript
- React 18.2.0
- Recoil 0.7.7
### BE
- JDK 17.0.7
- Spring boot 3.0.2
- MySQL 8.0.33, MySQL workbench 8.0.33
-  Redis 7.0.12
### CI/CD
- Nginx 1.18.0
- Jenkins
- AWS EC2
- AWS S3
### 버전/이슈 관리
- Jira
- GitLab
### TOOL
- Postman
- Figma
### 협업
- Cisco Webex Mettings
- Mattermost
- Notion
### IDE
- Visual Studio Code
- IntelliJ
<br>
<br>

## 주요 기능
<hr/>

## 1. 회원가입
- 일반 회원과 상담사 회원을 구분합니다.
- 이메일 인증 코드를 Redis에 저장 후 비교합니다.
<br>

![회원가입](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/470d8498-bd68-4fde-84b8-67d5f67c2f90)
<br>
<br>

## 2. 로그인
- jwt 로그인으로 구현하였습니다.
<br>

![일반로그인](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/9c1e5c55-64ad-4321-b628-db0f7547f189)
![ㅁ](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/ede655c7-5608-4a33-a791-b451f82812bc)
<br>
<br>

## 3. 메인 화면
- 깔끔한 디자인과 서비스가 한눈에 들어오도록 설계했습니다.
<br>

![메인1](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/4adfc798-2830-4fb0-9615-b73f50edc305)
![메인2](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/e16c2344-fe1c-45d6-a5b6-c0f8925d115c)
<br>
<br>

## 4. 상담 리스트
- 현재 모집 중인 상담 목록을 보여줍니다.
- 상담사 아이디로 로그인시 상담 개설 버튼이 활성화 됩니다.
- 실시간 검색이 가능하도록 구현했습니다.
<br>

![상담목록조회](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/c2cb5197-31b9-45d7-bcac-aea750caeb54)
<br>
<br>

## 5. 상담 개설
- 상담사는 필요한 정보를 입력 후 상담을 개설할 수 있습니다.
<br>

![상담 개설하기](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/fe2c9049-fd7c-4499-8331-9f940da2a720)
<br>
<br>

## 6. 상담 상세 정보
- 상담의 상세 정보를 열람 후 내담자는 결제를 진행할 수 있습니다.
- 결제 후에는 각 커리큘럼(주차별)마다 상담 입장하기 버튼이 활성화 됩니다.
<br>

![상담디테일](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/c3266639-73d0-49d0-9b9a-429f2d984af6)
![상담결제](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/9c60e382-a037-4646-b87a-37671781508a)
![상담디테일(입장)](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/f7ae21e8-7715-4201-90e5-d3e3830313ca)
<br>
<br>

## 7. 실시간 상담
- OpenVidu를 사용해 WebRTC를 구현했습니다.
- SessionId는 해당 커리큘럼의 id로 관리합니다.
상담사는 실시간으로 원하는 내담자의 상담일지를 기록할 수 있습니다. 상담일지는 갑작스런 버그, 네트워크 문제 등을 예방하기 위해 실시간으로 localStorage에 저장 되며, 상담이 종료 되는 시점에 한 번에 DB에 저장 됩니다.
- 내담자는 상담이 끝날 때 해당 회차의 소감문을 기록할 수 있습니다.
<br>

![상담 대기방](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/148d8a24-7915-4b4a-9a4c-952d9d599488)
![상담 진행](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/051e64da-71c9-4f28-b931-250af7b22996)
![소감문](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/5103a418-a251-40d1-b25a-3b67f1c2c667)

<br>
<br>
<br>

## 프로젝트 산출물

- [개발환경가이드(컨벤션)](https://github.com/TaeHeumPark/We-are-not-weak/blob/main/exec/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD%EA%B0%80%EC%9D%B4%EB%93%9C.md)
- [포팅메뉴얼](https://github.com/TaeHeumPark/We-are-not-weak/blob/main/exec/%ED%8F%AC%ED%8C%85%EB%A9%94%EB%89%B4%EC%96%BC.md)
- [요구사항 정의서(기능 명세서)](https://www.notion.so/ac9210c5f06a4b089fe63c2a441524d9?pvs=4)<br>
- ERD
![ERD](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/c3b2d67b-fb90-4762-9047-0f7434bf95d0)
