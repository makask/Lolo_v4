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

  async function testFiltering(url){
    setSelectedFeedUrl(url);
    getArticles(url);
  }

  // <h3 onClick={()=>getArticles(url)}>{name}</h3>

  return (
    <div>
        <h3 onClick={()=>testFiltering(url)}>{name}</h3>
        <h3 onClick={()=>removeFeed(JSON.parse(localStorage.getItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY)), id)}>X</h3>
        <button onClick={()=>test(id)}></button>
    </div>
  )
}


export default Feed

