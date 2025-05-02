import React, { useState } from "react";
import "../style/index.css"
import Navbar from "./navbar.jsx";

import Home from "./tabs/Home.jsx";
import Notes from "./tabs/Notes.jsx";
import Settings from "./tabs/Settings.jsx";


const App = () => {

    const [activeTab, setActiveTab] = useState("home");

    return (
        <div>
            <Navbar onTabChange={setActiveTab}/>
            <div className="tab-content">
                {activeTab === "home" && <Home />}
                {activeTab === "notes" && <Notes />}
                {activeTab === "settings" && <Settings />}
            </div>
        </div>
    );
};

export default App;   