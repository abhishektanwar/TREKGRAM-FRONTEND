import "./post-filter.css";
import { FilterList } from "@material-ui/icons";
import Button from "../Buttons/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPosts } from "../../reducers/postSlice";
const PostFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { filterType } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        <div className="filter-top-section" onClick={() => {
              setIsFilterOpen((prev) => !prev);
            }}>
          <h3 className="margin0">{filterType ?? "Filter"}</h3>
          <Button
            icon={<FilterList fontSize="large" />}
            buttonStyle="secondary-button margin0 padding0"
            
          />
        </div>
        {isFilterOpen && (
          <div className="filter-bottom-section">
            <Button
              buttonText="Latest"
              buttonStyle="filter-select-button secondary-button margin0"
              onClick={() => dispatch(filterPosts("Latest"))}
            />
            <Button
              buttonText="Trending"
              buttonStyle="filter-select-button secondary-button margin0"
              onClick={() => dispatch(filterPosts("Trending"))}
            />
            <Button
              buttonText="Reset"
              buttonStyle="filter-select-button secondary-button margin0"
              onClick={() => dispatch(filterPosts(null))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFilter;
