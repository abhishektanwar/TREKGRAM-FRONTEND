import { useDispatch, useSelector } from 'react-redux';
import { Feed, Header, LeftSidebar, RightSidebar } from '../../components'
import { latestPostsFilter } from '../../helpers/filters/latestPostsFilter';
import { trendingPostsFilter } from '../../helpers/filters/trendingPostsFilter';
import HomeRightbar from '../home/HomeRightbar'
import './bookmarks.css'
const Bookmarks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts,filterType,error,status } = useSelector(
    (state) => state.counter
  );
  let finalFilteredPosts;
  if (filterType === "Latest") {
    finalFilteredPosts = latestPostsFilter(user?.bookmarks);
  } else if (filterType === "Trending") {
    finalFilteredPosts = trendingPostsFilter(user?.bookmarks);
  } else if (filterType === null) {
    finalFilteredPosts = user?.bookmarks;
  }
  return (
    <div>
      <div className="flex-row home-container app-container">
        <LeftSidebar user={user} />
        <Feed posts={finalFilteredPosts} status={status} error={error} />
        {/* <RightSidebar component={<HomeRightbar />} /> */}
      </div>
    </div>
  )
}

export default Bookmarks
