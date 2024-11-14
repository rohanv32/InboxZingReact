import React, { createContext, useState, useContext, useEffect } from 'react';

export const defaultPreferences = {
  country: 'us',
  category: 'business',
  language: 'en',
  summaryStyle: 'detailed',
  frequency: 24,
};

// User context created to be accessible in the app
export const UserContext = createContext();

// State to store user preferences, with default set values as added below
// default values for the country,category,language summstyle and frequency
export function UserProvider({ children }) {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  // Log when username or login status changes
  useEffect(() => {
    console.log('Username updated in context:', username);
  }, [username]);

  useEffect(() => {
    console.log('Login status changed:', isLoggedIn);
  }, [isLoggedIn]);

  // Wrap nested components in the UserContext provider, 
  // allowing them to access or update preferences
  return (
    <UserContext.Provider value={{ username, setUsername, isLoggedIn, setIsLoggedIn, preferences, setPreferences }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

//accessing only the username state
export const useUsername = () => {
  const { username } = useUserContext();
  return username;
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useUserContext();
  return isLoggedIn;
};

export const useUserActions = () => {
  const { username, setUsername, isLoggedIn, setIsLoggedIn, preferences, setPreferences } = useUserContext();
  return { username, setUsername, isLoggedIn, setIsLoggedIn, preferences, setPreferences };
};
