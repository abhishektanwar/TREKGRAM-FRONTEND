import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Feed, Header, LeftSidebar, RightSidebar } from '../../components'
import { loadPosts } from '../../reducers/counterSlice'
import './home.css'
const Home = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.user);
  const {posts,status,error} = useSelector((state)=>state.counter);

  // const {} = useElec
  useEffect(()=>{
    dispatch(loadPosts({userId:user?._id}))
  },[])
  return (
    <div>
      <nav className="nav-bar shadow-box" id="my-nav-bar">
          <Header />
      </nav>
      <div className="flex-row home-container app-container">
        <LeftSidebar />
        <Feed posts={posts} status={status} error={error} />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home
