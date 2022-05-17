import { Feed, Header, LeftSidebar, RightSidebar } from '../../components'
import './home.css'
const Home = () => {
  return (
    <div>
      <nav className="nav-bar shadow-box" id="my-nav-bar">
          <Header />
      </nav>
      <div className="flex-row home-container app-container">
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home
