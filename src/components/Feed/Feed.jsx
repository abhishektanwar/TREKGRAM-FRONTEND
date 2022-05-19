import { Fragment } from "react";
import { Loader } from "../Loader/Loader";
import Post from "../Post/Post";
import PostFiler from "../PostFilter/PostFiler";
import Share from "../Share/Share";
import "./feed.css";

const Feed = ({ posts, status, error }) => {
  console.log("feed posts", posts);
  return (
    <div className="flex-row feed-container">
      <div className="feed-wrapper">
        <Share />
        <PostFiler />
        {status === "loading" ? (
          <Loader />
          // <h2>loading</h2>
        ) : posts.length > 0 ? (
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
