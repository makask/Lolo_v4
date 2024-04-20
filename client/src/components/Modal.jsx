import React from "react";
import "./Modal.css";

function Modal({setModalOpen, data}) {

  return (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={()=> setModalOpen(false)}> X </button>
            </div>
            <div className="title">
                <h1>{data.title}</h1>
            </div>
            <div className="body">
                <img src={data.lead_image_url} style={{"width":"400px"}}></img>
                <p>The next page is awesome! You should move forward, you will enjoy it!</p>
            </div>
            {data.content}
            <div className="footer">
                <button>Delete???</button>
                <button>Continue</button>
            </div>
        </div>
    </div>
  );
}

export default Modal;