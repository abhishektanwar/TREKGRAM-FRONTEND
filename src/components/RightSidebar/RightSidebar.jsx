import './right-sidebar.css'

const HomeRightBar = () => {
  return <>RIGHTBAR</>
}
const RightSidebar = ({component}) => {
  return (
    <div className="right-sidebar-container">
      <div className="right-sidebar-wrapper">
        {component ?? <HomeRightBar />}
      </div>
    </div>
  )
}

export default RightSidebar
