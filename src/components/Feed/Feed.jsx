import { Fragment } from "react";
import { Loader } from "../Loader/Loader";
import Post from "../Post/Post";
import PostFilter from "../PostFilter/PostFilter";
import Share from "../Share/Share";
import "./feed.css";

const Feed = ({ posts, status, error }) => {
  return (
    <div className="flex-row feed-container">
      <div className="feed-wrapper">
        <Share />
        <PostFilter />
        {status === "loading" ? (
          <Loader />
        ) : posts?.length > 0 ? (
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
