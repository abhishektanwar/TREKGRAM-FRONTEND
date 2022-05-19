import "./share.css";
import dummy from "../Header/dummy_profile_img.png";
import InputField from "../InputField";
import { PermMedia, Cancel } from "@material-ui/icons";
import Button from "../Buttons/Button";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createNewPost,
  finishPostEdit,
  updatePost,
  uploadPostImage,
} from "../../reducers/postSlice";
import { Loader } from "../Loader/Loader";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useParams } from "react-router";
const Share = () => {
  const { user } = useSelector((state) => state.user);
  const { postCreatedStatus, isEditingPost, updatingPost } = useSelector(
    (state) => state.counter
  );

  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  console.log("isEduting",isEditingPost)
  console.log("file",file,updatingPost)

  const dispatch = useDispatch();

  const handleSharePost = async (e) => {
    e.preventDefault();
    let newPost = {
      userId: user?._id,
      desc: description,
    };

    if (file !== null) {
      const imageRef = ref(
        storage,
        `images/${file.name + new Date().toLocaleTimeString()}`
      );
      const uploadByteRes = await uploadBytes(imageRef, file);
      const downloadUrl = await getDownloadURL(imageRef);
      newPost.img = downloadUrl;
    }

    dispatch(createNewPost(newPost));
  };

  const handleUpdatePost = async () => {
    console.log("updating post", updatingPost);
    let downloadUrl = "";
    if (file !== null) {
      const imageRef = ref(
        storage,
        `images/${file.name + new Date().toLocaleTimeString()}`
      );
      const uploadByteRes = await uploadBytes(imageRef, file);
      downloadUrl = await getDownloadURL(imageRef);
      // newPost.img = downloadUrl;
    }
    dispatch(
      updatePost({
        postId: updatingPost._id,
        data: { desc: description, img: downloadUrl ?? updatingPost.img },
      })
    );
  };
  useEffect(() => {
    if (postCreatedStatus === "fulfilled") {
      // setFile(null)
      setDescription("");
      setFile(null);
    }
  }, [postCreatedStatus]);

  useEffect(() => {
    if (isEditingPost) {
      setDescription(updatingPost.desc);
      setFile(updatingPost.img)
    }
  }, [isEditingPost]);
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
        {file && (
          <div className="share-image-container">
            <img
              src="share-img"
              className="responsive-img"
              src={ isEditingPost ? updatingPost?.img : URL.createObjectURL(file)}
              alt=""
            />
            <Cancel
              onClick={() => setFile(null)}
              className="share-cancel-btn"
            />
          </div>
        )}
        {/* <form
          onSubmit={(e) => handleSharePost(e)}
          className="share-bottom-section flex-row"
        > */}
        <div className="share-options flex-row flex-justify-content-space-between">
          {/* <Button
              buttonStyle="share-action-btn body-typo-sm"
              icon={<PermMedia htmlColor="tomato" fontSize="medium" />}
              buttonText="Photo or video"
            /> */}
          <label
            htmlFor="file"
            className={`margin-trb-16 btn btn-filled-primary ${"share-action-btn body-typo-sm"}`}
          >
            <PermMedia htmlColor="tomato" fontSize="medium" />
            <span>{"Photo or video"} </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg,.gif"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          {/* <Button
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
            /> */}
        </div>
        {/* </form> */}
        <div className="create-update-post-btn-container">
          <Button
            buttonText={isEditingPost ? "Update Post" : "Post"}
            onClick={(e) =>
              isEditingPost ? handleUpdatePost(e) : handleSharePost(e)
            }
            buttonStyle="post-btn"
          />
          {isEditingPost && (
            <Button
              buttonText={"Cancel"}
              onClick={(e) => {
                dispatch(finishPostEdit())
                setDescription("")
                setFile(null)
              }}
              buttonStyle="post-btn secondary-button"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Share;
