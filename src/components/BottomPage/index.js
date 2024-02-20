import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const BottomPage = props => {
  const {list} = props
  const {
    id,
    name,
    profileImageUrl,
    publishedAt,
    thumbNailUrl,
    title,
    viewsCount,
  } = list

  const date = new Date(publishedAt)
  console.log(publishedAt)
  const date1 = formatDistanceToNow(
    new Date(date.getFullYear(), date.getMonth(), date.getDay()),
  )
  const date2 = date1.split(' ')
  const date3 = `.${date2[1]} ${date2[2]} ago`

  return (
    <li className="list-style-type">
      <Link to={`/videos/${id}`}>
        <div className="straight-flexboxing">
          <img src={thumbNailUrl} className="thumbnail-size" />
          <div className="title-flexboxing">
            <img
              src={profileImageUrl}
              className="profile-image-size"
              alt="profile"
            />
            <div>
              <p>{title}</p>
              <p>{name}</p>
              <div className="title-flexboxing">
                <p>{`${viewsCount} views`}</p>
                <p>{date3}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default BottomPage
