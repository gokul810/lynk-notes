import React from "react";
import "../../style/home.css";

let inputValue;

const Home = () => {

    return (
        <div className="search-container">
            <div className="top-gradient-light"></div>
            <h1 style={{fontSize: "45px"}}>Lynk Notes</h1>
            <input
                type="text"
                placeholder="Search YouTube or paste a link..."
                value={inputValue}
                className="search-input"
            />
        </div>
    );
}

export default Home;