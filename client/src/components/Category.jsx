import React from 'react'

function Category({category}) {

  function handleClick(){
    console.log(category);
  }

  return (
    <p onClick={handleClick}>{category}</p>
  )
}

export default Category