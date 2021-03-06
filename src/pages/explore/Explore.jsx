import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feed, Header, LeftSidebar, RightSidebar } from '../../components'
import { latestPostsFilter } from '../../helpers/filters/latestPostsFilter';
import { trendingPostsFilter } from '../../helpers/filters/trendingPostsFilter';
import { getExplorePosts } from '../../reducers/postSlice';
import HomeRightbar from '../home/HomeRightbar'
import { useDocumentTitle } from "../../helpers/helpers";
import './explore.css'
const Explore = () => {
  useDocumentTitle("TrekGram | Explore");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { explorePosts, status, error, filterType } = useSelector(
    (state) => state.counter
  );
  let finalFilteredPosts;
  if (filterType === "Latest") {
    finalFilteredPosts = latestPostsFilter(explorePosts);
  } else if (filterType === "Trending") {
    finalFilteredPosts = trendingPostsFilter(explorePosts);
  } else if (filterType === null) {
    finalFilteredPosts = explorePosts;
  }
  useEffect(()=>{
    dispatch(getExplorePosts())
  },[])
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

export default Explore
