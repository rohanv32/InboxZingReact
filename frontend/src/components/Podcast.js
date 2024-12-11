import React, { useEffect, useState } from "react";


const Podcast = ({ username }) => {
    const [audioUrl, setAudioUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPodcast = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/podcast/${username}`);
                if (!response.ok) {
                    throw new Error("Failed to generate podcast");
                }

                const audioUrl = `${process.env.REACT_APP_BACKEND_URL}/podcast/${username}`;
                setAudioUrl(audioUrl); 
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (username) {
            fetchPodcast();
        }
    }, [username]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="max-w-md w-full p-8 text-center rounded-lg shadow-md border border-gray-100">
                <h1 className="text-4xl font-bold mb-8">Podcast for {username}</h1>
                
                {isLoading ? (
                    <p className="text-lg">Loading your podcast..</p>
                ) : error ? (
                    <p className="text-red-500 mb-4">Error: {error}</p>
                ) : (
                    <div className="podcast-audio mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Audio</h2>
                        {audioUrl ? (
                            <audio controls className="w-full">
                                <source src={audioUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        ) : (
                            <p>No audio available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Podcast;