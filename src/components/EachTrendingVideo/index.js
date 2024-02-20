import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const EachTrendingVideo = props => {
  const {videos} = props
  const {thumbNailUrl, name, title, viewsCount, publishedAt, id} = videos
  const date = new Date(publishedAt)
  console.log(publishedAt)
  const date1 = formatDistanceToNow(
    new Date(date.getFullYear(), date.getMonth(), date.getDay()),
  )
  const date2 = date1.split(' ')
  const date3 = `.${date2[1]} ${date2[2]} ago`

  return (
    <Link to={`/videos/${id}`}>
      <li className="list-style-type-trending">
        <div className="trending-displaying">
          <img
            src={thumbNailUrl}
            className="trending-image-size"
            alt="video thumbnail"
          />
          <div>
            <p className="title margin-left-trending">{title}</p>
            <p className="title margin-left-trending">{name}</p>
            <p className="title margin-left-trending">{`${viewsCount} views`}</p>
            <p className="title margin-left-trending">{date3}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default EachTrendingVideo
