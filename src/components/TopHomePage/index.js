import {Component} from 'react'
import {ImCross} from 'react-icons/im'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import BottomPage from '../BottomPage'

import './index.css'

const apiStatusConstants = {
  progress: 'pro',
  success: 'succ',
  failure: 'failu',
}

class TopHomePage extends Component {
  state = {isClosing: false, searching: '', totalData: [], apiStatus: ''}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {searching} = this.state
    this.setState({apiStatus: apiStatusConstants.progress})
    const value = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${value}`,
      },
    }
    const query = `https://apis.ccbp.in/videos/all?search=${searching}`

    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searching}`,
      options,
    )
    const data = await response.json()
    const mappingData = data.videos.map(each => ({
      name: each.channel.name,
      profileImageUrl: each.channel.profile_image_url,
      id: each.id,
      publishedAt: each.published_at,
      thumbNailUrl: each.thumbnail_url,
      viewsCount: each.view_count,
      title: each.title,
    }))
    this.setState({
      totalData: mappingData,
      apiStatus: apiStatusConstants.success,
    })
  }

  closing = () => {
    this.setState({isClosing: true})
  }

  onSearching = () => {
    const {searching} = this.state
    this.getProducts()
  }

  renderingChannelData = () => {
    const {totalData, searching, apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#0284c7" height={80} width={80} />
          </div>
        )
      case apiStatusConstants.success:
        if (totalData.length === 0) {
          return (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                className="search-image-height"
              />
              <h2>No Search results found</h2>
              <p>Try different key words or remove search filter</p>
              <button>Retry</button>
            </div>
          )
        }

        return (
          <div>
            <ul className="unordered-bottom-data">
              {totalData.map(each => (
                <BottomPage list={each} key={each.id} />
              ))}
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  Searching = event => {
    const {searching} = this.state
    this.setState({searching: event.target.value})
  }

  render() {
    const {isClosing} = this.state

    if (isClosing === true) {
      return <>{this.renderingChannelData()}</>
    }

    return (
      <>
        <div className="Home-background-image">
          <>
            <div className="closing-background-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                className="Home-image-height"
              />
              <button className="cross-background">
                <ImCross alt="cross" onClick={this.closing} />
              </button>
            </div>
            <p>Buy Nxt Watch Premium prepaid plans with UPI.</p>
            <button>GET IT NOW</button>
          </>
          <div className="top-margin">
            <input
              type="search"
              className="searching"
              onChange={this.Searching}
            />
            <button className="button-searching" onClick={this.onSearching}>
              <FaSearch alt="search" />
            </button>
            {this.renderingChannelData()}
          </div>
        </div>
      </>
    )
  }
}
export default TopHomePage
