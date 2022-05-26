import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import {
  Button,
  Feed,
  Header,
  LeftSidebar,
  RightSidebar,
} from "../../components";
import EditProfile from "../../components/EditProfile/EditProfile";
import dummy from "../../components/Header/dummy_profile_img.png";
import ModalWrapper from "../../components/ModalWrapper";
import { useModal } from "../../contexts/ModalContext";
import { loadPosts, loadUserPosts } from "../../reducers/postSlice";
import { getUser } from "../../reducers/userSlice";
import { useDocumentTitle } from '../../helpers/helpers'

import "./profile.css";
import ProfileRightBar from "./ProfileRightBar";
const Profile = () => {
  useDocumentTitle("TrekGram | Profile")
  const { user, visitingUser } = useSelector((state) => state.user);
  const { userPosts, status, error, filterType } = useSelector(
    (state) => state.counter
  );
  const { userId } = useParams();
  const userProfile = user?._id === userId ? user : visitingUser;
  const dispatch = useDispatch();
  const { showModal, hideModal } = useModal();
  useEffect(() => {
    dispatch(loadUserPosts({ userId }));
    if (user?._id !== userId) {
      dispatch(getUser({ userId }));
    }
  }, [userId]);

  return (
    <div>
      <div className="flex-row profile-container app-container">
        <LeftSidebar user={user} />
        <div className="profile-right">
          <div className="profile-right-top flex-column">
            <div className="profile-cover">
              <img
                src={
                  userProfile?.coverPicture ? userProfile?.coverPicture : dummy
                }
                alt="avatar"
                loading="lazy"
                className="responsive-img profile-cover-img"
              />
              <div className="profile-user-info">
                <div className="avatar avatar-md profile-user-img">
                  <img
                    src={
                      userProfile?.profilePicture
                        ? userProfile?.profilePicture
                        : dummy
                    }
                    alt="avatar"
                    loading="lazy"
                    className="responsive-img circular-img "
                  />
                </div>
              </div>
            </div>
            <div className="user-info flex-column">
              <h4 className="margin0 user-name">{userProfile?.username}</h4>
              {/* <span className="body-typo-md user-handle">@user_handle</span> */}
              {user?._id === userId && (
                <Button
                  buttonText="Edit Profile"
                  buttonStyle="edit-profile-btn"
                  onClick={() => {
                    showModal();
                  }}
                />
              )}

              <ModalWrapper>
                <EditProfile />
              </ModalWrapper>
              <span className="user-bio body-typo-sm">{userProfile?.bio}</span>
              
              <a href={userProfile?.portfolioLink} className="portfolio-link body-typo-sm "  >{userProfile?.portfolioLink}</a>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed posts={userPosts} status={status} error={error} />
            <RightSidebar component={<ProfileRightBar />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
