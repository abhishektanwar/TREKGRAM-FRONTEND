import React from "react";

const BadgeIconButton = (props) => {
  const { badgeNumber, icon, badgeIconButtonWrapper, onClick } = props;
  return (
      <button onClick={onClick} className={`btn ${badgeIconButtonWrapper}`}>
        <span className="badge-icon badge-container">
          {icon}
          {badgeNumber ? (
            <span className="badge-status-default badge-status-number badge-button-text">
              {badgeNumber}
            </span>
          ) : null}
        </span>
      </button>
  );
};

export default BadgeIconButton;
