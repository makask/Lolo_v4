import React, {useContext} from 'react'
import { AppContext } from '../context/AppContext';
import "./Category.css";

function Category({ category="No category", getAllArticles }) {

  const { selectedCategory, setSelectedCategory } = useContext(AppContext);

  function handleClick(){
    setSelectedCategory(category);
  }

  return (
    <button className="category-btn" onClick={handleClick}>{category}</button>
  )
}

export default Category