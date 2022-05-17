import SearchBar from "./SearchBar";
import { ReactComponent as DetailedLogo } from "./TREK-GRAM-LOGO.svg";
import { Link,useNavigate } from "react-router-dom";
import "./header.css";
import Button from "../Buttons/Button";
import BadgeIconButton from "../Buttons/BadgeIconButton";
import { Person, Chat, Notifications } from "@material-ui/icons";
import dummy from "./dummy_profile_img.png";
const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Link to="/">
        <DetailedLogo />
        <span className="show-mobile-logo">{/* <MobileLogo /> */}</span>
      </Link>
      <SearchBar />
      <div className="nav-section">
        <Button
          buttonText={"Homepage"}
          buttonStyle={"headerButton body-typo-md secondary-button margin0 padding0"}
          onClick={() => {}}
        />
        <Button
          buttonText={"Timeline"}
          buttonStyle={"headerButton body-typo-md secondary-button margin0 padding0"}
          onClick={() => {}}
        />
      </div>
      <div className="nav-section">
        <Button
          buttonText={"Login"}
          buttonStyle={"headerButton typo-sm "}
          onClick={() => {navigate('/login')}}
        />
      </div>
      <div className="nav-section">
        <BadgeIconButton
          icon={<Person />}
          badgeNumber={2}
          badgeIconButtonWrapper="badge-icon-button-wrapper"
        />
        <BadgeIconButton
          icon={<Chat />}
          badgeNumber={2}
          badgeIconButtonWrapper="badge-icon-button-wrapper"
        />
        <BadgeIconButton
          icon={<Notifications />}
          badgeNumber={2}
          badgeIconButtonWrapper="badge-icon-button-wrapper"
        />
        <div class="avatar avatar-sm margin-trb-16">
          <img
            src={dummy}
            alt="avatar"
            loading="lazy"
            className="responsive-img circular-img"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
