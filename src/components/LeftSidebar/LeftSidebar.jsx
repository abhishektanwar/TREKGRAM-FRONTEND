import "./left-sidebar.css";
import { HomeOutlined,RssFeed,BookmarkBorder,AccountCircleOutlined } from "@material-ui/icons";
import Button from "../Buttons/Button";
const LeftSidebar = () => {
  return (
    <div className="left-sidebar-container">
      <div className="left-sidebar-wrapper">
        <ul className="sidebar-list padding0">
          <li className="sidebar-list-item">
            <Button
              buttonStyle="secondary-button margin0 flex-align-item-center flex-row"
              icon={<HomeOutlined fontSize="large" />}
              buttonText="Feed"
            />
          </li>
          <li className="sidebar-list-item">
            <Button
              buttonStyle="secondary-button margin0 flex-align-item-center flex-row"
              icon={<RssFeed fontSize="large" />}
              buttonText="Explore"
            />
          </li>
          <li className="sidebar-list-item">
            <Button
              buttonStyle="secondary-button margin0 flex-align-item-center flex-row"
              icon={<BookmarkBorder fontSize="large" />}
              buttonText="Bookmark"
            />
          </li>
          <li className="sidebar-list-item">
            <Button
              buttonStyle="secondary-button margin0 flex-align-item-center flex-row"
              icon={<AccountCircleOutlined fontSize="large" />}
              buttonText="Profile"
            />
          </li>
          
          
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
