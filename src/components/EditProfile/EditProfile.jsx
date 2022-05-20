import "./edit-profile.css";
import { AddPhotoAlternate } from "@material-ui/icons";
import dummy from "../../components/Header/dummy_profile_img.png";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import { updateUser } from "../../reducers/userSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({
    coverPicture: user.coverPicture ? user.coverPicture : null,
    profilePicture: user.profilePicture ? user.profilePicture : null,
    username: user.username,
    bio: user.bio,
    portfolioLink: user.portfolioLink,
  });
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState({
    profilePicture: null,
    coverPicture: null,
  });

  const handleProfileSave = async () => {
    var profilePictureUrl = profileData.profilePicture;
    var coverPictureUrl = profileData.coverPicture;
    setSaving(true);
    if (file.profilePicture !== null) {
      const imageRef = ref(
        storage,
        `images/${file.profilePicture.name + new Date().toLocaleTimeString()}`
      );
      const uploadByteRes = await uploadBytes(imageRef, file.profilePicture);
      profilePictureUrl = await getDownloadURL(imageRef);
      console.log("profilePictureUrl", profilePictureUrl);
    }

    if (file.coverPicture !== null) {
      const imageRef = ref(
        storage,
        `images/${file.coverPicture.name + new Date().toLocaleTimeString()}`
      );
      const uploadByteRes = await uploadBytes(imageRef, file.coverPicture);
      coverPictureUrl = await getDownloadURL(imageRef);
    }

    dispatch(
      updateUser({
        userId: user._id,
        data: {
          ...profileData,
          userId: user._id,
          profilePicture: profilePictureUrl,
          coverPicture: coverPictureUrl,
        },
      })
    );
    setSaving(false);
  };

  return user ? (
    <div className="edit-profile-container">
      <div className="edit-profile-image-wrapper">
        <div className="image-upload-container">
          <label
            htmlFor="profilePicture"
            className={`margin-trb-16 btn btn-filled-primary ${"share-action-btn body-typo-sm"}`}
          >
            <div className="avatar avatar-md profile-img-container">
              <img
                src={
                  profileData.profilePicture
                    ? profileData.profilePicture
                    : file.profilePicture
                    ? URL.createObjectURL(file.profilePicture)
                    : dummy
                  // dummy
                }
                alt="avatar"
                loading="lazy"
                className="responsive-img circular-img "
              />
              <AddPhotoAlternate
                fontSize="large"
                className="image-upload-icon"
              />
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              id="profilePicture"
              accept=".png,.jpeg,.jpg,.gif"
              onChange={(e) => {
                setProfileData((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.files[0],
                }));
                setFile((prev) => ({
                  ...prev,
                  profilePicture: e.target.files[0],
                }));
              }}
            />
          </label>
          <h5 className="edit-profile-label">Profile Picture</h5>
        </div>
        <div className="image-upload-container">
          <label
            htmlFor="coverPicture"
            className={`margin-trb-16 btn btn-filled-primary ${"share-action-btn body-typo-sm"}`}
          >
            <div className="profile-img-container">
              <img
                src={
                  profileData.coverPicture
                    ? profileData.coverPicture
                    : file.coverPicture !== null
                    ? URL.createObjectURL(file.coverPicture)
                    : dummy
                }
                alt="avatar"
                loading="lazy"
                className="responsive-img cover-image"
              />
              <AddPhotoAlternate
                fontSize="large"
                className="image-upload-icon"
              />
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              id="coverPicture"
              accept=".png,.jpeg,.jpg,.gif"
              onChange={(e) => {
                setProfileData((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.files[0],
                }));
                setFile((prev) => ({
                  ...prev,
                  coverPicture: e.target.files[0],
                }));
              }}
            />
          </label>

          <h5 className="edit-profile-label">Cover Image</h5>
        </div>
      </div>
      <div>
        <InputField
          type="text"
          name="username"
          labelClass="edit-profile-input-field-label"
          id="username"
          labelText="User Name"
          customClass="edit-profile-input-field"
          parentClass="edit-profile-input-field-container"
          value={profileData.username}
          onChange={(e) =>
            setProfileData((prev) => ({
              ...prev,
              [e.target.id]: e.target.value,
            }))
          }
          validation={true}
        />
        <InputField
          type="text"
          name="bio"
          id="bio"
          labelText="Bio"
          labelClass="edit-profile-input-field-label"
          validation={true}
          customClass="edit-profile-input-field"
          textarea={true}
          parentClass="edit-profile-input-field-container"
          value={profileData.bio}
          onChange={(e) =>
            setProfileData((prev) => ({
              ...prev,
              [e.target.id]: e.target.value,
            }))
          }
        />
        <InputField
          type="text"
          name="website"
          labelClass="edit-profile-input-field-label"
          id="portfolioLink"
          labelText="Website"
          parentClass="edit-profile-input-field-container"
          customClass="edit-profile-input-field"
          value={profileData.portfolioLink}
          onChange={(e) =>
            setProfileData((prev) => ({
              ...prev,
              [e.target.id]: e.target.value,
            }))
          }
          validation={true}
        />
      </div>
      <Button
        buttonText={saving ? <Loader /> : "SAVE"}
        buttonStyle="save-profile-btn"
        onClick={() => {
          handleProfileSave();
        }}
      />
    </div>
  ) : (
    <div className="loader-container">
      <Loader />
    </div>
  );
};

export default EditProfile;
