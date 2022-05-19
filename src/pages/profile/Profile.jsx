import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Feed,
  Header,
  LeftSidebar,
  RightSidebar,
} from "../../components";
import dummy from "../../components/Header/dummy_profile_img.png";
import { loadPosts, loadUserPosts } from "../../reducers/counterSlice";

import "./profile.css";
import ProfileRightBar from "./ProfileRightBar";
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserPosts({ userId: user?._id }));
  }, []);

  return (
    <div>
      <nav className="nav-bar shadow-box" id="my-nav-bar">
        <Header />
      </nav>
      <div className="flex-row profile-container app-container">
        <LeftSidebar />
        <div className="profile-right">
          <div className="profile-right-top flex-column">
            <div className="profile-cover">
              <img
                src={dummy}
                alt="avatar"
                loading="lazy"
                className="responsive-img profile-cover-img"
              />
              <div className="profile-user-info">
                <div className="avatar avatar-md profile-user-img">
                  <img
                    src={dummy}
                    alt="avatar"
                    loading="lazy"
                    className="responsive-img circular-img "
                  />
                </div>
              </div>
            </div>
            <div className="user-info flex-column">
              <h4 className="margin0 user-name">user name</h4>
              <span className="body-typo-md user-handle">@user_handle</span>
              <Button buttonText="Edit Profile" buttonStyle="edit-profile-btn" />
              <span className="user-bio body-typo-sm">
                A paragraph is a series of related sentences developing a
                central idea, called the topic. Try to think about paragraphs in
                terms of thematic unity: a paragraph is a sentence or a group of
                sentences that supports one central, unified ideas of thematic
                unity: a paragraph is a sentence or a group of{" "}
              </span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed posts={finalFilteredPosts} status={status} error={error} />
            <RightSidebar component={<ProfileRightBar />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
