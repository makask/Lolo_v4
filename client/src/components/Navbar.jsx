import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(){

    return(
        <div className="navbar">
            <h1>Lolo v4</h1>
            <h1>https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss</h1>
            <h1>https://ir.netflix.net/rss/pressrelease.aspx</h1>
            <h1>https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml</h1>
            <div className="links">
                <Link to="/">Main</Link>
            </div>
        </div>
    )
}

export default Navbar;