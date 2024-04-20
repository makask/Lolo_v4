import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(){

    return(
        <div className="navbar">
            <h1>Lolo v4</h1>
            <h1>https://ir.netflix.net/rss/pressrelease.aspx</h1>
            <div className="links">
                <Link to="/">Main</Link>
            </div>
        </div>
    )
}

export default Navbar;