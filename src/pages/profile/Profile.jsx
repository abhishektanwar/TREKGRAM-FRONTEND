import {
  Button,
  Feed,
  Header,
  LeftSidebar,
  RightSidebar,
} from "../../components";
import dummy from "../../components/Header/dummy_profile_img.png";

import "./profile.css";
const Profile = () => {
  return (
    <div>
      <nav className="nav-bar shadow-box" id="my-nav-bar">
        <Header />
      </nav>
      <div className="flex-row profile-container">
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
                  <h4 className="margin0">user name</h4>
                  <span className="typo-xs">@user_handle</span>
                  {/* <Button buttonText="Edit Profile" /> */}
                  <span className="user-bio body-typo-sm">A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified ideas of thematic unity: a paragraph is a sentence or a group of </span>
                </div>
          </div>
          <div className="profile-right-bottom">
            <Feed />
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
