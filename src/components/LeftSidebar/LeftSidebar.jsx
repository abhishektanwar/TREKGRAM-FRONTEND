import "./left-sidebar.css";
import {
  HomeOutlined,
  RssFeed,
  BookmarkBorder,
  AccountCircleOutlined,
} from "@material-ui/icons";
import Button from "../Buttons/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavButton = ({ buttonText, icon, onNavBtnClick, active }) => {
  return (
    <Button
      buttonStyle={`left-sidebar-nav-btn ${active}`}
      icon={icon}
      buttonText={buttonText}
      onClick={onNavBtnClick}
    />
  );
};

const LeftSidebar = ({ user }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log("pathname", pathname);
  return (
    <div className="left-sidebar-container">
      <div className="left-sidebar-wrapper">
        <ul className="sidebar-list padding0">
          <li className={`sidebar-list-item ${pathname==="/home" ? 'active-link':null}`} onClick={() => navigate(`/home`)}>
            <NavButton
              buttonText="Feed"
              icon={
                <HomeOutlined
                  fontSize="large"
                  
                />
              }
              
              
            />
          </li>
          <li className={`sidebar-list-item ${pathname==="/explore" ? 'active-link':null}`} onClick={() => navigate(`/explore`)}>
            <NavButton
              buttonText="Explore"
              icon={<RssFeed fontSize="large" />}
              
            />
          </li>
          <li className={`sidebar-list-item ${pathname==="/bookmarks" ? 'active-link':null}`} onClick={() => navigate(`/bookmarks`)}>
            <NavButton
              buttonText="Bookmarks"
              icon={<BookmarkBorder fontSize="large" />}
              
            />
          </li>
          <li className={`sidebar-list-item ${pathname==="/profile/:id" ? 'active-link':null}`} onClick={() => navigate(`/profile/${user._id}`)}>
            <NavButton
              buttonText="Profile"
              icon={<AccountCircleOutlined fontSize="large" />}
              
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
