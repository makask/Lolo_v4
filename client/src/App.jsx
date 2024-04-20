import { useState, useEffect } from 'react'
import Item from './components/Item';
import Navbar from './components/Navbar';
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from './components/Main';
import Article from './components/Article';
import AppContextProvider from './context/AppContext';

//window.localStorage.setItem("defaultFeed", JSON.stringify(defaultFeed));
//window.localStorage.getItem("defaultFeed");
//localStorage.removeItem("defaultFeed");
//self.crypto.randomUUID();

/*const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
  method: 'POST',
  headers: { 'Content-Type' : 'application/json' },
  body: JSON.stringify({ email, password })
});*/

/*function App() {

  const[defaultFeed, setDefaultFeed] = useState([]);
  const[customFeeds, setCustomFees] = useState([]);
  
  async function fetchDefaultFeed(){
    try{
      const response = await fetch(`http://localhost:7000`);
      const defaultFeed = await response.json();
      localStorage.setItem("defaultFeed", JSON.stringify(defaultFeed));
      const data = JSON.parse(localStorage.getItem("defaultFeed"));
      setDefaultFeed(data);
    }catch(err){
      console.error(err);
    }
  }

  ///////////////////////////////////////////////
  const[customUrl, setCustomUrl] = useState("");
  
  async function fetchCustomFeed(event){
    event.preventDefault();
    try{
      const response = await fetch(`http://localhost:7000`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          url: customUrl
        })
      });
    }catch(err){
      console.error(err);
    }
  }

  function handleChange(event){
    setCustomUrl(event.target.value);
  }
  //////////////////////////////////////////////////
  useEffect(() => {
    fetchDefaultFeed();
  },[]);

  return (
    <div>
      <h1>Lolo v4</h1>
      <h3>Original Feed</h3>
      <div className="card-container">
      <form>
        <input type="text" value={customUrl} onChange={handleChange}></input>
        <button type="submit" onClick={fetchCustomFeed}>Submit</button>
      </form>
      {
        defaultFeed.map((item, i) => {
          return <Item 
            key={item.item.guid}
            id={item.item.guid}
            title={item.item.title}
            creator={item.item.creator}
            date={item.item.isoDate}
            link={item.item.link}
            content={item.item.content}
          />
        })
      }
      </div>
    </div>
  )
}*/

function App(){
  return(
    <div>
    <AppContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </AppContextProvider>
    </div>
  );
}

export default App
