import dummy from "../../components/Header/dummy_profile_img.png";

const ProfileRightBar = () => {
  return (
    <div className="right-bar-profile-container">
      <h4 className="right-bar-title">User Information</h4>
      <div className="right-bar-info">
        <div className="right-bar-info-item">
          <span className="right-bar-info-key typo-sm text-medium-weight">City: </span>
          <span className="right-bar-info-value typo-sm">New York</span>
        </div>
        <div className="right-bar-info-item">
          <span className="right-bar-info-key typo-sm text-medium-weight">City: </span>
          <span className="right-bar-info-value typo-sm">New York</span>
        </div>
        <div className="right-bar-info-item">
          <span className="right-bar-info-key typo-sm text-medium-weight">City: </span>
          <span className="right-bar-info-value typo-sm">New York</span>
        </div>
      </div>
      <h4 className="right-bar-title">User Friends</h4>
      <div className="right-bar-friend-followings">
        <div className="right-bar-friend-following">
          <img
            src={dummy}
            alt="avatar"
            loading="lazy"
            className="right-bar-friend-following-img"
          />
          <span className="typo-xs friend-following-name">Friend name</span>
        </div>
        <div className="right-bar-friend-following">
          <img
            src={dummy}
            alt="avatar"
            loading="lazy"
            className="right-bar-friend-following-img"
          />
          <span className="typo-xs friend-following-name">Friend name</span>
        </div>
        <div className="right-bar-friend-following">
          <img
            src={dummy}
            alt="avatar"
            loading="lazy"
            className="right-bar-friend-following-img"
          />
          <span className="typo-xs friend-following-name">Friend name</span>
        </div>
        <div className="right-bar-friend-following">
          <img
            src={dummy}
            alt="avatar"
            loading="lazy"
            className="right-bar-friend-following-img"
          />
          <span className="typo-xs friend-following-name">Friend name</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileRightBar;
