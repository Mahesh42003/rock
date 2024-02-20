import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import EachVideoId from './components/EachVideoId'
import TrendingVideos from './components/TrendingVideos'
import GamingVideos from './components/GamingVideos'
import SavedContext from './context/SavedContext'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
class App extends Component {
  state = {videos: [], isDark: false}

  addingVideos = (
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
  ) => {
    const saving = {
      video: videoUrl,
      published: publishedAt,
      views: viewsCount,
      thumbnail: thumbnailUrl,
      profileImage: profileImageUrl,
      subscribers: subscribersCount,
      videoName: name,
      descriptive: description,
      id1: id,
      tit: title,
    }
    this.setState(prevState => ({
      videos: [...prevState.videos, saving],
    }))
  }

  changingTheme = () => {}

  render() {
    const {videos, isDark} = this.state
    console.log(videos)
    return (
      <SavedContext.Provider
        value={{
          videos,
          addingVideos: this.addingVideos,
          isDark,
          changingTheme: this.changingTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/videos/:id" component={EachVideoId} />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={GamingVideos} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SavedContext.Provider>
    )
  }
}

export default App
