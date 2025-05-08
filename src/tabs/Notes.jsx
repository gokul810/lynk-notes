import { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";
import "../../style/notes.css";

const Notes = ({ youtubeUrl, savedTime, onTimeUpdate, playerRef }) => {
    const localRef = useRef(null);
    const [notes, setNotes] = useState("");
    const textareaRef = useRef(null);

    const getVideoId = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
        } catch {
            return null;
        }
    };

    const videoId = getVideoId(youtubeUrl);

    const opts = {
        playerVars: {
            autoplay: 0,
        }
    };

    const onReady = (event) => {
        localRef.current = event.target;
        if (playerRef) playerRef.current = event.target;

        if (savedTime && !isNaN(savedTime)) {
            setTimeout(() => {
                event.target.seekTo(savedTime, true);
            }, 300);
        }
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return [
            hrs > 0 ? String(hrs).padStart(2, '0') : null,
            String(mins).padStart(2, '0'),
            String(secs).padStart(2, '0')
        ].filter(Boolean).join(':');
    };

    const addTimestampNote = () => {
        if (!playerRef?.current || !textareaRef.current) return;
    
        const time = playerRef.current.getCurrentTime();
        const formatted = formatTime(time);
        const textarea = textareaRef.current;
    
        const { selectionStart, selectionEnd, value } = textarea;
        const isCursorAtEnd = selectionStart === value.length && selectionEnd === value.length;
    
        const insertText = `${isCursorAtEnd && !value.endsWith('\n') ? '\n' : ''}[${formatted}] → \n`;
    
        const before = value.slice(0, selectionStart);
        const after = value.slice(selectionEnd);
    
        const updatedNotes = before + insertText + after;
        setNotes(updatedNotes);
    
        setTimeout(() => {
            textarea.focus();
            const newPos = before.length + insertText.length;
            textarea.setSelectionRange(newPos, newPos);
            textarea.scrollTo({ top: textarea.scrollHeight, behavior: "smooth" });
        }, 0);
    };

    // New function to clear the notes textarea
    const clearNotes = () => {
        setNotes(""); 
    };

    useEffect(() => {
        return () => {
            if (playerRef?.current && typeof onTimeUpdate === "function") {
                const time = playerRef.current.getCurrentTime?.();
                if (!isNaN(time)) {
                    onTimeUpdate(time);
                }
            }
        };
    }, [onTimeUpdate, playerRef]);

    if (!videoId) {
        return <p>no video is playing right now</p>;
    }

    return (
        <div className="notes-layout">
            <div className="video-section">
                <div className="video-responsive">
                    <YouTube videoId={videoId} opts={opts} onReady={onReady} />
                </div>
            </div>
            <div className="notes-sidebar">
                <div className="notes-sidebar-inner">
                    <div className="button-group">
                        <button className="timestamp-button" onClick={addTimestampNote}>Note Here</button>
                        <button className="export-button" >Export Note</button>
                        <button className="clear-button" onClick={clearNotes}>Clear</button>
                    </div>
                    <textarea
                        className="notes-textarea"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        ref={textareaRef}
                        placeholder="Take notes here..."
                    />
                </div>
            </div>
        </div>
    );
};

export default Notes;
