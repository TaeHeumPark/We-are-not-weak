# [포팅 메뉴얼]

# 1. 프로젝트 기술 스택, 사용 툴

### Backend

- JDK 17.0.7
- Spring boot 3.0.2
- MySQL 8.0.33, MySQL workbench 8.0.33
- Nginx 1.18.0
- Jenkins
- AWS EC2
- AWS S3
- Redis 7.0.12

### Frontend

- React 18.2.0
- Typesciprt 4.9.5
- Recoil 0.7.7
- Node.js 18.17.1

# 2. 개발 환경 setting

### 2-1. Backend

- **ec2 접속**
- SSH (연결타입 - key 발급받음)
    
    - Host Name: [i9b209.p.ssafy.io](http://i9b209.p.ssafy.io) ( Ip주소도 입력하기! ) port :22 
    - 발급 받은 key입력
    
    connection → ssh → auth → credentials→private key등록 puTTy Private key files(.ppk) ⇒ ppk로 변환해야함!(open눌리면안댕)
    
    login as : ubuntu 치기!
    

- **DB setting**
    1. **mysql 설치하기**
    
    ```bash
    sudo apt-get update
    sudo apt-get install mysql-server
    
    //mysql 접속
    sudo mysql -u root //초기에는 root로 -p없이(password 없이) 로그인
    
    -u : user , root: id
    ```
    
    1. **mysql 접속 후**
    
    ```bash
    //사용할 database 만들기
    create database cartel;
    
    //database 만들어 졌는지 확인하기
    show databases; 
    ```
    
    1. **사용할 user 생성하기**
    
    ```bash
    //db바꾸기
    use mysql;
    
    //사용자에게 권한 주기 '%'->모든 권한 주기
    create user '사용자 이름'@'%' identified by '비밀번호'; 
    // 우리가 쓸거 적는거임(워크벤치와 서버에 들어올 수 있는 권한 주는과정!)
    grant all on 'db이름'.* to '권한 줄 사용자 이름'@'%';  
    
    //권한 잘 주어졌는지 확인
    show grants for 'cartel'@'%';
    ```
    
    1. **workbench**
    - **로컬 workbench에서 ec2 DB에 접속하기 위해 추가적으로 설정해줘야 하는 부분**
    → 127.0.0.1로 설정 되어있는 bind-address값을 0.0.0.0으로 수정해서 외부 접속 허용해준다.(i 눌러서 수정해주기→ ctrl+c (insert 종료) → :wq+enter (저장))
    
    ```bash
    sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
    
    // sudo vi 이 파일을 수정하고 싶다!
    ```
    
    1. `해킹 위험 때문에 포트를 변경하기`
    
    ```bash
    sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
    # 치고나서 글이 주루루루 나오는데 거기에 포트번호 바꾸는 곳이 있음
    # 거기서 포트번호 바꿈!!
    
    #해당 설정 파일로 가서 포트번호를 바꾸기 - 서버에도 6033포트를 쓰겟다고 알려주는 과정
    sudo ufw allow 6033 # 바꿀 포트 허용
    
    #껐다 켜기 (파일을 껐다 켜야 수정이 반영됨)
    sudo service mysql stop
    sudo service mysql start
    
    # 서버 db 들어가는 사진!
    ```
    
    ![서버 db 들어가는 사진](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/85727586-34ee-4ec5-9f75-529082da39fd)
    

### 2-2. Frontend

- 필수 라이브러리 설치

```jsx
cd frontend
npm i
npm start
```

- 환경 변수 설정
    - 프로젝트 루트 디렉토리에 .env파일 생성 후 아래 코드 입력 (axios 보낼 때 cors에러 해결을 위해)

```jsx
REACT_APP_BASE_URL=https://i9b209.p.ssafy.io/api/
```

# 3. Openvidu 설치하기

- openvidu docs
    
    [On premises - OpenVidu Docs](https://docs.openvidu.io/en/stable/deployment/ce/on-premises/)
    
- **EC2에 openvidu 설치하기**
openvidu 설치 전에 nginx 포트랑 겹침/ openvidu 설치후 nginx 설치하기 !!

왜냐하면 openvidu와 ngnix포트가 겹치기 때문에 포트 겹쳐서 오픈비두 실행 안됨!!

```bash
sudo su
cd /opt # opt파일로 들어간다

# /opt 위치에 openvidu platfrom 설치!
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash

# openvidu 설치 경로로 이동
cd openvidu
# .env 파일 수정
vi .env
# vim - 처음부터 파일 만들때 vi - 수정할때

## 수정할 부분!
# (i): 수정하기 (i눌려주기)
# DOMAIN_OR_PUBLIC_IP= 서버도메인 (http없는 딱 도메인만)
# OPENVIDU_SECRET= 사용할 비밀번호 (backend openvidu 실행시 필요)
# CERTIFICATE_TYPE=letsencrypt //인증서 받았으면 letsencrypt로 수정해주기 - 인증서받앗단 의미
# LETSENCRYPT_EMAIL=user@example.com //이메일 작성 - 아무 이메일
# (ctrl+c): 작성완료
# (:wq): 저장, 나가기

## 일단 처음에는 80,443 포트 쓰고 ngninx 설치할때 port번호 수정! 건드리면안됨 처음엔
# HTTP_PORT=80
# HTTPS_PORT=443```bash

./openvidu start

## 실행 성공하면 나오는 openvidu 서버에 들어가기!
```

# 4. 배포 환경 Setting

![배포 환경 Setting](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/71812bda-7e18-42ed-916e-84fd55b9fcd5)

- **EC2에 Docker 설치하기**
    1. docker 설치
    
    ```bash
    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg
    
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    
    echo \
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/nul
    ```
    
    1. docker engine과  plugin 설치
    
    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    sudo apt install docker-compose
    
    #정상 설치 되엇는지 확인
    sudo docker -v
    sudo docker compose version
    ```
    

- **Jenkins 설치하기**

> docker-compose를 사용해서 jenkins container를 실행시키기
> 
1. jenkins container를 실행 시킬 docker-compose 만들기

```bash
sudo vim docker-compose.yml

## 아래 작성 된 사항은 jenkins 기본이미지로 jdk 11버전을 지원해주기 때문에jdk 17이상을 설치 해야 한다면 
 ## —> image: jenkins/jenkins:jdk17 이렇게 수정해 주면 됨
## jenkins 기본 포트는 8080인데 9090포트 사용하도록 지정해줌

# (i) : docker - compose 파일에 필요한 스펙을 작성 // 아래 캡쳐 화면 작성하기
# (ctrl+c) : 작성 완료
# (:wq) : 저장, 나오기
```

![Jenkins 설치하기](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/104b5478-6859-4a7d-91ef-0aedc996f721)

```bash
sudo docker-compose up -d

##정상적으로 jenkins container가 실행 되고 있는지 확인
sudo docker ps
##정상적으로 실행 되고 있지 않다면 해당 container가 어떤 상태인지 확인
sudo docker ps -a
```

- jenkins 컨테이너 내부에 접속해서 docker 설치

```bash
sudo docker exec -it jenkins bin/bash

## root~~ 나오면
## jenkins 컨테이너 내부에 접속 완료

##docker 설치
apt-get update
apt-get install ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update

```

- jenkins, gitlab → spring boot 배포하기

> jenkins : http://도메인:9090포트로 접속
> 

### 1. 설치 참고 파일 보면서 Jenkins 세팅하기!!!

jenkins 계정

tkadpahfrnspzkfmxpf  (삼에몰구네카르텔)
dudehdrudehxoals(영동경도태민)209

- jenkins project 생성

![jenkins project 생성](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/ceb25ed7-7fd9-429f-9e91-0ec83c5c933c)

![jenkins project 생성 결과](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/6740b833-7650-4573-85dd-efb0f2604ed1)

- webhook 생성

![webhook 생성](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/0a869bac-69a8-4849-a5e1-e93d0bbf11a4)

### 2. Jenkins pipeline SCM 작성하기

- Jenkinsfile : pipeline 작성
- spring boot 폴더에 Jenkinsfile 만들어서 pipeline작성하기
1. Springboot build 
- .jar 파일 생성!!
2. Docker image build
- docker 이미지 생성
3. Deploy 배포!

```java
pipeline {
    agent any

    stages {
        stage('Springboot build') {
            steps {
                dir('BACKEND'){
                    sh '''
                    echo 'springboot build'
                    chmod +x gradlew 
                    ./gradlew clean build //스프링 부트 빌드, .jar파일 생성
                    '''
                }
            }
        }
        stage('Dockerimage build') {
            steps {
                dir('BACKEND'){
                    sh '''
                    echo 'Dockerimage build'
                    docker build -t docker-springboot:0.0.1 .   //도커 이미지파일 빌드 !끝에 . 붙이기
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                dir('BACKEND'){
                    sh '''
                    echo 'Deploy' //배포
												// 스프링 구동

										//최초 처음에 터미널에서 run한번 해줘야해 그 다음부터는 빌드할때마다 자동으로 멈추고 재실행 반복해줌 
										//docker run -d -p 8080:8080 --name springboot docker-springboot:0.0.1

	                  docker stop springboot
                    docker rm springboot
                    docker run -d -p 8080:8080 --name springboot docker-springboot:0.0.1
                    '''
                }
            }
        }
    }
}
```

- Docker file 작성
- spring boot 폴더에 Dockerfile 만들기

```java
FROM openjdk:17-jdk-slim //본인 jdk로 설정!
VOLUME /tmp
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

- pipeline설정 (연결 깃, Jenkinsfile 경로 설정 해주기)
    
    - 젠킨스 계정 → 구성 → pipeline
    지워진 부분 - 1. 연결 깃 주소 2. 본인 이메일 
    
    ![pipeline설정 (연결 깃, Jenkinsfile 경로 설정 해주기)](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/b78c28e0-cfd6-4ae8-8076-d210fe10c841)
    
    - 파일 구성(Jenkinsfile, Dockerfile 위치!)
        
       ![파일 구성(Jenkinsfile, Dockerfile 위치)](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/06d7829c-4878-47b4-b406-5e97ce1a53c5)
        
    
    - 초록색으로 뜨면 성공
    
    ![초록색으로 뜨면 성공](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/19475708-a1a5-4948-8637-e441677ef73e)
    
    ![application properties 파일 서버에 올려주기](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/26e19f93-fb93-4ef3-adb1-2252cd8b8a07) 파일 서버에 올려주기
    
- **nginx 설치 & SSL 인증서**

```bash
#nginx 설치
sudo apt install nginx

#nginx 상태 확인
sudo systemctl status nginx

#let's Encrypt설치
sudo apt-get install letsencrypt

#cerbot 설치
sudo apt-get install certbot python3-certbot-nginx

#certbot동작
sudo certbot --nginx

#방화벽 설정
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

```

```bash
#nginx 환경설정
sudo vim /etc/nginx/sitex-available/nginx.conf
```

```bash
#sites-enabled에 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled
```

# 5. Redis

- 회원가입, 비밀번호 찾기 이메일로 인증 번호 전송시에 key-value 값으로 데이터 관리

```bash
# redis 설치

sudo apt update
sudo apt install redis-server

# conf파일에서 포트 번호 변경해주기
sudo vi /etc/redis/redis.conf
```

# 6. AWS S3

1. S3 Storage Service 진입
2. Bucket 만들기
    
    ![Bucket 만들기](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/baf5da6d-9a3d-488e-9c20-25c67665f923)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cbb7da87-1b39-429d-b9a7-42e9c68c2314/a0617496-1434-4298-ae8c-fbdd0cc9723c/Untitled.png)
    
3. Bucket에 File 업로드
    
   ![Bucket에 File 업로드](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/ef31be38-03c8-493c-840b-3f00c7141600)
    
4. Bucket과 객체의 Access 권한 설정
    
    **주의사항 :** Public Access 차단을 비활성화 한 상태에서는 리소스의 URL을 안다면 누근든지 버킷의 리소스에 액세스가 가능하게 된다.
    
    **이로 인해, AWS로 부터 과도한 과금이 청구 될 수 있으니, 시험을 완료한 후에는 반드시 다시 활성화를 해놓도록 한다.**
    
    ![Bucket과 객체의 Access 권한 설정](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/39a7f243-c230-4f2a-ac38-3d72bb7cd6ef)
    
    ### 스프링 연동하기
    
    - build.gradle에 의존성 추가
        
        ```java
        implementation 'org.springframework.cloud:spring-cloud-starter-aws:2.2.6.RELEASE'
        ```
        
    - application.properties 설정 정보 추가
        
        ```java
        # aws S3
        cloud.aws.s3.bucket=cartel-img // 사용할 버킷 이름
        cloud.aws.credentials.access-key= <발급받은 accessKey>
        cloud.aws.credentials.secret-key= <발급받은 secretKey>
        cloud.aws.region.static=ap-northeast-2 // 내 리전 고정
        cloud.aws.region.auto=false // 리전 자동 설정 X
        cloud.aws.stack.auto=false // ec2에서 spring cloud 프로젝트 실행되지 않게 설정
        ```
        
    - 스프링 설정 추가
        - S3Config.java
            
            ```java
            @Configuration
            public class S3Config {
               @Value("${cloud.aws.credentials.access-key}")
               private String accessKey;
               @Value("${cloud.aws.credentials.secret-key}")
               private String secretKey;
               @Value("${cloud.aws.region.static}")
               private String region;
            
               @Bean
               public AmazonS3Client amazonS3Client() {
                  BasicAWSCredentialsawsCredentials= new BasicAWSCredentials(accessKey, secretKey);
                  return (AmazonS3Client)AmazonS3ClientBuilder.standard()
                     .withRegion(region)
                     .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                     .build();
               }
            }
            ```
            
        - Upload Controller 생성


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
![Branch 명명 규칙 및 전략](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/917d664f-fdbd-411a-9dc7-44375bfe683d)

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

![Jira 작업 유형](https://github.com/TaeHeumPark/We-are-not-weak/assets/69237887/f342061f-f114-4e3d-9f39-39fa62f968e1)

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
