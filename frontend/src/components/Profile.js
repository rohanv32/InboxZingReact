// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Profile({ username, onNavigatetoPreferences }) {
//   const [preferences, setPreferences] = useState({});
//   const [statistics, setStatistics] = useState({});
//   const [streak, setStreak] = useState(0);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isAnimating, setIsAnimating] = useState(true); // State to control animation

//   const navigate = useNavigate();

//   // Fetch user preferences on component load
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch preferences
//         const preferencesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${username}`);
//         if (!preferencesResponse.ok) throw new Error("Unable to fetch preferences");
//         const preferencesData = await preferencesResponse.json();
//         setPreferences(preferencesData.preferences);

//         // Fetch statistics
//         const statisticsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${username}/statistics`);
//         if (!statisticsResponse.ok) throw new Error("Unable to fetch statistics");
//         const statisticsData = await statisticsResponse.json();
//         setStatistics(statisticsData);

//         const streakResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/streak/${username}`);
//         if (!streakResponse.ok) throw new Error("Unable to fetch streak");
//         const streakData = await streakResponse.json();
//         setStreak(streakData.streak);  // Set the streak value

//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load user data");
//         setLoading(false);
//       }
//     };
//     fetchData();

//     // Set timeout to end the animation after 3 seconds
//     setTimeout(() => setIsAnimating(false), 3000);
//   }, [username]);

//   const handleShowChangePassword = () => {
//     setShowChangePassword(true);
//     setError(''); // Reset error when toggling form
//     setSuccess(''); // Reset success when toggling form
//   };

//   const handlePasswordUpdate = async (e) => {
//     e.preventDefault();

//     // Clear any previous error and success messages
//     setError('');
//     setSuccess('');

