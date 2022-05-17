import "./post.css";
import dummy from "../Header/dummy_profile_img.png";
import {
  MoreVert,
  ThumbUpOutlined,
  ThumbUpRounded,
  Delete,
  BookmarkBorder,
  Bookmark,
} from "@material-ui/icons";
import {} from "react-router-dom";
import Button from "../Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmarkPost,
  deletePost,
  likePost,
} from "../../reducers/counterSlice";
import { useState } from "react";
const Post = ({ post }) => {
  const { user: currentUser } = useSelector((state) => state.user);
  const { username, userId, desc, comments, likes, profilePrcture, createdAt } =
    post;
  const dispatch = useDispatch();
  const [postLikes, setPostLikes] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser._id));
  const [isBookmarked, setIsBookmarked] = useState(
    currentUser.bookmarks.includes(post._id)
  );
  // const isLiked = likes.includes(currentUser._id)
  const handlePostLike = () => {
    dispatch(likePost({ id: post._id, userId: currentUser._id }));
    setIsLiked((prev) => !prev);
    setPostLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleBookmarkPost = () => {
    dispatch(bookmarkPost({ postId: post._id }));
    setIsBookmarked((prev) => !prev);
    // setPostLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };
  return (
    <div className="post-container">
      <div className="post-wrapper shadow-box">
        <div className="post-top-section flex-row flex-align-item-center">
          <div className="post-top-left flex-row flex-align-item-center">
            <div class="avatar avatar-sm">
              <img
                src={dummy}
                alt="avatar"
                loading="lazy"
                className="responsive-img circular-img"
              />
            </div>
            <span className="typo-xs text-medium-weight post-username">
              {username ?? "<username>"}
            </span>
            <span className="body-typo-sm text-regular-weight post-time">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="post-top-right">
            {post.userId === currentUser._id ? (
              <Button
                icon={<Delete fontSize="large" />}
                buttonStyle="secondary-button margin0 padding0"
                onClick={() =>
                  dispatch(
                    deletePost({ postId: post._id, userId: currentUser._id })
                  )
                }
              />
            ) : null}
            <Button
              icon={
                isBookmarked ? (
                  <Bookmark fontSize="large" />
                ) : (
                  <BookmarkBorder fontSize="large" />
                )
              }
              buttonStyle="secondary-button margin0 padding0"
              onClick={() => handleBookmarkPost()}
            />
          </div>
        </div>
        <div className="post-middle-section">
          <p className="post-text-body body-typo-md">{desc}</p>
          {/* {post.img ? (
            <img
              src={ post.img ? `data:image/png;base64,${post.img}` : dummy}
              alt="post-image"
              loading="lazy"
              class="responsive-img"
            />
            ) : null} */}
        </div>

        <div className="post-bottom-section flex-row">
          <div className="post-bottom-left flex-row flex-align-item-center">
            <Button
              icon={
                isLiked ? (
                  <ThumbUpRounded fontSize="large" />
                ) : (
                  <ThumbUpOutlined fontSize="large" />
                )
              }
              buttonStyle="secondary-button margin0 padding0"
              onClick={() => handlePostLike()}
            />
            <span className="like-counter body-typo-md text-medium-weight">
              {postLikes} likes
            </span>
          </div>
          <div className="post-bottom-left"></div>
          <span className="post-comment-counter body-typo-md text-medium-weight pointer">
            {comments.length} comments
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
