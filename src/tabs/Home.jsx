import React, { useState } from "react";
import "../../style/home.css";

const Home = ({ handleTabChange }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        // check if it's a valid youtube link
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/.+$/;

        if (youtubeRegex.test(inputValue.trim())) {
            handleTabChange("notes", inputValue.trim());

        } else {
            // TODO: add some fancy notification alert ui
            alert("PLease enter a valid youtube link...");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <div className="top-gradient-light"></div>
            <h1 style={{fontSize: "45px"}}>Lynk Notes</h1>
            <input
                type="text"
                placeholder="Search YouTube or paste a link..."
                value={inputValue || ""}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="search-input"
            />  
        </div>
    );
}

export default Home;