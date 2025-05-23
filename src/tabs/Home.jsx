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
            alert("Please enter a valid youtube link...");
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
            <input
                type="text"
                placeholder="Paste a YouTube video link to begin :)"
                value={inputValue || ""}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="search-input"
            />  
        </div>
    );
}

export default Home;