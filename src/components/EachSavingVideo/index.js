import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const EachSavingVideo = props => {
  const {saved} = props
  const {thumbnail, videoName, published, views, tit, id1} = saved
  const date = new Date(published)
  console.log(published)
  const date1 = formatDistanceToNow(
    new Date(date.getFullYear(), date.getMonth(), date.getDay()),
  )
  const date2 = date1.split(' ')
  const date3 = `.${date2[1]} ${date2[2]} ago`
  return (
    <Link to={`/videos/${id1}`}>
      <li>
        <div className="trending-displaying">
          <img
            src={thumbnail}
            alt={videoName}
            className="trending-image-size"
          />
          <div>
            <h3 className="title margin-left-trending">{tit}</h3>
            <p className="title margin-left-trending">{videoName}</p>
            <p className="title margin-left-trending">{`${views} views`}</p>
            <p className="title margin-left-trending">{date3}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default EachSavingVideo
