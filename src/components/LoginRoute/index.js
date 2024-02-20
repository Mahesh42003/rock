import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    PasswordChecking: false,
  }

  onSubmitFailure = value => {
    this.setState({errorMsg: value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitting = async event => {
    event.preventDefault()
    const {password, username} = this.state
    const userDetails = {password, username}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data.error_msg)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  passwordcheckbox = event => {
    this.setState({PasswordChecking: event.target.checked})
  }

  passwordvalue = event => {
    const {PasswordChecking} = this.state

    this.setState({password: event.target.value})
  }

  userName = event => {
    const {username} = this.state
    this.setState({username: event.target.value})
  }

  render() {
    const {password, username, PasswordChecking, errorMsg} = this.state
    const value = Cookies.get('jwt_token')

    if (value === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="Login-form">
        <form className="form-colour" onSubmit={this.onSubmitting}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="Login-form-image-size"
          />
          <div className="each-input">
            <label htmlFor="userid">USERNAME</label>
            <input
              type="text"
              id="userid"
              className="input-size"
              placeholder="Username"
              onChange={this.userName}
              value={username}
            />
          </div>
          <div className="each-input">
            <label htmlFor="password">PASSWORD</label>
            <input
              type={PasswordChecking ? 'text' : 'password'}
              id="password"
              className="input-size"
              placeholder="Password"
              onChange={this.passwordvalue}
              value={password}
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="PasswordCheckbox"
              onChange={this.passwordcheckbox}
            />
            <label htmlFor="PasswordCheckbox">Show Password</label>
          </div>
          <button type="submit" className="LoginButton">
            Login
          </button>
          <p>{errorMsg}</p>
        </form>
      </div>
    )
  }
}
export default LoginRoute
