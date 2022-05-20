import SearchBar from "./SearchBar";
import { ReactComponent as DetailedLogo } from "./TREK-GRAM-LOGO.svg";
import { Link,useNavigate } from "react-router-dom";
import "./header.css";
import Button from "../Buttons/Button";
import BadgeIconButton from "../Buttons/BadgeIconButton";
import { Person, Chat, Notifications } from "@material-ui/icons";
import dummy from "./dummy_profile_img.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, register } from "../../reducers/userSlice";
import { useState } from "react";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { storage } from "../../firebase";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user,authToken} = useSelector((state)=>state.user)
  const [imgUpload,setImageUpload] = useState(null);
  const uploadImage = async () => {
    if(imgUpload === null) return;
    const imageRef = ref(storage,`images/${imgUpload.name + new Date()}`)
    const uploadByteRes = await uploadBytes(imageRef,imgUpload)
    console.log("upload bytes",uploadByteRes)
    const downloadUrl = await getDownloadURL(imageRef);
    console.log("download url",downloadUrl);
  }
  return (
    <>
      <Link to="/home">
        <DetailedLogo />
        <span className="show-mobile-logo">{/* <MobileLogo /> */}</span>
      </Link>
      <SearchBar />
      <div className="nav-section">
      </div>
      <div className="nav-section">
        <Button
          buttonText={authToken ? "Logout" : "Login"}
          buttonStyle={"headerButton typo-sm "}
          onClick={() => {authToken ? dispatch(logout()) : navigate('/login')}}
        />
      </div>
      <div className="nav-section">
        {/* <BadgeIconButton
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
        /> */}
        {/* <div class="avatar avatar-sm margin-trb-16">
          <img
            src={dummy}
            alt="avatar"
            loading="lazy"
            className="responsive-img circular-img"
          />
        </div> */}
      </div>
    </>
  );
};

export default Header;
