import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "../../components";
import dummy from "../../components/Header/dummy_profile_img.png";
import { Loader } from "../../components/Loader/Loader";
import { getAllUsers, followUser } from "../../reducers/userSlice";

const HomeRightbar = () => {
  const dispatch = useDispatch();
  const { user, allUsers, fetchingAllUsersStatus } = useSelector(
    (state) => state.user
  );
  const followSuggestionsArr = allUsers?.filter(
    (ar) => !user?.following?.find((rm) => rm._id === ar._id)
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div className="right-bar-container">
      <h5>Who to follow</h5>

      <div className="follow-suggestion-container">
        {fetchingAllUsersStatus === "loading" ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          followSuggestionsArr.map((suggestion, index) => {
            if (index > 4) {
              return;
            } else {
              return (
                <div
                  className="flex-row flex-align-item-center flex-justify-content-space-between"
                  key={index}
                >
                  <div
                    className="flex-row flex-align-item-center cursor-pointer"
                    onClick={() => navigate(`/profile/${suggestion._id}`)}
                  >
                    <div className="avatar avatar-sm">
                      <img
                        src={
                          suggestion?.profilePicture
                            ? suggestion?.profilePicture
                            : dummy
                        }
                        alt="avatar"
                        loading="lazy"
                        className="responsive-img circular-img "
                      />
                    </div>
                    <span className="typo-xs">{suggestion.username}</span>
                  </div>
                  {/* <Button
                    buttonText="Follow"
                    buttonStyle="margin0 padding0 follow-btn"
                    onClick={() => {
                      dispatch(
                        followUser({
                          targetUserId: suggestion._id,
                          userId: user._id,
                        })
                      );
                    }}
                  /> */}
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default HomeRightbar;

{
  /* <img
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
              /> */
}
