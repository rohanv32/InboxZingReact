import React, { useState, useEffect, useContext } from 'react';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Preferences from './components/Preferences';
import NewsFeed from './components/NewsFeed';
import DeleteUser from './components/DeleteUser';
import { UserProvider, useUserContext } from './components/UserContext';
import Profile from './components/Profile'; 
import Header from './components/Header'; 
import { useNavigate } from 'react-router-dom';

function App() {
  const context = useUserContext();  
  const username = context ? context.username : '';
  const setUsername = context ? context.setUsername : () => {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [isRedirectedFromSignUp, setIsRedirectedFromSignUp] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
  
      console.log("Response status:", response.ok);
      if (response.ok) {
        const data = await response.json();
        if (data.username) {
          console.log("Setting username:", data.username);
          setIsLoggedIn(true);
          // this helps in setting the username if sucessfully logged in
          // else login fail error 
          setUsername(data.username); 
          console.log("Username set in context:", data.username);
          setActiveTab('NewsFeed');
          navigate('/newsfeed');
        } else {
          alert('Login failed: No username in response');
        }
      } else {
        const error = await response.json();
        alert(error.detail || 'An error occurred during login');
      }
    } catch (error) {
      console.error('Error logging in:', error);  
      alert('An error occurred while logging in');
    }
  };
  // make sure to reset username on log out
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUsername(null); 
    setActiveTab('Home');
    navigate('/');
  };

  const handleDeleteAccount = async () => {
      alert("User deleted!");
      handleLogout();
  };
  // signing up the user function
  const handleSignUp = async (userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        // if they alrady have a username and password previously
        const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: userData.username,
            password: userData.password,  
          }),
        });
        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem('authToken', loginData.token);
  
          // logged in state updated to match current
          setIsLoggedIn(true);  
          setUsername(userData.username); 
          setActiveTab('Preferences');  
          navigate('/preferences');
        } else {
          const errorData = await loginResponse.json();
          alert(`Login failed: ${errorData.detail || 'Unknown error'}`);
        }
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during signup or login:', error);
      alert('An error occurred during signup');
    }
};

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);  
  
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (response.ok) {
            const userData = await response.json();
            setUsername(userData.username);
            // default redirection into news feed if data fetched 
            // if not fetched redirect to home
            setActiveTab('NewsFeed'); 
          } else {
            setActiveTab('Home'); 
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    } else {
      setActiveTab('Home');
    }
  }, []); 

  useEffect(() => {
    console.log("Active Tab:", activeTab);
    console.log("Is Logged In:", isLoggedIn);
    console.log("Is Redirected From Sign Up:", isRedirectedFromSignUp);
  }, [activeTab, isLoggedIn, isRedirectedFromSignUp]);

  const handleUpdateComplete = () => {
    setActiveTab('NewsFeed');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNavigateToSignUp = () => {
    setActiveTab('SignUp');
  };

  const handleNavigateToLogin = () => {
    setActiveTab('Login');
  };

  const handleNavigateToPreferences = () => {
    setActiveTab('Preferences');
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      setActiveTab('NewsFeed');
    } else {
      setActiveTab('Home');
    }
  };

  useEffect(() => {
    // checking the login status
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status`);
        const data = await response.json();
  
        if (data.isLoggedIn && data.username) {
          setIsLoggedIn(true);
          setUsername(data.username); 
          setActiveTab('NewsFeed');
        } else {
          setActiveTab('Home');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
  
    // check current login status
    checkLoginStatus();
  }, []); // 

  return (
    <UserProvider> {/* makes sure UserContext is available */}
       <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onTabChange={handleTabChange}
        onLogoClick={() => setActiveTab('Home')}
      />
      <div className="App">
        <div className="content">
          {activeTab === 'Home' && !isLoggedIn && <Home onTabChange={handleTabChange} />}
          {activeTab === 'SignUp' && !isLoggedIn && <SignUp onSignUp={handleSignUp} onNavigateToLogin={handleNavigateToLogin} />}
          {activeTab === 'Login' && !isLoggedIn && <Login onLogin={handleLogin} onNavigateToSignUp={handleNavigateToSignUp} />}
          {activeTab === 'Preferences' && (isLoggedIn || isRedirectedFromSignUp) && (
            <Preferences onUpdateComplete={handleUpdateComplete} username={username}/>
          )}
          {activeTab === 'NewsFeed' && (isLoggedIn || isRedirectedFromSignUp) && (<NewsFeed newsArticles={newsArticles} username={username}/>)}
          {activeTab === 'DeleteUser' && (isLoggedIn || isRedirectedFromSignUp) && (<DeleteUser onDelete={handleDeleteAccount} username={username} />)}
          {activeTab === 'Profile' && isLoggedIn && (
            <Profile onNavigatetoPreferences={handleNavigateToPreferences} username={username} />
          )}
        </div>
      </div>
    </UserProvider>
  );
}

export default App;