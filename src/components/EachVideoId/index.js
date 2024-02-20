import {Component, React} from 'react'
import Cookies from 'js-cookie'

import {ImCross} from 'react-icons/im'
import {Link} from 'react-router-dom'
import {IoHome} from 'react-icons/io5'
import {FaFireAlt} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {IoMdSave} from 'react-icons/io'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import Header from '../Header'
import ReferenceOfThirdPartyPackage from '../ReferenceOfThirdPartyPackage'
import './index.css'

class EachVideoId extends Component {
  state = {originalData: ''}

  componentDidMount() {
    this.gettingData()
  }

  gettingData = async () => {
    const {originalData} = this.state
    const value = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${value}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      name: data.video_details.channel.name,
      profileImageUrl: data.video_details.channel.profile_image_url,
      subscribersCount: data.video_details.channel.subscriber_count,
      description: data.video_details.description,
      id: data.video_details.id,
      publishedAt: data.video_details.published_at,
      thumbnailUrl: data.video_details.thumbnail_url,
      title: data.video_details.title,
      videoUrl: data.video_details.video_url,
      viewsCount: data.video_details.view_count,
    }
    this.setState({originalData: updatedData})
  }

  renderedData = () => {
    const {originalData} = this.state
    const {
      name,
      profileImageUrl,
      subscribersCount,
      description,
      id,
      publishedAt,
      thumbnailUrl,
      title,
      videoUrl,
      viewsCount,
    } = originalData
    if (originalData === '') {
      return ''
    }

    return (
      <div>
        <ReferenceOfThirdPartyPackage originalData={originalData} />
      </div>
    )
  }

  render() {
    const {originalData} = this.state
    return (
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
          </div>
          <div className="left-margin right-background ">
            {this.renderedData()}
          </div>
        </div>
      </div>
    )
  }
}
export default EachVideoId
