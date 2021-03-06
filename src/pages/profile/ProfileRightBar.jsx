import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import dummy from "../../components/Header/dummy_profile_img.png";
import { Loader } from "../../components/Loader/Loader";
import { followUser, unFollowUser } from "../../reducers/userSlice";

const ProfileRightBar = () => {
  const { user, visitingUser } = useSelector((state) => state.user);
  const { userId } = useParams();
  const userProfile = user?._id === userId ? user : visitingUser;
  const [
    isCurrentUserFollowingVisitingUser,
    setIsCurrentUserFollowingVisitingUser,
  ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const x = user?.following?.filter((foll) =>
      foll._id === userId ? foll : "null"
    );
    setIsCurrentUserFollowingVisitingUser(x?.length === 0 ? false : true);
  }, [userId, user]);
  return user ? (
    <div className="right-bar-profile-container">
      {user && visitingUser && user._id !== userId ? (
        <Button
          buttonText={
            isCurrentUserFollowingVisitingUser ? "Unfollow" : "Follow"
          }
          onClick={(e) => {
            user?.following?.filter((foll) => foll._id === userId).length > 0
              ? dispatch(
                  unFollowUser({ targetUserId: userId, userId: user._id })
                )
              : dispatch(
                  followUser({ targetUserId: userId, userId: user._id })
                );
          }}
        />
      ) : null}
      
      <h4 className="right-bar-title">Following</h4>
      <div className="right-bar-friend-followings">
        {userProfile ? (
          userProfile.following.length === 0 ? (
            <h6 className="no-friends">{userProfile.username} does not have any friends yet</h6>
          ) : (
            userProfile?.following?.map((friend) => {
              return (
                <div
                  className="right-bar-friend-following"
                  onClick={() => navigate(`/profile/${friend._id}`)}
                >
                  <img
                    src={friend.img ? friend.img : dummy}
                    alt="avatar"
                    loading="lazy"
                    className="right-bar-friend-following-img"
                  />
                  <span className="typo-xs friend-following-name">
                    {friend.username}
                  </span>
                </div>
              );
            })
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  ) : (
    <div className="loader-container">
      <Loader />
    </div>
  );
};

export default ProfileRightBar;
