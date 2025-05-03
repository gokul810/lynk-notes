import React, { useRef, useState } from "react";
import "../style/index.css"
import Navbar from "./navbar.jsx";

import Home from "./tabs/Home.jsx";
import Notes from "./tabs/Notes.jsx";
import Settings from "./tabs/Settings.jsx";
import { AnimatePresence, motion } from "framer-motion";

const MotionDiv = motion.div;

const tabs = ["home", "notes", "settings"];

const App = () => {

    const [activeTab, setActiveTab] = useState("home");
    const prevTabRef = useRef("home");

    const direction = tabs.indexOf(activeTab) > tabs.indexOf(prevTabRef.current) ? 1 : -1;

    const handleTabChange = (newTab) => {
        prevTabRef.current = activeTab;
        setActiveTab(newTab);
    };

    const renderTab = () => {
        switch(activeTab) {
            case "home":
                return <Home />
            case "notes":
                return <Notes />
            case "settings":
                return <Settings />
            default:
                return null;
        }
    };

    return (
        <div>
            <Navbar onTabChange={handleTabChange} activeTab={activeTab}/>
            <div className="tab-content" style={{minHeight: "100vh", overflow: "hidden" ,position: "relative"}}>
                <AnimatePresence mode="wait">
                    <MotionDiv 
                        key={activeTab}
                        initial={{ opacity: 0, x: 50 * direction }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 * direction }}
                        transition={{ duration: 0.1, ease: "easeInOut"}}
                        style={{width: "100%" }}
                    >

                        {renderTab()}
                    </MotionDiv>
                </AnimatePresence>

            </div>
        </div>
    );
};

export default App;   