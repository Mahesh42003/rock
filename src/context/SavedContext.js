import React from 'react'

const SavedContext = React.createContext({
  videos: {},
  addingVideos: () => {},
  isDark: false,
  changingTheme: () => {},
})
export default SavedContext
