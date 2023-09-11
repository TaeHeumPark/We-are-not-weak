import { OpenVidu } from 'openvidu-browser'

import axios from 'axios'
import React, { Component } from 'react'
import './Drug.css'
import UserVideoComponent from './UserVideoComponent'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import MicOutlinedIcon from '@mui/icons-material/MicOutlined'
import HeadsetIcon from '@mui/icons-material/Headset'
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined'
import MicOffIcon from '@mui/icons-material/MicOff'
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import styled from '@emotion/styled'
// import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined'
// import StopScreenShareOutlinedIcon from '@mui/icons-material/StopScreenShareOutlined'
// import { Icon } from '@mui/material'
import StyledButton from '../styles/StyledButton'
import TestimonyModal from '../components/TestimonyModal'
import { useParams } from 'react-router-dom'

// const APPLICATION_SERVER_URL = 'http://i9b209.p.ssafy.io:8080/'
const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #202124;
`

const Header = styled.div`
  height: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px;
  justify-content: center;
`

const StudyTitle = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 600;
`

const Middle = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
`

const Left = styled.div`
  flex: 11;
  width: 100%;
  display: flex;
  justify-content: center;
`

const Right = styled.div`
  position: relative;
  padding: 0 20px;
  display: flex;
  align-items: center;
  transition: 0.5s;
  right: 0;
  flex: 1;
`

const Chat = styled.div`
  width: 100%;
  height: 93%;
  border-radius: 5px;
  background-color: white;
  display: flex;
`

const VideoContainer = styled.div`
  margin-top: 30px;
  width: 90%;
  height: 77vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

const StreamContainerWrapper = styled.div`
  display: grid;
  place-items: center;
  ${(props) =>
    props.primary
      ? `
    grid-template-columns: repeat(3, 1fr);
    `
      : `
    grid-template-columns: repeat(4, 1fr);
    `}
  grid-gap: 20px;
  height: 100%;
  padding: 10px;
  @media screen and (max-width: 800px) {
    background-color: red;
  }
`

const StreamContainer = styled.div`
  width: 100%;
  position: relative;
  border-radius: 5px;
  min-height: 34vh;
  box-sizing: border-box;
`

const Bottom = styled.div`
  height: 13vh;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
`

const BottomBox = styled.div`
  display: flex;
  height: 100%;
  width: 20%;
  align-items: center;
  justify-content: space-around;
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #3c4043;
  }

  ${(props) =>
    props.primary &&
    `
      background-color: red;
      color: white;
      &:hover{
          background-color: red;
      }
    `}
`

const ChatIconBox = styled.div`
  position: absolute;
  color: white;
  right: 60px;
  top: 50%;
  bottom: 50%;
  cursor: pointer;
`
class CounselOpenvidu extends Component {
  constructor(props) {
    super(props)

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: 'drug',
      myUserName: '',
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      isCamera: true,
      isSpeaker: true,
      isMike: true,
      subscribers: [],
      isCounselJournal: false,
      isTestimony: false,
      isRoleplay: false,
      counselId: '',
      journalData: [],
      userType: 5,

      userId: '',
      title: '',
    }

