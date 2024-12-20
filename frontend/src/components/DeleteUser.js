import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  

// rediraection hook maintained by useNavigate
function DeleteUser({ onDelete, username }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  // delete button handaling functiona and triggers the API
  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }


      onDelete();

      // Log the user out by clearing session or localStorage or cookies
      // Clear user session or authentication tokens here
      localStorage.removeItem('authToken');  
      sessionStorage.removeItem('authToken'); 

      // Redirected to Login/sign up page
      navigate('/'); // Using navigate instead of history.push

    } catch (err) {
      setError('An error occurred while deleting your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/newsfeed');
  };


  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md w-full p-8 text-center">
        <h1 className="text-4xl font-bold mb-8">
          THE INBOX ZING!
        </h1>
        
        <h2 className="text-xl mb-6">
          Delete Account
        </h2>
        
        <p className="mb-8 text-sm">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* User presses the Delete button to trigger handleDelete */}
        <button 
          onClick={handleDelete} 
          className="w-full flex justify-center rounded-sm bg-[#D5C3C6] py-3 text-black"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </button>
        
        <div className="mt-4 text-center text-sm">
          <button 
            onClick={handleGoBack} 
            className="text-black underline"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;