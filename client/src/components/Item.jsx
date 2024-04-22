import React, { useState, useContext } from "react";
import "./Item.css";
import Modal from "./Modal";
import { AppContext } from "../context/AppContext";
import Category from "./Category";
import uuid from "react-uuid";

function Item({ id, title, link, date, name, categories, getAllArticles }){

    const { selectedCategory, setSelectedCategory } = useContext(AppContext);
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
    
    return(
        <div className="item-card">
            <p>{link}</p>
            {
                /*categories && categories.map(category => {
                    return <Category 
                        key={uuid()}
                        id={uuid}
                        category={category._}
                    />
                })*/
                categories && (
                    <Category 
                        key={uuid()}
                        id={uuid}
                        category={categories[0]._}
                        setSelectedCategory={setSelectedCategory}
                        getAllArticles={getAllArticles}
                    />
                )
            }
           <p className="openModal" onClick={openArticleModal}>Open Modal ???</p>
           <p>{formatDate(date)}</p>
           { modalOpen && <Modal data={modalData} setModalOpen={setModalOpen}/>}
        </div>
    )
}

export default Item;