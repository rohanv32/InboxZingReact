import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Preferences from './components/Preferences';
import NewsFeed from './components/NewsFeed';
import DeleteUser from './components/DeleteUser';
import { UserProvider, useUserContext } from './components/UserContext';
import Profile from './components/Profile'; 
import Header from './components/Header'; 
import Podcast from './components/Podcast'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FloatButton, ConfigProvider, theme as antTheme } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons'; // Add icons for light/dark mode

function App() {
  const context = useUserContext();  // Get context from the UserProvider
  const username = context ? context.username : '';
  const setUsername = context ? context.setUsername : () => {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [isRedirectedFromSignUp, setIsRedirectedFromSignUp] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Theme state
  const [themeMode, setThemeMode] = useState(() => {
    return sessionStorage.getItem('themeMode') || 'Light';
  });

  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'Light' ? 'Dark' : 'Light';
      sessionStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };


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

      if (response.ok) {
        const data = await response.json();
        if (data.username) {
          setIsLoggedIn(true);
          setUsername(data.username);
          sessionStorage.setItem('authToken', data.token);
          sessionStorage.setItem('username', data.username); 
          setActiveTab('NewsFeed');
          navigate('/newsfeed');
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Error",
            text: "Login failed. No username in response."
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: "An error occurred during login."
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: error.message,
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername(null); // Reset username on logout
    setActiveTab('Home');
    navigate('/');
  };

  const handleDeleteAccount = async () => {
      Swal.fire({
        icon: "warning",
        title: "User deleted!",
      });
      handleLogout();
  };

  const handleSignUp = async (userData) => {
    try {
      // Step 1: Sign up the user
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Step 2: Log in the user automatically
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
          sessionStorage.setItem('authToken', loginData.token);

          setIsLoggedIn(true);  
          setUsername(userData.username);  
          setActiveTab('Preferences'); 
          navigate('/preferences');
        } else {
          const errorData = await loginResponse.json();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Login failed: ${errorData.detail || 'Unknown error'}",
          });
        }
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Signup failed: ${errorData.detail || 'Unknown error'}",
        });
      }
    } catch (error) {
      console.error('Error during signup or login:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred during signup.",
      });
    }
};

useEffect(() => {
  const token = sessionStorage.getItem('authToken');
  const storedUsername = sessionStorage.getItem('username');

  if (token && storedUsername) {
    setIsLoggedIn(true);
    setUsername(storedUsername); 
  } else {
    setIsLoggedIn(false);
  }

  
}, [location]);

  const handleUpdateComplete = () => {
    navigate('/newsfeed');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNavigateToSignUp = () => {
    navigate('/signup');
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleNavigateToPreferences = () => {
    navigate('/preferences');
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/newsfeed');
    } else {
      navigate('/');
    }
  };

  // Dark and Light Mode Algorithm from Ant Design
  const antThemeConfig = {
    algorithm: themeMode === 'Dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
  };

  return (
    <UserProvider> 
      <ConfigProvider theme={antThemeConfig}>
        <div className={`app ${themeMode === 'Dark' ? 'dark-theme' : 'light-theme'}`}>

          <Header
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            onTabChange={handleTabChange}
            onLogoClick={handleLogoClick}
            themeMode={themeMode}
            toggleTheme={toggleTheme}
          />
          <Routes key={location.key}>
            <Route path="/" element={<Home onTabChange={handleTabChange}/>} />
            <Route path="/signup" element={!isLoggedIn ? <SignUp onSignUp={handleSignUp} onNavigateToLogin={handleNavigateToLogin} /> : <Navigate to="/preferences" />} />
            <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} onNavigateToSignUp={handleNavigateToSignUp}/> : <Navigate to="/newsfeed" />} />
            <Route path="/preferences" element={(isLoggedIn || isRedirectedFromSignUp) ? <Preferences onUpdateComplete={handleUpdateComplete} username={username} /> : <Navigate to="/login" />} />
            <Route path="/newsfeed" element={isLoggedIn ? <NewsFeed newsArticles={newsArticles} username={username} /> : <Navigate to="/login" />} />
            <Route path="/deleteuser" element={isLoggedIn ? <DeleteUser onDelete={handleDeleteAccount} username={username} /> : <Navigate to="/" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile onNavigatetoPreferences={handleNavigateToPreferences} username={username} /> : <Navigate to="/login" />} />
            <Route path="/podcast" element={isLoggedIn ? <Podcast username={username} themeMode={themeMode} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </ConfigProvider>
    </UserProvider>
  );
}

export default App;
