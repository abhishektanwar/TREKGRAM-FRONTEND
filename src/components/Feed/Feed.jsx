import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { Loader } from "../Loader/Loader";
import Post from "../Post/Post";
import PostFilter from "../PostFilter/PostFilter";
import Share from "../Share/Share";
import "./feed.css";

const Feed = ({ posts, status, error }) => {
  const { user } = useSelector((state) => state.user);
  const { userId } = useParams();
  const {pathname} = useLocation();
  console.log("location",pathname);
  return (
    <div className="flex-row feed-container">
      <div className="feed-wrapper">
        {(user?._id === userId) || pathname==='/' ? <Share /> : null }
        <PostFilter />
        {status === "loading" ? (
          <Loader />
        ) : error === true ? <h3>Failed to load posts</h3> : posts?.length > 0 ? (
          posts.map((post) => {
            return (
              <Fragment key={post._id}>
                <Post post={post} />
              </Fragment>
            );
          })
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default Feed;
