import { useRef, useEffect } from "react";
import YouTube from "react-youtube";
import "../../style/notes.css"

const Notes = ({ youtubeUrl, savedTime, onTimeUpdate, playerRef }) => {

    const localRef = useRef(null);

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

    useEffect(() => {
        return () => {
            if (playerRef?.current && typeof onTimeUpdate === "function") {
                const time = playerRef.current.getCurrentTime?.();
                console.log("Saving playback time:", time);
                if (!isNaN(time)) {
                    onTimeUpdate(time);
                }
            }
        };
    }, [onTimeUpdate, playerRef]);

    if (!videoId) {
        return <p>No valid YouTube URL provided</p>;
    }

    return (
        <div className="notes-container">
            <div className="video-responsive">
                <YouTube videoId={videoId} opts={opts} onReady={onReady} />
            </div>
        </div>
    );
}

export default Notes;