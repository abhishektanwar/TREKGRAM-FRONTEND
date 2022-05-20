import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feed, Header, LeftSidebar, RightSidebar } from "../../components";
import { latestPostsFilter } from "../../helpers/filters/latestPostsFilter";
import { trendingPostsFilter } from "../../helpers/filters/trendingPostsFilter";
import { loadPosts } from "../../reducers/postSlice";
import "./home.css";
import HomeRightbar from "./HomeRightbar";
const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts, status, error, filterType } = useSelector(
    (state) => state.counter
  );
  let finalFilteredPosts;
  if (filterType === "Latest") {
    finalFilteredPosts = latestPostsFilter(posts);
  } else if (filterType === "Trending") {
    finalFilteredPosts = trendingPostsFilter(posts);
  } else if (filterType === null) {
    finalFilteredPosts = posts;
  }
  // const {} = useElec
  useEffect(() => {
    dispatch(loadPosts({ userId: user?._id }));
  }, []);
  return (
    <div>
      <nav className="nav-bar shadow-box" id="my-nav-bar">
        <Header />
      </nav>
      <div className="flex-row home-container app-container">
        <LeftSidebar user={user} />
        <Feed posts={finalFilteredPosts} status={status} error={error} />
        <RightSidebar component={<HomeRightbar />} />
      </div>
    </div>
  );
};

export default Home;
