import React from "react";

const Button = (props) => {
  const { buttonText, buttonStyle, onClick, icon,type} = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`margin-trb-16 btn btn-filled-primary ${buttonStyle}`}
    >
      {buttonText}
      {" "}
      {icon ? icon : null}
    </button>
  );
};

export default Button;
