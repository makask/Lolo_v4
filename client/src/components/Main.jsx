import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Item from "./Item";
import Feed from "./Feed";
import "./Main.css";
import { v4 as uuidv4 } from 'uuid';
import AppConstants from "../../appConstants";

function Main(){

    const { feeds, setFeeds } = useContext(AppContext);
    const[articles, setArticles] = useState([]);
    const[newFeedUrl, setNewFeedUrl] = useState("");
    const[newFeedName, setNewFeedName] = useState("");
    
    async function getAllArticles(){
        const endpoints = [];
        feeds.forEach(feed => {
            endpoints.push(feed.url); 
        })
        
        try{
            await fetch(`http://localhost:7000/allarticles`,{
                method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        urls: endpoints
                    }) 
            }).then(res => {
                return res.json()
            }).then(articles => {
                articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
                setArticles(articles);
            })
        }catch(err){
            console.error(err);
        }
    }

    async function getArticles(url){
        try{
          await fetch(`http://localhost:7000/articles`, {
            method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        url: url
                    }) 
          }).then(res => {
            return res.json()
          }).then(articles => {
            articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
            setArticles(articles);
          });
        }catch(err){
          console.error(err);
        }
    }

    async function addFeed(event){
        event.preventDefault();
        try{
            await fetch(`http://localhost:7000/add`, {
              method: "POST",
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                          url: newFeedUrl,
                          name: newFeedName
                      }) 
                    }).then(res => {
                        return res.json()
            }).then(newFeed => {
              let feeds = JSON.parse(localStorage.getItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY));
              feeds.push(newFeed);
              localStorage.setItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY, JSON.stringify(feeds));
              setFeeds(f => [...f, newFeed]);
            });
            getAllArticles();
          }catch(err){
            console.error(err);
          }
    }

    function changeNewUrlValue(event){
        setNewFeedUrl(event.target.value);
    }

    function changeNewFeedName(event){
        setNewFeedName(event.target.value);
    }

    function removeFeedById(array, id){
        return array.filter(obj => obj.id !== id);
    }

    function removeFeed(array, id){
        array = removeFeedById(array, id);
        localStorage.setItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY, JSON.stringify(array));
        setFeeds(feeds.filter(obj => obj.id !== id));
    }

    useEffect(() => {
        getAllArticles();  
    },[feeds]);
    
    return(
        
       
        <div className="main-container">
            <div className="sidebar">
                <h3 onClick={getAllArticles}>All Feeds</h3>
                { 
                    feeds.map(feed => {
                        return <Feed 
                            key = {feed.id}
                            id = {feed.id}
                            name = {feed.name}
                            url = {feed.url}
                            getArticles = {getArticles}
                            removeFeed = {removeFeed}
                        />
                    }) 
                }
            </div>
            <div className="card-container">
            {
                
                articles.map((item, i) => {
                return <Item 
                        key={item.guid}
                        link={item.link}
                        date = {item.pubDate}
                        title = {item.title}
                        categories = {item.categories}
                />})
            }
            </div>
            <div>
                <form>
                    <input type="text" placeholder="Name..." value={newFeedName} onChange={changeNewFeedName}></input>
                    <input type="text" placeholder="Feed url..." value={newFeedUrl} onChange={changeNewUrlValue}></input>
                    <button onClick={ addFeed }>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Main;