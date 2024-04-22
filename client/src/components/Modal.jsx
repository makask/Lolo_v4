import React, { useState, useEffect } from "react";
import "./Modal.css";

function Modal({setModalOpen, data}) {

 const[cleanContent, setCleanContent] = useState("");

    function stripHtmlTags(htmlString){
        return htmlString.replace(/<[^>]*>/g, ''); 
    }

    useEffect(() => {
        if (data && data.content) {
          setCleanContent(stripHtmlTags(data.content));
        }
    }, [data]);

  return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="titleCloseBtn-div">
                <button onClick={()=> setModalOpen(false)}> X </button>
            </div>
            <div className="title">
                <h1>{data.title}</h1>
            </div>
            <div>
                <img className="modalImage" src={data.lead_image_url}></img>
            </div>
            <div className="modalContent">
                {cleanContent}
            </div>
        </div>
    </div>
  );
}

export default Modal;