import {Link, withRouter} from 'react-router-dom'
import {IoHome} from 'react-icons/io5'
import {FaFireAlt, FaHighlighter} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {IoMdSave} from 'react-icons/io'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import './index.css'

const Header = props => {
  const {history} = props

  const onConfirm = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div>
      <nav>
        <ul className="Header-flexboxing">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="image-header-size"
              alt="website logo"
            />
          </Link>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              className="profile-size"
              alt="profile"
            />
            <button data-testid="theme">
              <FaHighlighter alt="light" />
            </button>

            <Popup modal trigger=<button>Logout</button>>
              {close => (
                <>
                  <p>Are you sure, you want to logout</p>
                  <button
                    onClick={() => {
                      close()
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={onConfirm}>Confirm</button>
                </>
              )}
            </Popup>
          </div>
        </ul>
      </nav>
    </div>
  )
}
export default withRouter(Header)
