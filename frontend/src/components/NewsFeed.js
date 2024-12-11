import React, { useEffect, useState } from 'react';
import { useUserContext } from './UserContext';
import '../App.css';
import Swal from 'sweetalert2';

function NewsFeed({ newsArticles, username }) {
  console.log("Username in NewsFeed:", username);

  const { setPoints } = useUserContext();

  const [articles, setArticles] = useState(newsArticles || []);
  const [clickCount, setClickCount] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [remainingArticles, setRemainingArticles] = useState(newsArticles.length || 0);
  console.log("Initial newsArticles:", newsArticles);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      setError("Username not set. Please log in.");
      return;
    }

    // Fetch news articles from backend News API
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch news articles');
        }
        const data = await response.json();
        console.log("Fetched articles:", data.articles);
        setArticles(data.articles || []);
        setRemainingArticles(data.articles.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [username]);  

  // Earn point by clicking on article and read it for x seconds specified below
  const handleArticleClick = (article) => {
    setStartTime(Date.now()); 
    setSelectedArticle(article);
  };

  const handleBackToFeed = async () => {
    const endTime = Date.now();
    const readingTime = (endTime - startTime) / 1000; 

    console.log(`Reading time: ${readingTime} seconds`);

    let earnedPoints = 0;

    // Only award points if reading time exceeds threshold
    if (readingTime >= 20) { 
        const basePoints = 10;
        const bonusMultiplier = clickCount * 0.1; // Incremental bonus
        earnedPoints = Math.round(basePoints + basePoints * bonusMultiplier);

        Swal.fire({
          title: `🎉 Meow! ${earnedPoints} points earned from reading!`,
          width: 600,
          padding: "3em",
          color: "#716add",
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://media.tenor.com/rI_0O_9AJ5sAAAAj/nyan-cat-poptart-cat.gif")
            left top
            no-repeat
          `
        });

        setClickCount(prev => prev + 1);
        setPoints(prev => prev + earnedPoints);

        const updatedArticles = articles.map((articleItem) =>
          articleItem.url === selectedArticle.url
            ? { ...articleItem, isRead: true }
            : articleItem
        );
        setArticles(updatedArticles);

        setRemainingArticles(prev => prev - 1);

        // Check if all articles are read, and if so, give bonus points
        if (remainingArticles === 0) {
            setPoints(prev => prev + 20);  // Add the bonus points
        }
    } else {
        Swal.fire({
          title: "😸 says...",
          text: "Finish reading the article, and you'll earn those pawsome points! 🐾",
          imageUrl: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGNkNmR3eDRtejQ2ODEwNWJlZ2p3Z2xlMXQ2MDRyczQ3Nm1ocm5oaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qUIm5wu6LAAog/giphy.gif", 
          imageWidth: 400,
          imageHeight: 200,
          confirmButtonText: "Alright, I'm on it! 😻",
          padding: "2em",
          showCloseButton: true,
          timer: 5000, // Auto-close after 5 seconds for added excitement
        });
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${username}/mark_as_read?article_url=${selectedArticle.url}&readingTime=${Math.round(readingTime)}`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            throw new Error('Failed to mark article as read');
        }

        const data = await response.json();
        console.log('Article marked as read successfully:', data.message);
    } catch (error) {
        console.error('Error marking article as read:', error.message);
    }

    if (earnedPoints > 0) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/points/update?username=${username}&points=${earnedPoints}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to update points');
            }

            const data = await response.json();
            console.log('Points updated successfully:', data.message);
        } catch (error) {
            console.error('Error updating points:', error.message);
        }
    }

    setSelectedArticle(null); 
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="flex min-h-screen flex-col items-center p-8 pt-24">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-center mb-8">
            THE INBOX ZING!
          </h1>
  
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">{selectedArticle.title}</h2>
            <p className="text-sm">Source: {selectedArticle.source}</p>
          </div>
  
          <div className="border border-gray-200 rounded-sm">
            <div className="p-6">
              <p className="text-base leading-relaxed">{selectedArticle.summary}</p>
              
              {selectedArticle.urlToImage && (
                <img
                  src={selectedArticle.urlToImage}
                  alt={selectedArticle.title}
                  className="w-full mt-6 rounded-sm"
                />
              )}
            </div>
          </div>
  
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleBackToFeed}
              className="flex-1 bg-[#D5C3C6] rounded-sm py-3 hover:bg-[#c8b2b5] transition-colors"
            >
              Back to Feed
            </button>
            
            <a
              href={selectedArticle.url}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex-1 bg-[#B0B0B0] rounded-sm py-3 text-center hover:bg-[#dbdbdb] transition-colors"
            >
              Go to Source
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center p-8 pt-24">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          THE INBOX ZING!
        </h1>
  
        <div className="space-y-4">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={index}
                onClick={() => handleArticleClick(article)}
                className={`flex ${index % 2 === 0 ? '' : 'flex-row-reverse'} cursor-pointer`}
              >
                <div className="w-1/2 p-4 border border-gray-400">
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <p className="text-sm">{article.description}</p>
                  <p className="text-sm mt-2">Source: {article.source}</p>
                </div>
                <div className="w-1/2 bg-[#D5C3C6] flex items-center justify-center">
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">×</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No articles found matching your preferences.</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default NewsFeed;