    this.joinSession = this.joinSession.bind(this)
    this.leaveSession = this.leaveSession.bind(this)
    this.switchCamera = this.switchCamera.bind(this)
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this)
    this.handleChangeUserName = this.handleChangeUserName.bind(this)
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this)
    this.onbeforeunload = this.onbeforeunload.bind(this)
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BASE_URL}curriculum/${this.props.curriculumId}`

    axios
      .get(url)
      .then((response) => {
        this.setState({ title: response.data.content }) // 반환된 데이터에서 content를 title이란 state에 저장
      })
      .catch((error) => {
        console.error('상담제목 불러오기 실패 : ', error)
      })

    const loginUser = sessionStorage.getItem('loginUser')
    if (loginUser) {
      const parsedUser = JSON.parse(loginUser)
      this.setState({
        myUserName: parsedUser.userState.nickname,
        userId: parsedUser.userState.id,
        userType: parsedUser.userState.type,
      })
    }
    console.log('유저타입은')
    console.log(this.state.userType)
    window.addEventListener('beforeunload', this.onbeforeunload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload)
  }

  onbeforeunload(event) {
    this.leaveSession()
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    })
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    })
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      })
    }
  }
  handleToggle(kind) {
    if (this.state.publisher) {
      switch (kind) {
        case 'camera':
          this.setState({ isCamera: !this.state.isCamera }, () => {
            console.log(this.state.publisher)
            this.state.publisher.publishVideo(this.state.isCamera)
          })
          break

        case 'speaker':
          this.setState({ isSpeaker: !this.state.isSpeaker }, () => {
            this.state.subscribers.forEach((s) =>
              s.subscribeToAudio(this.state.isSpeaker),
            )
          })
          break

        case 'mike':
          this.setState({ isMike: !this.state.isMike }, () => {
            this.state.publisher.publishAudio(this.state.isMike)
          })
          break

        case 'counseljournal':
          this.setState({ isCounselJournal: !this.state.isCounselJournal })
          this.setState({ isTestimony: false })
          this.setState({ isRoleplay: false })
          break

        case 'testimony':
          this.setState({ isTestimony: !this.state.isTestimony })
          this.setState({ isCounselJournal: false })
          this.setState({ isRoleplay: false })
          break

        case 'roleplay':
          this.setState({ isRoleplay: !this.state.isRoleplay })
          this.setState({ isCounselJournal: false })
          this.setState({ isTestimony: false })
          break

        // case 'share':
        //   this.setState({ isShareScreen: !this.state.isShareScreen }, () => {
        //     this.state.subscribers.forEach((s) =>
        //       s.publishScreen(this.state.isShareScreen),
        //     )
        //   })
        //   break

        default:
          break
      }
    }
  }
  // startScreenSharing = async () => {
  //   const { session } = this.state

  //   if (session) {
  //     const publisher = this.OV.initPublisher(undefined, {
  //       videoSource: 'screen',
  //       publishVideo: true, // 화면 공유 비디오 활성화
  //       publishAudio: false, // 오디오 비활성화
  //     })

  //     try {
  //       await session.publish(publisher)
  //       this.setState({ publisher })
  //     } catch (error) {
  //       console.error('Error publishing screen share:', error)
  //     }
  //   }
  // }

  // stopScreenSharing = () => {
  //   const { session, publisher } = this.state

  //   if (publisher) {
  //     session.unpublish(publisher)
  //     publisher.stream.dispose()
  //     this.setState({ publisher: null })
  //   }
  // }
  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers
    let index = subscribers.indexOf(streamManager, 0)
    if (index > -1) {
      subscribers.splice(index, 1)
      this.setState({
        subscribers: subscribers,
      })
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu()

    this.OV.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 100,
        threshold: -60,
      },
    })

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session

        // --- 3) Specify the actions when events take place in the session ---

        // 발언자가 말하기 시작할 때
        mySession.on('publisherStartSpeaking', (event) => {
          console.log(
            'User ' + event.connection.connectionId + ' start speaking',
          )
          // 현재 발언자의 비디오 요소 가져오기
          let currentSpeakerVideo = document.getElementById(
            event.connection.connectionId,
          )

          if (currentSpeakerVideo && currentSpeakerVideo.srcObject) {
            currentSpeakerVideo.style.border = '4px solid yellow'

            let mainVideoElement = document.getElementById('mainVideo')
            if (mainVideoElement) {
              mainVideoElement.srcObject = currentSpeakerVideo.srcObject
            }
          }
        })

        // 발언자가 말하기를 멈출 때
        mySession.on('publisherStopSpeaking', (event) => {
          console.log(
            'User ' + event.connection.connectionId + ' stop speaking',
          )
          // 현재 발언자의 비디오 요소 가져오기
          let currentSpeakerVideo = document.getElementById(
            event.connection.connectionId,
          )

          if (currentSpeakerVideo) {
            // 발언자의 비디오 테두리 제거
            currentSpeakerVideo.style.border = 'none'
          }
        })

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined)
          var subscribers = this.state.subscribers
          subscribers.push(subscriber)

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          })
        })

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager)
        })

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception)
        })

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          console.log(token)
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              })

              // --- 6) Publish your stream ---

              mySession.publish(publisher)

              // Obtain the current video device in use

              var devices = await this.OV.getDevices()
              var videoDevices = devices.filter(
                (device) => device.kind === 'videoinput',
              )
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId,
              )

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              })
            })
            .catch((error) => {
              console.log(
                'There was an error connecting to the session:',
                error.code,
                error.message,
              )
            })
        })
      },
    )
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    // 상담사일 때만 상담일지 post요청
    if (this.state.userType === 2) {
      // 상담일지 정보 업데이트
      const storedData = localStorage.getItem('counselJournal')
      if (storedData) {
        this.setState(
          {
            journalData: JSON.parse(storedData),
          },
          async () => {
            // setState의 콜백 함수 사용
            // 상담일지 POST 요청을 보내는 메서드
            try {
              const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}consulting`,
                {
                  curriculumId: this.state.mySessionId,
                  consultings: this.state.journalData,
                },
              )

              console.log('상담일지 잘 드가나~')
              console.log(response.data)
            } catch (error) {
              console.error('상담일지 입력 에러', error)
              console.log(this.state.mySessionId)
              console.log(this.state.journalData)
            }
          },
        )
      }
    }

    const mySession = this.state.session

    if (mySession) {
      mySession.disconnect()
    }

    // Empty all properties...
    this.OV = null
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: this.state.mySessionId,
      myUserName: this.state.myUserName,
      mainStreamManager: undefined,
      publisher: undefined,
    })
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices()
      var videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      )

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) =>
            device.deviceId !== this.state.currentVideoDevice.deviceId,
        )

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          })

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager)

          await this.state.session.publish(newPublisher)
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    // useParams 훅을 사용하여 URL 파라미터를 가져오는 함수
    const SetParamsToState = () => {
      const { curriculumId } = useParams()

      // state의 mySessionId재설정
      if (this.state.mySessionId === 'drug') {
        this.setState({ mySessionId: curriculumId })
      }

      return null // 아무것도 렌더링하지 않음
    }

    return (
      <Container>
        <SetParamsToState />
        <Header>
          <StudyTitle>{this.state.title}</StudyTitle>
          {this.state.isCounselJournal ? (
            <p style={{ color: 'white', right: '50' }}>
              상담일지를 작성할 사람을 클릭하세요
            </p>
          ) : null}
        </Header>
        <Middle>
          {this.state.session === undefined ? (
            <div
              style={{
                position: 'absolute',
                right: '0',
                left: '0',
                width: '300px',
                margin: 'auto',
                height: '300px',
              }}
              id="join"
            >
              <div>
                <h1 style={{ color: 'white' }}> 상담에 참여하세요! </h1>
                <form
                  style={{ display: 'flex', justifyContent: 'center' }}
                  className="form-group"
                  onSubmit={this.joinSession}
                >
                  <p className="text-center">
                    <input
                      className="btn btn-lg btn-success"
                      name="commit"
                      type="submit"
                      value="JOIN"
                    />
                  </p>
                </form>
              </div>
            </div>
          ) : null}
          <Left>
            <VideoContainer className="currentSpeakerVideo">
              {this.state.session !== undefined ? (
                <StreamContainerWrapper
                  primary={this.state.isChat}
                  ref={this.userRef}
                >
                  {this.state.publisher !== undefined ? (
                    <StreamContainer key={this.state.publisher.stream.streamId}>
                      <UserVideoComponent
                        streamManager={this.state.publisher}
                      />
                    </StreamContainer>
                  ) : null}
                  {this.state.subscribers.map((sub, i) => (
                    <StreamContainer key={sub.stream.streamId}>
                      <UserVideoComponent
                        streamManager={sub}
                        isCounselJournal={this.state.isCounselJournal}
                        isRoleplay={this.state.isRoleplay}
                      />
                    </StreamContainer>
                  ))}
                </StreamContainerWrapper>
              ) : null}
            </VideoContainer>
          </Left>
        </Middle>

        {/* {this.state.session !== undefined ? ( */}
        <Bottom>
          <BottomBox>
            <Icon
              primary={!this.state.isCamera}
              onClick={() => this.handleToggle('camera')}
            >
              {this.state.isCamera ? (
                <VideocamOutlinedIcon />
              ) : (
                <VideocamOffOutlinedIcon />
              )}
            </Icon>

            <Icon
              primary={!this.state.isMike}
              onClick={() => this.handleToggle('mike')}
            >
              {this.state.isMike ? <MicOutlinedIcon /> : <MicOffIcon />}
            </Icon>

            <Icon
              primary={!this.state.isSpeaker}
              onClick={() => this.handleToggle('speaker')}
            >
              {this.state.isSpeaker ? <HeadsetIcon /> : <HeadsetOffIcon />}
            </Icon>

            <Icon primary onClick={this.leaveSession}>
              <ExitToAppIcon />
            </Icon>
          </BottomBox>
          {this.state.userType === 2 && (
            <>
              <StyledButton
                onClick={() => this.handleToggle('counseljournal')}
                style={{
                  color: 'white',
                  position: 'absolute',
                  right: '50vh', // 오른쪽에 배치
                }}
              >
                상담일지
              </StyledButton>
              <StyledButton
                onClick={() => this.handleToggle('roleplay')}
                style={{
                  color: 'white',
                  position: 'absolute',
                  right: '28vh', // 오른쪽에 배치
                }}
              >
                {this.state.isRoleplay ? '역할극 종료' : '역할극 배정'}
              </StyledButton>
            </>
          )}
          <StyledButton
            onClick={() => this.handleToggle('testimony')}
            style={{
              color: 'white',
              position: 'absolute',
              right: '13vh', // 오른쪽에 배치
            }}
          >
            소감문
          </StyledButton>
        </Bottom>
        {this.state.isTestimony && (
          <TestimonyModal curriculumId={this.state.mySessionId} />
        )}
        {/* ) : null} */}
      </Container>
    )
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId)
    return await this.createToken(sessionId)
  }

  async createSession(sessionId) {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/sessions`,
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return response.data // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/sessions/` +
        sessionId +
        '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return response.data // The token
  }
}

export default CounselOpenvidu
