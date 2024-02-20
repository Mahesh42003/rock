import {Component} from 'react'
import {ImCross} from 'react-icons/im'
import {Link} from 'react-router-dom'
import {IoHome} from 'react-icons/io5'
import {FaFireAlt, FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {IoMdSave} from 'react-icons/io'
import Cookies from 'js-cookie'
import Header from '../Header'
import EachTrendingVideo from '../EachTrendingVideo'
import EachSavingVideo from '../EachSavingVideo'
import SavedContext from '../../context/SavedContext'
import './index.css'

class SavedVideos extends Component {
  renderingData = () => (
    <SavedContext.Consumer>
      {value => {
        const {videos} = value

        return (
          <div>
            <button className="trending-button-styling title">
              <div className="trend-flexing">
                <IoMdSave alt="trending" />
                <h1 className="title heading-trending">Saved Videos</h1>
              </div>
            </button>
            <ul>
              {videos.map(each => (
                <EachSavingVideo saved={each} key={each.id1} />
              ))}
            </ul>
          </div>
        )
      }}
    </SavedContext.Consumer>
  )

  render() {
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
              {this.renderingData()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SavedVideos
