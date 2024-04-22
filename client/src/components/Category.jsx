import React, {useContext} from 'react'
import { AppContext } from '../context/AppContext';

function Category({ category, getAllArticles }) {

  const { selectedCategory, setSelectedCategory } = useContext(AppContext);

  function handleClick(){
    setSelectedCategory(category);
  }

  return (
    <p style={{backgroundColor:"lightblue"}} onClick={handleClick}>{category}</p>
  )
}

export default Category