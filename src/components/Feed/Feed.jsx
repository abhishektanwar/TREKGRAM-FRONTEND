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
  const { pathname } = useLocation();
  return (
    <div className="flex-row feed-container">
      {posts ? (
        <div className="feed-wrapper">
          {user?._id === userId || pathname === "/home" ? <Share /> : null}
          <PostFilter />
          {status === "loading" ? (
            <div className="loader-container">
            <Loader />
          </div>
          ) : error === true ? (
            <h3>Failed to load posts</h3>
          ) : posts?.length > 0 ? (
            posts?.map((post) => {
              return (
                <Fragment key={post._id}>
                  <Post post={post} />
                </Fragment>
              );
            })
          ) : <h2>No posts found</h2>}
        </div>
      ) : (
        <div className="loader-container">
            <Loader />
          </div>
      )}
    </div>
  );
};

export default Feed;
