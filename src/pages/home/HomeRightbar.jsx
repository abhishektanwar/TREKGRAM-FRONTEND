import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="right-bar-container">
      <h5>Who to follow</h5>

      <div className="follow-suggestion-container">
        {fetchingAllUsersStatus === "loading" ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : allUsers?.length === 0 ? (
          <h3>Currently no users are available to follow</h3>
        ) : (
          allUsers?.map((suggestion, index) => {
            if (index > 4) {
              return;
            } else {
              return (
                <div
                  className="flex-row flex-align-item-center flex-justify-content-space-between"
                  key={index}
                >
                  <div
                    className="flex-row flex-align-item-center pointer"
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
    // <h2>Hi</h2>
  );
};

export default HomeRightbar;
