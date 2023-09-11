# 개발 환경 가이드

1. 개발 컨벤션

[Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)

[](https://nuli.navercorp.com/data/convention/NHN_Coding_Conventions_for_Markup_Languages.pdf)

1. Git 컨벤션
2. Jira 컨벤션

---

# 개발 환경 가이드

# 개발 컨벤션

네이버 Java 컨벤션 : https://naver.github.io/hackday-conventions-java/

# Git 컨벤션

> Commit 메시지 구조
> 

기본 적인 커밋 메시지 구조는 **`제목`,`본문`,`꼬리말`** 세가지 파트로 나누고, 각 파트는 빈줄을 두어 구분한다.

```
type : subject

body

footer

```

> Commit Type
> 
> 
> 타입은 태그와 제목으로 구성되고, 태그는 영어로 쓰되 첫 문자는 대문자로 한다.
> 

**`태그 : 제목`의 형태이며, `:`뒤에만 space가 있음에 유의한다.**

- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `docs` : 문서 수정
- `design` : CSS 등 사용자 UI 수정
- `comment` : 필요한 주석 추가 및 변경
- `style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `refactor` : 코드 리펙토링
- `test` : 테스트 코드, 리펙토링 테스트 코드 추가
- `chore` : 빌드 업무 수정, 패키지 매니저 수정 (gitignore 처럼 외부 사용자가 관심없는 파일, 빌드, 패키지 및 매니저와 같은 파일들)
- `init` : 초기 생성
- `rename` : 파일 혹은 폴더명을 수정하거나 옮기는 작업만 한 경우
- `remove` : 파일을 삭제하는 작업만 수행한 경우

> Subject
> 
> - 제목은 최대 50글자가 넘지 않도록 하고 마침표 및 특수기호는 사용하지 않는다.
> - 영문으로 표기하는 경우 동사(원형)를 가장 앞에 두고 첫 글자는 대문자로 표기한다.(과거 시제를 사용하지 않는다.)
> - 제목은 **개조식 구문**으로 작성한다. --> 완전한 서술형 문장이 아니라, 간결하고 요점적인 서술을 의미.

```
* Fixed --> Fix
* Added --> Add
* Modified --> Modify

```

> Body
> 

본문은 다음의 규칙을 지킨다.

- 본문은 한 줄 당 72자 내로 작성한다.
- 본문 내용은 양에 구애받지 않고 최대한 상세히 작성한다.
- 본문 내용은 어떻게 변경했는지 보다 무엇을 변경했는지 또는 왜 변경했는지를 설명한다.

> footer
> 

꼬리말은 다음의 규칙을 지킨다.

- 꼬리말은 `optional`이고 `이슈 트래커 ID`를 작성한다.
- 꼬리말은 `"유형: #이슈 번호"` 형식으로 사용한다.
- 여러 개의 이슈 번호를 적을 때는 `쉼표(,)`로 구분한다.
- 이슈 트래커 유형은 다음 중 하나를 사용한다.
    - `Fixes`: 이슈 수정 중 (아직 해결되지 않은 경우)
    - `Resolves`: 이슈를 해결했을 때 사용
    - `Ref`: 참고할 이슈가 있을 때 사용
    - `Related to`: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)
    - **`ex) Fixes: #45 Related to: #34, #23`**

> Commit 예시
> 

```
Feat: "회원 가입 기능 구현"

SMS, 이메일 중복확인 API 개발

Resolves: #123
Ref: #456
Related to: #48, #45

```

## Branch 명명 규칙 및 전략

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cbb7da87-1b39-429d-b9a7-42e9c68c2314/755657ef-06a6-4d6d-b999-e48ae7208bfe/Untitled.png)

