import {Link} from 'react-router-dom'
import './index.css'

const EachGame = props => {
  const {games} = props
  const {thumbNailUrl, title, viewsCount, id} = games
  return (
    <Link to={`/videos/${id}`}>
      <li className="list-style-type-gaming">
        <div>
          <img src={thumbNailUrl} className="game-image-width" alt={title} />
          <p className="title text-decoration">{title}</p>
          <p className="title">{`${viewsCount} Watching Worldwide`}</p>
        </div>
      </li>
    </Link>
  )
}
export default EachGame
