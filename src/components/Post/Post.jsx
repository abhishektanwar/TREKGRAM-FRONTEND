import "./post.css";
import dummy from "../Header/dummy_profile_img.png";
import { MoreVert, ThumbUpOutlined } from "@material-ui/icons";
import {} from "react-router-dom";
import Button from "../Buttons/Button";
const Post = ({ post }) => {
  const { username, userId, desc, comments, likes, profilePrcture,createdAt } = post;
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
            <Button
              icon={<MoreVert />}
              buttonStyle="secondary-button margin0 padding0"
            />
          </div>
        </div>
        <div className="post-middle-section">
          <p className="post-text-body body-typo-md">
            {desc}
          </p>
          <img
            src={dummy}
            alt="post-image"
            loading="lazy"
            class="responsive-img"
          />
        </div>
        <div className="post-bottom-section flex-row">
          <div className="post-bottom-left flex-row flex-align-item-center">
            <Button
              icon={<ThumbUpOutlined fontSize="large" />}
              buttonStyle="secondary-button margin0 padding0"
            />
            <span className="like-counter body-typo-md text-medium-weight">
              {likes.length} likes
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
