import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Item from "./Item";
import Feed from "./Feed";
import "./Main.css";
import uuid from "react-uuid";
import AppConstants from "../../appConstants";
import SelectedCategory from "./SelectedCategory";

function Main(){

    const { feeds, setFeeds, selectedFeedUrl, setSelectedFeedUrl, selectedCategory, setSelectedCategory } = useContext(AppContext);

    const[articles, setArticles] = useState([]);
    const[newFeedUrl, setNewFeedUrl] = useState("");
    const[newFeedName, setNewFeedName] = useState("");
    const[color, setColor] = useState("#000000");
 
    async function getAllArticles(){
        setSelectedFeedUrl(null);
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
                if(selectedCategory===null){
                    articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
                    setArticles(articles);
                }else{
                    getRelevantArticles(selectedCategory)
                    .then(relevantArticles => { 
                        relevantArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
                        setArticles(relevantArticles);
                    })
                    .catch(error => {
                        console.error("Error occurred:", error);
                    });
                }   
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
            setSelectedFeedUrl(url);
            return res.json()
          }).then(articles => {
            console.log(articles);
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
                          name: newFeedName,
                          color: color
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
            setNewFeedName("");
            setNewFeedUrl("");
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

    function pickColor(event){
        setColor(event.target.value);
    }

    async function getRelevantArticles(relevantCategory) {
        return new Promise((resolve, reject) => {
            const relevantArticles = articles.filter(article => {
                return article.categories && article.categories.some(category => category._ === relevantCategory);
            });
            resolve(relevantArticles);
        });
    }

    useEffect(() => {
        getAllArticles();  
    },[feeds, selectedCategory]);
    
    return(
        <div className="main-container">
            <div className="sidebar">
            {
                selectedCategory && <SelectedCategory />
            }
            <div className="add-new-feed-div">
                <form className="add-new-feed-form">
                    <input type="text" placeholder="New feed name..." value={newFeedName} onChange={changeNewFeedName}></input>
                    <input type="text" placeholder="New feed url..." value={newFeedUrl} onChange={changeNewUrlValue}></input>
                    <button onClick={ addFeed }>Add</button>
                </form>
            </div>
                <div className="all-feeds-div">
                    <h3 className="title-all-feeds" onClick={getAllArticles}>All Feeds</h3>
                    <i class="fa fa-rss" onClick={getAllArticles} aria-hidden="true"></i>
                </div>
                { 
                    feeds.map(feed => {
                        return <Feed 
                            key = {uuid()}
                            id = {feed.id}
                            name = {feed.name}
                            url = {feed.url}
                            getArticles = {getArticles}
                            removeFeed = {removeFeed}
                        />
                    }) 
                }
            </div>
            <div className="article-container">
            {
                
                articles.map((item, i) => {
                    return <Item 
                            key={item.guid}
                            link={item.link}
                            date = {item.pubDate}
                            title = {item.title}
                            categories = {item.categories}
                            description = {item.description}
                            content = {item.content}
                            getAllArticles = {getAllArticles}
                            author = {item.author}
                    />})
            }
            </div>
        </div>
    );
}

export default Main;