//     // Basic validation
//     if (newPassword !== confirmPassword) {
//       setError('New passwords do not match.');
//       return;
//     }

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     try {
//       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${username}/password`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           current_password: currentPassword,
//           new_password: newPassword,
//         }),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         setError(data.detail || 'Failed to update password');
//         return;
//       }

//       const result = await response.json();
//       setSuccess(result.message || 'Password updated successfully!');
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   const fireAnimationStyle = {
//     position: 'absolute',
//     top: '80%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     textAlign: 'center',
//     animation: 'fireAnimation 3s forwards',
//     fontSize: '4rem',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     opacity: isAnimating ? 1 : 0,
//     transition: 'opacity 1.5s ease-in-out',
//   };

//   const fireIconStyle = {
//     marginRight: '1rem',
//   };

//   const streakNumberStyle = {
//     fontSize: '3rem',
//     fontWeight: 'bold',
//     color: '#f97316', // Fire color
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="max-w-md w-full p-8 text-center">
//         <h1 className="text-4xl font-bold mb-8">Hello, {username}!</h1>

//         {isAnimating ? (
//           <div style={fireAnimationStyle}>
//             <span style={fireIconStyle}>🔥</span>
//             <span style={streakNumberStyle}>{streak}</span>
//           </div>
//         ) : loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div>
//             {/* Display error message if exists */}
//             {error && <p className="text-red-500 mb-4">{error}</p>}

//             <h2 className="text-xl mb-6">Your Preferences</h2>
//             <ul className="mb-6 text-left">
//               {Object.entries(preferences).map(([key, value]) => (
//                 <li key={key}><strong>{key}</strong>: {value.toString()}</li>
//               ))}
//             </ul>

//             {/* Display statistics */}
//             <h2 className="text-xl mb-6">Your Statistics</h2>
//             <ul className="mb-6 text-left space-y-2">
//               <li className="flex items-center">
//                 <span className="text-[#D5C3C6] mr-2">📚</span>
//                 <strong>Articles Read:</strong> {statistics.articlesRead || 0}
//               </li>
//               <li className="flex items-center">
//                 <span className="text-[#D5C3C6] mr-2">📰</span>
//                 <strong>Articles Left to Read:</strong> {statistics.articlesLeft || 0}
//               </li>
//               <li className="flex items-center">
//                 <span className="text-[#D5C3C6] mr-2">⏱️</span>
//                 <strong>Time Spent Reading (seconds):</strong> {statistics.readingTime || 0}
//               </li>
//               <li className="flex items-center">
//                 <span className="text-[#D5C3C6] mr-2">🔥</span>
//                 <strong>Current Streak:</strong> {streak || 0}
//               </li>
//             </ul>

//             {/* Link to update preferences */}
//             <button
//               onClick={() => {
//                 onNavigatetoPreferences('Preferences');
//                 navigate('/preferences');
//               }}
//               className="w-full flex justify-center rounded-sm bg-[#D5C3C6] py-3 mb-4 text-black"
//             >
//               Update Preferences
//             </button>

//             {/* Form to change password */}
//             <button onClick={handleShowChangePassword} className="w-full flex justify-center rounded-sm bg-[#D5C3C6] py-3 mb-4 text-black">
//               Change Password
//             </button>

//             {showChangePassword && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-4">Change Password</h3>

//                 <form onSubmit={handlePasswordUpdate} className="space-y-4">
//                   <div>
//                     <input
//                       type="password"
//                       placeholder="Current Password"
//                       value={currentPassword}
//                       onChange={(e) => setCurrentPassword(e.target.value)}
//                       required
//                       className="border rounded p-2 w-full"
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="password"
//                       placeholder="New Password"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       required
//                       className="border rounded p-2 w-full"
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="password"
//                       placeholder="Confirm New Password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       required
//                       className="border rounded p-2 w-full"
//                     />
//                   </div>
//                   <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">Update Password</button>
//                 </form>
//               </div>
//             )}
//             {success && <p className="text-green-500 mt-4">{success}</p>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaFire, FaBook, FaNewspaper, FaClock } from 'react-icons/fa';
import '../App.css';

function Profile({ username, onNavigatetoPreferences, themeMode }) {
  const [preferences, setPreferences] = useState({});
  const [statistics, setStatistics] = useState({});
  const [streak, setStreak] = useState(0);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const countryCodeMap = {
    ae: '🇦🇪 United Arab Emirates',
    ar: '🇦🇷 Argentina',
    at: '🇦🇹 Austria',
    au: '🇦🇺 Australia',
    be: '🇧🇪 Belgium',
    bg: '🇧🇬 Bulgaria',
    br: '🇧🇷 Brazil',
    ca: '🇨🇦 Canada',
    ch: '🇨🇭 Switzerland',
    cn: '🇨🇳 China',
    co: '🇨🇴 Colombia',
    cu: '🇨🇺 Cuba',
    cz: '🇨🇿 Czech Republic',
    de: '🇩🇪 Germany',
    es: '🇪🇸 Spain',
    eg: '🇪🇬 Egypt',
    fr: '🇫🇷 France',
    gb: '🇬🇧 United Kingdom',
    gr: '🇬🇷 Greece',
    hk: '🇭🇰 Hong Kong',
    hu: '🇭🇺 Hungary',
    id: '🇮🇩 Indonesia',
    ie: '🇮🇪 Ireland',
    il: '🇮🇱 Israel',
    in: '🇮🇳 India',
    is: '🇮🇸 Iceland',
    it: '🇮🇹 Italy',
    jp: '🇯🇵 Japan',
    kr: '🇰🇷 South Korea',
    lt: '🇱🇹 Lithuania',
    lv: '🇱🇻 Latvia',
    ma: '🇲🇦 Morocco',
    mx: '🇲🇽 Mexico',
    my: '🇲🇾 Malaysia',
    ng: '🇳🇬 Nigeria',
    nl: '🇳🇱 Netherlands',
    no: '🇳🇴 Norway',
    nz: '🇳🇿 New Zealand',
    ph: '🇵🇭 Philippines',
    pk: '🇵🇰 Pakistan',
    pl: '🇵🇱 Poland',
    pt: '🇵🇹 Portugal',
    ro: '🇷🇴 Romania',
    rs: '🇷🇸 Serbia',
    ru: '🇷🇺 Russia',
    sa: '🇸🇦 Saudi Arabia',
    se: '🇸🇪 Sweden',
    sg: '🇸🇬 Singapore',
    si: '🇸🇮 Slovenia',
    sk: '🇸🇰 Slovakia',
    th: '🇹🇭 Thailand',
    tr: '🇹🇷 Turkey',
    tw: '🇹🇼 Taiwan',
    ua: '🇺🇦 Ukraine',
    us: '🇺🇸 United States',
    ve: '🇻🇪 Venezuela',
    za: '🇿🇦 South Africa',
    zh: '🇨🇳 China'
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const preferencesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${username}`);
        if (!preferencesResponse.ok) throw new Error("Unable to fetch preferences");
        const preferencesData = await preferencesResponse.json();
        setPreferences(preferencesData.preferences);

        const statisticsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${username}/statistics`);
        if (!statisticsResponse.ok) throw new Error("Unable to fetch statistics");
        const statisticsData = await statisticsResponse.json();
        setStatistics(statisticsData);

        const streakResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/streak/${username}`);
        if (!streakResponse.ok) throw new Error("Unable to fetch streak");
        const streakData = await streakResponse.json();
        setStreak(streakData.streak);

        setLoading(false);
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false);
      }
    };
    fetchData();

    setTimeout(() => setIsAnimating(false), 3000);
  }, [username]);

  const handleShowChangePassword = () => {
    setShowChangePassword(true);
    setError('');
    setSuccess('');
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${username}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || 'Failed to update password');
        return;
      }

      const result = await response.json();
      setSuccess(result.message || 'Password updated successfully!');
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const fireAnimationStyle = {
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    animation: 'fireAnimation 3s forwards',
    fontSize: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isAnimating ? 1 : 0,
    transition: 'opacity 1.5s ease-in-out',
  };

  const fireIconStyle = {
    marginRight: '1rem',
    color: '#f97316',
  };

  const streakNumberStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#f97316',
  };

  const iconStyle = {
    marginRight: '0.5rem',
  };

  // const containerStyle = isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800';
  // const cardStyle = isDarkMode ? 'bg-gray-800' : 'bg-white';
  // const buttonStyle = isDarkMode ? 'bg-gray-600 text-gray-100 hover:bg-gray-500' : 'border border-gray-400 text-gray-800 hover:bg-gray-300';
  // const inputStyle = isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800';
  // const textStyle = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="flex min-h-screen flex-col items-center p-8 pt-24" style={{ backgroundColor: themeMode === 'Dark' ? '#1a1a1a' : '#f9f9f9' }}>
      <div className={`max-w-md w-full shadow-lg rounded-lg text-center space-y-6 p-8`}>
        <h1 className="text-4xl font-bold">Hello, {username}!</h1>

        {isAnimating ? (
          <div style={fireAnimationStyle}>
            <FaFire style={fireIconStyle} />
            <span style={streakNumberStyle}>{streak}</span>
          </div>
        ) : loading ? (
          <FaSpinner className="text-4xl animate-spin" />
        ) : (
          <div>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-6">
              <h2 className={`text-2xl font-semibold mb-4`}>Your Preferences</h2>
              <div className="grid gap-2">
                {Object.entries(preferences).map(([key, value]) => {
                  let displayValue = value.toString();
                  if (key === 'sources') {
                    const sources = value.toString().split(',').map(source => source.trim().toUpperCase());
                    if (sources.length > 1) {
                      return (
                        <div key={key} className="flex items-center justify-between p-2 border border-gray-400 rounded">
                          <span className="font-medium">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </span>
                          <details>
                            <summary className="cursor-pointer">Show more</summary>
                            <ul>
                              {sources.map((source, index) => (
                                <li key={index}>{source}</li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      );
                    } else {
                      displayValue = sources.join(', ');
                    }
                  } else if (key === 'country') {
                    displayValue = countryCodeMap[value.toLowerCase()] || value.toString().toUpperCase();
                  } else {
                    displayValue = value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
                  }

                  return (
                    <div key={key} className="flex items-center justify-between p-2 border border-gray-400 rounded">
                      <span className="font-medium">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span>{displayValue}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h2 className={`text-2xl font-semibold mb-4`}>Your Statistics</h2>
              <div className="grid gap-2">
                <div className="flex items-center justify-between p-2 border border-gray-400 rounded">
                  <div className="flex items-center">
                    <FaBook/>
                    <span className="font-medium">Articles Read:</span>
                  </div>
                  <span>{statistics.articlesRead || 0}</span>
                </div>
                <div className="flex items-center justify-between p-2 border border-gray-400 rounded">
                  <div className="flex items-center">
                    <FaNewspaper/>
                    <span className="font-medium">Articles Left to Read:</span>
                  </div>
                  <span>{statistics.articlesLeft || 0}</span>
                </div>
                <div className="flex items-center justify-between p-2 border border-gray-400 rounded">
                  <div className="flex items-center">
                    <FaClock/>
                    <span className="font-medium">Time Spent Reading (seconds):</span>
                  </div>
                  <span>{statistics.readingTime || 0}</span>
                </div>
                <div className="flex items-center justify-between p-2 border border-gray-400 rounded">
                  <div className="flex items-center">
                    <FaFire/>
                    <span className="font-medium">Current Streak:</span>
                  </div>
                  <span>{streak || 0}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onNavigatetoPreferences('Preferences');
                navigate('/preferences');
              }}
              className={`w-full flex justify-center rounded-sm py-3 mb-4 transition duration-300`}
            >
              Update Preferences
            </button>

            <button onClick={handleShowChangePassword} className={`w-full flex justify-center rounded-sm py-3 mb-4 transition duration-300`}>
              Change Password
            </button>

            {showChangePassword && (
              <div className="mt-6">
                <h3 className={`text-lg font-semibold mb-4`}>Change Password</h3>

                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className={`border rounded p-2 w-full`}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className={`border rounded p-2 w-full`}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={`border rounded p-2 w-full`}
                    />
                  </div>
                  <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition duration-300">Update Password</button>
                </form>
              </div>
            )}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </div>
        )}
      </div>
    </div>

  );
}

export default Profile;