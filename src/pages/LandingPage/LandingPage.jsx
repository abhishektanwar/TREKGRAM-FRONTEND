import { useNavigate } from "react-router";
import { Button } from "../../components";
import utils from "../../utils";
import { useDocumentTitle } from "../../helpers/helpers";
import "./landing-page.css";
const LandingPage = () => {
  useDocumentTitle("TrekGram");
  const navigate = useNavigate();
  return (
    <div className="landing-page-container">
      <div className="grid-2-column-layout margin-top-60" style={{width:"100%"}}>
        <div className="horizontal-card flex-align-item-center flex-justify-content-center">
          <div className="text-container">
            <div className="typo-md feature" >
              FOLLOW{" "}
              <span className="body-typo-md text-bold-weight">
                PEOPLE AROUND THE GLOBE
              </span>
            </div>
            <div className="typo-md feature" >
              Connect{" "}
              <span className="body-typo-md text-bold-weight">
                WITH YOUR FRIENDS
              </span>
            </div>
            <div className="typo-md feature" >
              SHARE{" "}
              <span className="body-typo-md text-bold-weight">
                WHAT YOU THINK
              </span>
            </div>

            <Button
              onClick={() => {
                navigate("/register");
              }}
              buttonText={"Join Now"}
              buttonStyle={"typo-sm"}
             
            />
            <Button
              onClick={() => {
                navigate("/login");
              }}
              buttonText={"Already have an account ?"}
              buttonStyle={"typo-sm secondary-button primary-color"}
            />
          </div>
        </div>
        <div className="flex-row flex-justify-content-center">
          <img
            loading="lazy"
            className="responsive-img"
            src={utils.getImg("landing-page-banner-image.svg")}
            style={{ maxWidth: "340px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
