import {Component} from 'react'
import {ImCross} from 'react-icons/im'
import {Link} from 'react-router-dom'
import {IoHome} from 'react-icons/io5'
import {FaFireAlt, FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {IoMdSave} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import EachTrendingVideo from '../EachTrendingVideo'
import './index.css'

const apiStatusConstants = {
  progress: 'pro',
  success: 'succ',
  failure: 'failu',
}

class TrendingVideos extends Component {
  state = {videos: [], apiStatus: ''}

  componentDidMount() {
    this.gettingData()
  }

  gettingData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const value = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${value}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/videos/trending',
      options,
    )
    const data = await response.json()
    const updatedData = data.videos.map(each => ({
      name: each.channel.name,
      title: each.title,
      id: each.id,
      viewsCount: each.view_count,
      publishedAt: each.published_at,
      thumbNailUrl: each.thumbnail_url,
    }))
    this.setState({videos: updatedData, apiStatus: apiStatusConstants.success})
  }

  trendingData = () => {
    const {videos, apiStatus} = this.state
    const {name, title, id, viewsCount, publishedAt, thumbNailUrl} = videos
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#0284c7" height={80} width={80} />
          </div>
        )
      case apiStatusConstants.success:
        return (
          <div>
            <div>
              <button className="trending-button-styling title">
                <div className="trend-flexing">
                  <FaFireAlt alt="trending" />
                  <h1 className="title heading-trending">Trending</h1>
                </div>
              </button>
              <ul>
                {videos.map(each => (
                  <EachTrendingVideo videos={each} key={each.id} />
                ))}
              </ul>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {videos} = this.state

    return (
      <div>
        <div className="Home-displaying">
          <Header />
          <div className="displaying">
            <div>
              <div className="Header-margin-top">
                <Link to="/">
                  <button className="Header-1">
                    <div className="Each-one-displaying">
                      <IoHome alt="Home" className="home-image" />
                      <p className="home-paragraph">Home</p>
                    </div>
                  </button>
                </Link>
              </div>
              <div className="Header-margin-top">
                <Link to="/trending">
                  <button className="Header-1">
                    <div className="Each-one-displaying">
                      <FaFireAlt alt="Home" className="home-image" />
                      <p className="home-paragraph">Trending</p>
                    </div>
                  </button>
                </Link>
              </div>

              <div className="Header-margin-top">
                <Link to="/gaming">
                  <button className="Header-1">
                    <div className="Each-one-displaying">
                      <SiYoutubegaming alt="Home" className="home-image" />
                      <p className="home-paragraph">Gaming</p>
                    </div>
                  </button>
                </Link>
              </div>
              <div className="Header-margin-top">
                <Link to="/saved-videos">
                  <button className="Header-1">
                    <div className="Each-one-displaying">
                      <IoMdSave alt="Home" className="home-image" />
                      <p className="home-paragraph">Saved videos</p>
                    </div>
                  </button>
                </Link>
              </div>
              <p>CONTACT US</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
              <p>Enjoy! Now to see your channels and recommendations!</p>
            </div>
            <div className="left-margin right-background-automation ">
              {this.trendingData()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default TrendingVideos
