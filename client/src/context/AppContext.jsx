import React, { createContext, useState, useEffect } from "react";
import AppConstants from "../../appConstants";

export const AppContext = createContext(null);

function AppContextProvider(props){
    
    const[selectedFeedUrl, setSelectedFeedUrl] = useState(null);
    const[selectedCategory, setSelectedCategory] = useState(null);
    const[feeds, setFeeds] = useState([]);
    
    async function fetchFeeds(){
        try{
          if(localStorage.getItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY) === null){
            const response = await fetch(`${import.meta.env.VITE_SERVERURL}/initial`);
            const defaultFeed = await response.json();
            localStorage.setItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY, JSON.stringify([defaultFeed]));
          }
          const feeds = JSON.parse(localStorage.getItem(AppConstants.FEEDS_LOCAL_STORAGE_KEY));
          setFeeds(feeds);
        }catch(err){
          console.error(err);
        }
    }

    useEffect(() => {
        fetchFeeds();
    },[]);

    const contextValue = { feeds, setFeeds, selectedFeedUrl, setSelectedFeedUrl, selectedCategory, setSelectedCategory }

    return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}

export default AppContextProvider;