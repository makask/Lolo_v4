import React, { useState, useContext } from 'react'
import "./Feed.css";
import AppConstants from '../../appConstants';
import { AppContext } from "../context/AppContext";

function Feed({ id, name, url, getArticles, removeFeed }) {

  const { feeds, setFeeds, selectedFeedUrl, setSelectedFeedUrl } = useContext(AppContext);
  const[borderColor, setBorderColor] = useState(getColorById(id));
  
  function test(id){
    const col = getColorById(id);
  }

  function getColorById(id){
    const feedObject = JSON.parse(localStorage.getItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY)).find(obj => obj.id === id);
    return feedObject ? feedObject.color : "";
  }

  async function filterByGategory(url){
    setSelectedFeedUrl(url);
    getArticles(url);
  }

  return (
    <div className='feed-div'>
        <h3 onClick={()=>filterByGategory(url)}>{name}</h3>
        <i className='fa fa-trash-o' onClick={()=>removeFeed(JSON.parse(localStorage.getItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY)), id)}></i>
    </div>
  )
}


export default Feed