Git-flow 전략 간단하게 살펴보기
Git-flow를 사용했을 때 작업을 어떻게 하는지 살펴보기 전에 먼저 Git-flow에 대해서 간단히 살펴보겠습니다.
Git-flow에는 5가지 종류의 브랜치가 존재합니다. 항상 유지되는 메인 브랜치들(master, develop)과 일정 기간 동안만 유지되는 보조 브랜치들(feature, release, hotfix)이 있습니다.

- master : 제품으로 출시될 수 있는 브랜치
- develop : 다음 출시 버전을 개발하는 브랜치
- feature : 기능을 개발하는 브랜치
- ~~release : 이번 출시 버전을 준비하는 브랜치~~
- ~~hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치~~

# Jira 컨벤션

## 스프린트

- 각 스프린트는 1주일을 기준으로 진행한다.
- 각 스프린트 기준으로 일인당 Point의 스토리 포인트가 부여된다.

## 이슈 등록

- 이슈 등록은 개인이 Jira Covention에 맞추어 등록한다.
- 이슈 등록 후 해당 이슈에 본인 파트의 팀원을 등록한다.

## 이슈 관리

- 최초 이슈를 할당받으면 담당자는 스토리 포인트를 부여한다.
- 또한 해당 이슈의 우선순위를 설정한다.
- 작업 들어가기 전 할 일 --> 진행 중 <br>
진행 완료하면 --> 완료 <br>
상태를 최신화한다.
- 설명란에 최대한 자세히 해당 이슈에 있어서 담당자가 작성한다.
- 모든 이슈 관리 문의는 댓글 기능을 통해 이뤄지며 SNS/전화는 지양한다.

## 작업 유형

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cbb7da87-1b39-429d-b9a7-42e9c68c2314/dfc154fe-534a-4c7c-b861-b56b3fbc26cf/Untitled.png)

### 에픽

- 큰 단위의 업무 (여러 User 스토리, Task 등 묶은 단위)
- 매주 월요일 스프린트를 들어가기 전에 생성할 Epic에 대해 이야기한다.
- 논의한 Epic을 기본으로 해당 Epic에 담당자를 지정하여 생성한다.
- 생성 Convention
    - Epic을 생성할 때 파트, 기능을 적어준다.
    - ex) [Backend] User, [Frontend] 페이지 개발

### 스토리

- 해당 Epic의 하위 단위 작업으로 직접적인 개발과 기능 구현을 기본으로 한다.
    - 최종 고객에게 가치를 제공하는 기능
- Tip) User Story의 크기는 sprint내에 완료 가능한 단위로 분할 필요
- 생성 Convention
    - ex) 로그인 기능
        - 로그인 기능 개발 (Epic이 [Backend] User일 경우)
        - UI/UX 구현 (Epic이 [Frontend] 목업 개발일 경우)

### 부작업

- Story, Task를 더 작은 단위로 나눈 업무
    - 즉, 모든 Sub-Task가 끝나야 해당 업무 종료
    - Sub-task를 사용하는 것은 Story를 이루기 위한 단계별 작성으로 선택상으로 지정한다.
    - ex) 사용자 관리(UI) 개발, 사용자 관리(Service) 개발
- 생성 Convention
    - ex) 자동 로그인 기능 구현
    - 작업에 직관적으로 알 수 있도록 작성
    - 작업을 진행하면서 해당 이슈를 분할하여 작성

### 작업

- 해당 스토리가 필요하기 위한 작업으로 일반적으로 기술적, 관리적 업무를 지칭한다.
    - 하지만 초기 스프린트에서 비개발적인 작업이 많고 해당 에픽의 내용에 있어서는 작업을 문서작업과 같은 작업을 작업 이슈로 관리한다.
- ex) User Story의 기술적, 관리적, 서류 작업
    - 설계, 서버 설치, 클라우드 도입 등
- 생성 Convention
    - 백엔드 : [BE | 요일] 작업 내용 명시
    - 프론트엔드 : [FE | 요일] 작업 내용 명시
    - 작업에 직관적으로 알 수 있도록 작성
