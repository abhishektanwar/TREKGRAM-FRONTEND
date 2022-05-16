import "./share.css";
import dummy from "../Header/dummy_profile_img.png";
import InputField from "../InputField";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import Button from "../Buttons/Button";
import Post from "../Post/Post";
const Share = () => {
  return (
    <div className="share-container">
      <div className="share-wrapper shadow-box">
        <div className="share-top-section flex-row flex-align-item-center">
          <div class="avatar avatar-sm">
            <img
              src={dummy}
              alt="avatar"
              loading="lazy"
              className="responsive-img circular-img"
            />
          </div>
          <InputField
            type="text"
            name=""
            id=""
            placeholder="What's on your mind <username>"
            required={true}
            validation={true}
            customClass="share-input-field"
            textarea={true}
          />
        </div>
        <div className="share-bottom-section flex-row">
          <div className="share-options flex-row flex-justify-content-space-between">
            <Button
              buttonStyle="share-action-btn body-typo-sm"
              icon={<PermMedia htmlColor="tomato" fontSize="medium" />}
              buttonText="Photo or video"
            />
            <Button
              buttonStyle="share-action-btn body-typo-sm"
              icon={<Label htmlColor="blue" fontSize="medium" />}
              buttonText="Tag"
            />
            <Button
              buttonStyle="share-action-btn body-typo-sm"
              icon={<Room htmlColor="green" fontSize="medium" />}
              buttonText="Location"
            />
            <Button
              buttonStyle="share-action-btn body-typo-sm"
              icon={<EmojiEmotions htmlColor="goldenrod" fontSize="medium" />}
              buttonText="Feelings"
            />
          </div>
          <Button buttonText="Post" buttonStyle="post-btn" />
        </div>
      </div>
    </div>
  );
};

export default Share;
