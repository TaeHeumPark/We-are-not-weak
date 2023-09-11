import React, { Component } from 'react'
import OpenViduVideoComponent from './OvVideo'
import './UserVideo.css'
import CounselJournalModal from '../components/CounselJournalModal'
import RolePlayModal from '../components/RolePlayModal'

export default class UserVideoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCounselJournalModal: false,
      isRolePlayModal: false,
    }
    this.handleVideoClick = this.handleVideoClick.bind(this)
  }

  componentDidUpdate(prevProps) {
    // Check for changes in isCounselJournal prop
    if (prevProps.isCounselJournal && !this.props.isCounselJournal) {
      this.setState({
        isCounselJournalModal: false,
      })
    }

    // Check for changes in isRoleplay prop
    if (prevProps.isRoleplay && !this.props.isRoleplay) {
      this.setState({
        isRolePlayModal: false,
      })
    }
  }

  getNicknameTag() {
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData
  }

  handleVideoClick() {
    this.setState((prevState) => ({
      isCounselJournalModal: !prevState.isCounselJournalModal,
      isRolePlayModal: !prevState.isRolePlayModal,
    }))
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent" onClick={this.handleVideoClick}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <div>
              <p>{this.getNicknameTag()}</p>
            </div>
          </div>
        ) : null}

        {this.state.isCounselJournalModal && this.props.isCounselJournal ? (
          <CounselJournalModal nickname={this.getNicknameTag()} />
        ) : null}

        {this.state.isRolePlayModal && this.props.isRoleplay ? (
          <RolePlayModal nickname={this.getNicknameTag()} />
        ) : null}
      </div>
    )
  }
}
