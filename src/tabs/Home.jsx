import React from "react";
import "../../style/home.css";

const Home = () => {

    return (
        <div className="search-container">
            <div className="profile">
                <p>G</p>
            </div>
            <input
                type="text"
                placeholder="Search YouTube or paste a link..."
                className="search-input"
            />
        </div>
    );
}

export default Home;