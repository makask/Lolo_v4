import React, { useState, useContext } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { AppContext } from "../context/AppContext";
import { DateTime } from "luxon";

function Item({ id, title, link, date, name, categories }){

    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    
    async function postMercuryData(){
        try{
            const data = await fetch(`http://localhost:7000/mercury`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    url: link
                })
            });
            getMercuryData();
            }catch(err){
                console.error(err);
            }   
    }

    async function getMercuryData(){
        try{
            const response = await fetch(`http://localhost:7000/mercury`);
            const data = await response.json();
            setModalData(data);
          }catch(err){
            console.error(err);
          }
    }

    function formatDate(date){
        const originalDate = new Date(date);
        const day = originalDate.getDate().toString().padStart(2, '0');
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const year = originalDate.getFullYear();
        return `${day}-${month}-${year}`;
    }

    async function openArticleModal(){
        postMercuryData();
        getMercuryData();
        setModalOpen(true);
    }

    //<h3>{title}</h3> 
    //<p>{link}</p>
    //<p>{formatDate(date)}</p>
    
    return(
        <div className="item-card">
            <p>{link}</p>
            {
                
            }
           <p className="openModal" onClick={openArticleModal}>Open Modal ???</p>
           { modalOpen && <Modal data={modalData} setModalOpen={setModalOpen}/>}
        </div>
    )
}

export default Item;