import "./share.css";
import dummy from "../Header/dummy_profile_img.png";
import InputField from "../InputField";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import Button from "../Buttons/Button";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import { useState } from "react";
const Share = () => {
  const { user } = useSelector((state) => state.user);
  const [description, setDescription] = useState("");
  const [file,setFile] = useState(null)

  const handleSharePost = (e) => {
    console.log("file",file);
    console.log("desc",description);
  }
  return (
    <div className="share-container">
      <div className="share-wrapper shadow-box">
        <div className="share-top-section flex-row flex-align-item-center">
          <div class="avatar avatar-sm">
            <img
              src={user?.profilePicture ?? dummy}
              alt="avatar"
              loading="lazy"
              className="responsive-img circular-img"
            />
          </div>
          <InputField
            type="text"
            name=""
            id=""
            placeholder={`What's on your mind ${user?.username}`}
            required={true}
            validation={true}
            customClass="share-input-field"
            textarea={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="share-bottom-section flex-row">
          <div className="share-options flex-row flex-justify-content-space-between">
            {/* <Button
              buttonStyle="share-action-btn body-typo-sm"
              icon={<PermMedia htmlColor="tomato" fontSize="medium" />}
              buttonText="Photo or video"
            /> */}
            <label htmlFor="file"
              // type={type}
              // onClick={onClick}
              className={`margin-trb-16 btn btn-filled-primary ${"share-action-btn body-typo-sm"}`}
            >
              <PermMedia htmlColor="tomato" fontSize="medium" />
              <span>{"Photo or video"}{" "}</span>
              <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg,.gif" onChange={(e)=>setFile(e.target.files[0])} />
            </label>
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
          <Button buttonText="Post" buttonStyle="post-btn" onClick={handleSharePost} />
        </div>
      </div>
    </div>
  );
};

export default Share;
