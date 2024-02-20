import React from 'react'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {FaRegThumbsUp, FaRegThumbsDown} from 'react-icons/fa'
import {GiSaveArrow} from 'react-icons/gi'
import SavedContext from '../../context/SavedContext'
import './index.css'

const ReferenceOfThirdPartyPackage = props => {
  const {originalData} = props
  const {
    videoUrl,
    publishedAt,
    title,
    viewsCount,
    thumbnailUrl,
    profileImageUrl,
    subscribersCount,
    name,
    description,
    id,
  } = originalData
  console.log(publishedAt)
  const date = new Date(publishedAt)
  console.log(publishedAt)
  const date1 = formatDistanceToNow(
    new Date(date.getFullYear(), date.getMonth(), date.getDay()),
  )
  const date2 = date1.split(' ')
  const date3 = `.${date2[1]} ${date2[2]} ago`

  return (
    <SavedContext.Consumer>
      {value => {
        const {addingVideos} = value
        const onSaving = () => {
          addingVideos(
            videoUrl,
            publishedAt,
            title,
            viewsCount,
            thumbnailUrl,
            profileImageUrl,
            subscribersCount,
            name,
            description,
            id,
          )
        }
        return (
          <div>
            <ReactPlayer
              url={videoUrl}
              controls="true"
              width="100"
              height="70vh"
            />
            <p className="title">{title}</p>
            <div className="flex-boxing-react-player">
              <p className="title">{`${viewsCount} views`}</p>
              <p className="title">{date3}</p>
              <div className="flex-boxing-react-player">
                <button className="like-button-styling title">
                  <FaRegThumbsUp alt="thumsup" />
                </button>
                <p className="title">Like</p>
                <button className="like-button-styling title">
                  <FaRegThumbsDown alt="downthumsup" />
                </button>
                <p className="title">Dislike</p>
                <button
                  className="like-button-styling title"
                  onClick={onSaving}
                >
                  <GiSaveArrow alt="save" />
                </button>
                <p className="title">Save</p>
              </div>
            </div>
            <hr />
            <img src={profileImageUrl} className="profile-image" alt={name} />
            <p className="title">{name}</p>
            <p className="title">{`${subscribersCount} subscribers`}</p>
            <p className="title">{description}</p>
          </div>
        )
      }}
    </SavedContext.Consumer>
  )
}
export default ReferenceOfThirdPartyPackage
