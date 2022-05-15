import Post from '../Post/Post'
import Share from '../Share/Share'
import './feed.css'

const Feed = () => {
  return (
    <div className="flex-row feed-container">
      <div className="feed-wrapper">
        <Share />
        <Post />
      </div>
    </div>
  )
}

export default Feed
