import Feed from '../../components/Feed/Feed'
import Header from '../../components/Header/Header'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import './home.css'
const Home = () => {
  return (
    <div>
      {/* home apge */}
      <nav className="nav-bar shadow-box" id="my-nav-bar">
          <Header />
      </nav>
      <div className="flex-row home-container">
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home
