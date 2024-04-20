import React from 'react'
import "./Feed.css";
import AppConstants from '../../appConstants';

function Feed({ id, name, url, getArticles, removeFeed }) {

  return (
    <div>
        <h3 onClick={()=>getArticles(url)}>{name}</h3>
        <h3 onClick={()=>removeFeed(JSON.parse(localStorage.getItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY)), id)}>X</h3>
    </div>
  )
}


export default Feed