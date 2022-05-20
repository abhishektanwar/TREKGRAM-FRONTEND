import React, { useContext, useRef } from "react";
import { useModal } from "../../contexts/ModalContext";
import {Close} from '@material-ui/icons';
import "./modal-wrapper.css";
import Button from "../Buttons/Button";
const ModalWrapper = ({children}) => {
  const modalRef = useRef();
  const {isModalVisible,hideModal} = useModal();
  // const {setAuthType} = useAuth()
  // const {setShowPlaylistCreationModal} = usePlaylist();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      hideModal();
    }
  };
  const handleModalClose = () => {
    // setAuthType(false)
    // setShowPlaylistCreationModal(false)
    hideModal()
  }
  return isModalVisible ? (
    <div className="modal-background" onClick={closeModal} ref={modalRef}>
=        {children}
      {/* <button
        className="modal-close-button"
        onClick={() => handleModalClose()}
      >
        <Close />
      </button> */}
        "
      <Button icon={<Close fontSize="large" />} buttonStyle="modal-close-button secondary-button" onClick={() => handleModalClose()} />
    </div>
  ) : null;
};

export default ModalWrapper;
