import React, { createContext, useContext, useState } from 'react'
// import { useAuth } from '../AuthDialogContext';

const ModalContext = createContext();

const ModalProvider = ({children}) => {
  const [isModalVisible,setIsModalVisible] = useState(false);
  // const {setAuthType} = useAuth();
  // const {setShowPlaylistCreationModal} = usePlaylist()

  const hideModal = () => {
    // setAuthType(null);
    setIsModalVisible(false)
  }

  const showModal = () =>{
    setIsModalVisible(true);
  }
  return (
    <ModalContext.Provider value={{isModalVisible,hideModal,showModal}}>
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext);

export {ModalProvider, useModal};