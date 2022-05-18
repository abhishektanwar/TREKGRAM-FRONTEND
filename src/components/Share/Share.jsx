import "./share.css";
import dummy from "../Header/dummy_profile_img.png";
import InputField from "../InputField";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import Button from "../Buttons/Button";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createNewPost, uploadPostImage } from "../../reducers/counterSlice";
import { Loader } from "../Loader/Loader";
const Share = () => {
  const { user } = useSelector((state) => state.user);
  const { postCreatedStatus } = useSelector((state) => state.counter);

  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSharePost = async (e) => {
    e.preventDefault();
    let newPost = {
      userId: user?._id,
      desc: description,
    };

    dispatch(createNewPost(newPost));
  };

  useEffect(() => {
    if (postCreatedStatus === "fulfilled") {
      // setFile(null)
      setDescription("");
    }
  }, [postCreatedStatus]);
  return (
    <div className="share-container">
      {postCreatedStatus === "loading" && <Loader />}
      <div className="share-wrapper shadow-box">
        <div className="share-top-section flex-row flex-align-item-center">
          <div class="avatar avatar-sm">
            <img
              src={user?.profilePicture ? user?.profilePicture : dummy}
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
        {/* <form onSubmit={(e)=>handleSharePost(e)} className="share-bottom-section flex-row">
          <div className="share-options flex-row flex-justify-content-space-between">
            <Button
              buttonStyle="share-action-btn body-typo-sm"
              icon={<PermMedia htmlColor="tomato" fontSize="medium" />}
              buttonText="Photo or video"
            />
            <label htmlFor="file"
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
        </form> */}
        <Button
          buttonText="Post"
          onClick={(e) => handleSharePost(e)}
          buttonStyle="post-btn"
        />
      </div>
    </div>
  );
};

export default Share;
