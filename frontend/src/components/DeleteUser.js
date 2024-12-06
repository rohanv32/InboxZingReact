import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  

function DeleteUser({ onDelete, username }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  // Function to create the delete button click for deleting the user
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

      // after delete is processed
      onDelete();

      // clear session and log the user out
     
      localStorage.removeItem('authToken');  
      sessionStorage.removeItem('authToken'); 

      // Redirect to login after account deletion
      navigate('/login'); 

    } catch (err) {
      setError('An error occurred while deleting your account. Please try again.');
    } finally {
      setLoading(false);
    }
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
        
        {/* User presses on Delete button to initiates handleDelete */}
        <button 
          onClick={handleDelete} 
          className="w-full flex justify-center rounded-sm bg-[#D5C3C6] py-3 text-black"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </button>
        
        {/* Link to renavigate to settings page */}
        <div className="mt-4 text-center text-sm">
          <a href="/settings" className="text-black underline">
            Go Back
          </a>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;