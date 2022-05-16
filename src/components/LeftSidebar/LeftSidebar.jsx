import "./left-sidebar.css";
import {
  HomeOutlined,
  RssFeed,
  BookmarkBorder,
  AccountCircleOutlined,
} from "@material-ui/icons";
import Button from "../Buttons/Button";

const NavButton = ({ buttonText, icon }) => {
  return (
    <Button
      buttonStyle="left-sidebar-nav-btn"
      icon={icon}
      buttonText={buttonText}
    />
  );
};

const LeftSidebar = () => {
  return (
    <div className="left-sidebar-container">
      <div className="left-sidebar-wrapper">
        <ul className="sidebar-list padding0">
          <li className="sidebar-list-item">
            <NavButton
              buttonText="Feed"
              icon={<HomeOutlined fontSize="large" />}
            />
          </li>
          <li className="sidebar-list-item">
            <NavButton
              buttonText="Explore"
              icon={<RssFeed fontSize="large" />}
            />
          </li>
          <li className="sidebar-list-item">
            <NavButton
              buttonText="Bookmark"
              icon={<BookmarkBorder fontSize="large" />}
            />
          </li>
          <li className="sidebar-list-item">
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
