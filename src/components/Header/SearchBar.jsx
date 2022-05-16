import { useState, useEffect } from "react";
import "./header.css";

const SearchBar = ({handleSearch}) => {
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    if (searchInput===""){
    }
  }, [searchInput])
  return (
    <form className="search-bar-container">
      <input
        type="text"
        placeholder=""
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <i className="fa fa-search" style={{cursor:'pointer'}} onClick={()=>handleSearch(searchInput)}> </i>
    </form>
  );
};

export default SearchBar;
