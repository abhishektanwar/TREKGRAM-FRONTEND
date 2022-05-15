import React from "react";

const BadgeIconButton = (props) => {
  const { badgeNumber, icon, badgeIconButtonWrapper, onClick } = props;
  return (
    // <div>
      <button onClick={onClick} className={`btn ${badgeIconButtonWrapper}`}>
        <span className="badge-icon badge-container">
          {icon}
          {badgeNumber ? (
            <span className="badge-status-default badge-status-number badge-button-text">
              {badgeNumber}
            </span>
          ) : null}
        </span>
        {/* {icon} */}
      </button>
    // </div>
  );
};

export default BadgeIconButton;
