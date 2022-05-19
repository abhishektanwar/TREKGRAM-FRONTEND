import './post-filter.css'
import { FilterList } from '@material-ui/icons'
import Button from '../Buttons/Button'
const PostFiler = () => {
  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        <h3>Recent</h3>
        <Button
          icon={<FilterList fontSize="large" />}
          buttonStyle="secondary-button margin0 padding0"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export default PostFiler
