import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-center p-6">
      <h1 className="text-6xl font-bold text-violet-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="px-6 py-3 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
