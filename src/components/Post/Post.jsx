import "./post.css";
import dummy from "../Header/dummy_profile_img.png";
import {
  MoreVert,
  ThumbUpOutlined,
  ThumbUpRounded,
  Delete,
  BookmarkBorder,
  Bookmark,
  Edit,
} from "@material-ui/icons";
import {} from "react-router-dom";
import Button from "../Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deletePost,
  likePost,
  startPostEdit,
} from "../../reducers/postSlice";
import { useState } from "react";
import { InputField } from "..";
import { format } from "timeago.js";
import { bookmarkPost } from "../../reducers/userSlice";
const Post = ({ post }) => {
  const { user: currentUser } = useSelector((state) => state.user);
  const { username, userId, desc, comments, likes, profilePicture, createdAt } =
    post;
  const dispatch = useDispatch();
  const [postLikes, setPostLikes] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser?._id));
  const [isBookmarked, setIsBookmarked] = useState(
    currentUser?.bookmarks.find((bookmark)=>bookmark._id ===post._id)
  );
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  // const isLiked = likes.includes(currentUser._id)
  const handlePostLike = () => {
    dispatch(likePost({ id: post._id, userId: currentUser?._id }));
    setIsLiked((prev) => !prev);
    setPostLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleBookmarkPost = () => {
    // dispatch(bookmarkPost({ postId: post._id }));
    dispatch(bookmarkPost({ postId: post._id,data:post }));

    setIsBookmarked((prev) => !prev);
    // setPostLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handlePostEdit = (post) => {
    window.scroll(0,0)
    dispatch(startPostEdit(post))
  }

  return (
    <div className="post-container">
      <div className="post-wrapper shadow-box">
        <div className="post-top-section flex-row flex-align-item-center">
          <div className="post-top-left flex-row flex-align-item-center">
            <div class="avatar avatar-sm">
              <img
                src={profilePicture ? profilePicture : dummy}
                alt="avatar"
                loading="lazy"
                className="responsive-img circular-img"
              />
            </div>
            <span className="typo-xs text-medium-weight post-username">
              {username ?? "<username>"}
            </span>
            <span className="body-typo-sm text-regular-weight post-time">
              {format(createdAt)}
            </span>
          </div>
          <div className="post-top-right">
            {post.userId === currentUser?._id ? (
              <>
                <Button
                  icon={<Edit fontSize="large" />}
                  buttonStyle="secondary-button margin0 padding0"
                  onClick={() => handlePostEdit(post)}
                />
                <Button
                  icon={<Delete fontSize="large" />}
                  buttonStyle="secondary-button margin0 padding0"
                  onClick={() =>
                    dispatch(
                      deletePost({ postId: post._id, userId: currentUser?._id })
                    )
                  }
                />
              </>
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
          {post.img ? (
            <img
              src={ post.img }
              alt="post-image"
              loading="lazy"
              class="responsive-img"
            />
            ) : null}
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
          <span
            className="post-comment-counter body-typo-md text-medium-weight pointer"
            onClick={() => setShowCommentBox((prev) => !prev)}
          >
            {comments.length} comments
          </span>
        </div>
        {showCommentBox ? (
          <div className="comments-container">
            <div className="comment-box">
              <InputField
                type="text"
                name="comment-input"
                id="comment-input"
                required={true}
                validation={true}
                placeholder="Enter your comment"
                parentClass="comment-input-field-parent"
                customClass="comment-input-field"
                textarea={false}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                buttonText={"Comment"}
                onClick={(e) => {
                  dispatch(
                    addComment({
                      postId: post._id,
                      comment: comment,
                      profilePicture: currentUser?.profilePicture,
                      userId: currentUser?._id,
                      username: currentUser?.username,
                    })
                  );
                  setComment("");
                }}
                buttonStyle="comment-btn btn-outline-primary body-typo-md"
              />
            </div>
            {comments.length > 0
              ? comments.map((comment,index) => {
                  return (
                    <div className="comment" key={index}>
                      <div class="avatar avatar-xs">
                        <img
                          src={
                            comment.profilePicture
                              ? comment.profilePicture
                              : dummy
                          }
                          alt="avatar"
                          loading="lazy"
                          className="responsive-img circular-img"
                        />
                      </div>
                      <div className="flex-column comment-text">
                        <span className="body-typo-sm text-medium-weight">
                          {comment.username}
                        </span>
                        <span className="body-typo-sm text-regular-weight">
                          {comment.comment}
                        </span>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
