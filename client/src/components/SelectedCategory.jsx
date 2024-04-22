import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function SelectedCategory() {

  const {selectedCategory, setSelectedCategory} = useContext(AppContext);

  function closeCategory(){
    setSelectedCategory(null);
  }

  return (
    <div>
        <div>
            <h3>Category:</h3>
            <h3>{selectedCategory}</h3>
            <h3 onClick={closeCategory}>X</h3>
            </div>
    </div>
  )
}

export default SelectedCategory