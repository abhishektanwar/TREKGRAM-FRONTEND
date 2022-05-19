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
    // uploadBytes(imageRef,imgUpload).then((data)=>{
    //   alert("Image uploaded")
    //   console.log("data img upload",data)
    //   getDownloadURL(ref).then((data)=>console.log("url_data"),data)
    // })
    const uploadByteRes = await uploadBytes(imageRef,imgUpload)
    console.log("upload bytes",uploadByteRes)
    const downloadUrl = await getDownloadURL(imageRef);
    console.log("download url",downloadUrl);
  }
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
          buttonText={authToken ? "Logout" : "Login"}
          buttonStyle={"headerButton typo-sm "}
          onClick={() => {authToken ? dispatch(logout()) : navigate('/login')}}
        />
        <input type="file" onChange={(e)=>setImageUpload(e.target.files[0])} />
        <Button
          buttonText={"upload img"}
          buttonStyle={"headerButton typo-sm "}
          onClick={() => {uploadImage()}}
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
