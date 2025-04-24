import { AuthContext } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
const {auth} = useContext(AuthContext)
 return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center font-sans">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={() => {
          if (auth?.user?.role === 'instructor') {
            navigate('/instructor');
          } else if (auth?.user?.role === 'admin') {
            navigate('/admin');
          } else if (auth?.user?.role === 'student') {
            navigate('/student');
          } else {
            navigate('/');
          }
        }}
        className="px-6 py-2 text-lg text-gray-900 bg-white rounded hover:bg-gray-200 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
