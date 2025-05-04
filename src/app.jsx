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

    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [videoTime, setVideoTime] = useState(0); 

    const playerRef = useRef(null);

    const direction = tabs.indexOf(activeTab) > tabs.indexOf(prevTabRef.current) ? 1 : -1;

    const handleTabChange = (newTab, url) => {
        if (activeTab === "notes" && playerRef.current) {
            try {
                playerRef.current.pauseVideo();
            } catch(err) {
                console.warn("Could Not Pause Video", err);
            }
        }

        prevTabRef.current = activeTab;
        if (url) setYoutubeUrl(url);
        setActiveTab(newTab);
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
                        <div style={{ display: activeTab == "home" ? "block" : "none" }}>
                            <Home handleTabChange={handleTabChange} />
                        </div>
                        <div style={{ display: activeTab == "notes" ? "block" : "none" }}>
                            <Notes 
                            youtubeUrl={youtubeUrl}
                            savedTime={videoTime}
                            onTimeUpdate={(time) => setVideoTime(time)}
                            playerRef={playerRef}
                            />
                        </div>
                        <div style={{ display: activeTab == "settings" ? "block" : "none" }}>
                            <Settings />
                        </div>
                    </MotionDiv>
                </AnimatePresence>

            </div>
        </div>
    );
};

export default App;   