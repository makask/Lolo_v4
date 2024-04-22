import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import "./SelectedCategory.css"

function SelectedCategory() {

  const {selectedCategory, setSelectedCategory} = useContext(AppContext);

  function closeCategory(){
    setSelectedCategory(null);
  }

  return (
        <div className="selected-category-div">
            <h3>{selectedCategory}</h3>
            <i className='fa fa-trash-o' aria-hidden="true" onClick={closeCategory}></i>
        </div>
  )
}

export default SelectedCategory