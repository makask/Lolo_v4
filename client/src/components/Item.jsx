import React, { useState, useContext } from "react";
import "./Item.css";
import Modal from "./Modal";
import { AppContext } from "../context/AppContext";
import Category from "./Category";
import uuid from "react-uuid";

function Item({ 
    id, 
    title, 
    link, 
    date, 
    name, 
    categories, 
    getAllArticles,
    content, 
    author }){

    const { selectedCategory, setSelectedCategory } = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    
    async function postMercuryData(){
        try{
            await fetch(`${import.meta.env.VITE_SERVERURL}/mercury`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    url: link
                })
            }).then(res => {
                return res.json();
            }).then(data=>{
                setModalData(data);
            })
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
        setModalOpen(true);
    }

    return(
        
        <div className="item-card">
            { modalOpen && <Modal data={modalData} setModalOpen={setModalOpen}/>}
            <div className="item-card-content">
                    {
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
                <h3 className="item-card-title" onClick={openArticleModal}>{title}</h3>
                <h4 className="item-card-descripton" onClick={openArticleModal}>{content}</h4>
                <button className="btn-read-article" onClick={openArticleModal}>Read More</button>
                <div className="author-info">
                    <h5>{author}</h5>
                    <h5>{formatDate(date)}</h5>
                </div>
            </div>
        </div>
    )
}

export default Item;