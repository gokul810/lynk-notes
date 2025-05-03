import React from "react";
import "../style/navbar.css";
import { Home, Settings, StickyNote } from "lucide-react";

const Navbar = ({ onTabChange, activeTab }) => {
    return (
        <div className="navbar">
            <div className="tooltip">
                <button className={`nav-item ${activeTab === "home" ? "active" : ""}`} onClick={() => onTabChange("home")}>
                    <Home size={20} />
                </button>
                <span className="tooltip-text">Home</span>
            </div>

            <div className="tooltip">
                <button className={`nav-item ${activeTab === "notes" ? "active" : ""}`} onClick={() => onTabChange("notes")}>
                    <StickyNote size={20} />
                </button>
                <span className="tooltip-text">Notes</span>
            </div>

            <div className="tooltip">
                <button className={`nav-item ${activeTab === "settings" ? "active" : ""}`} onClick={() => onTabChange("settings")}>
                    <Settings size={20} />
                </button>
                <span className="tooltip-text">Settings</span>
            </div>
        </div>
    );
};

export default Navbar;
