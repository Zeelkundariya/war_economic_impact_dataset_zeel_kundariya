import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Map } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-dot-grid opacity-50 pointer-events-none" />
    <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-violet-900/10 blur-[120px] animate-slow-spin pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-indigo-900/10 blur-[100px] animate-reverse-slow-spin pointer-events-none" />

    <div className="relative z-10 text-center px-6 animate-fade-up">
      {/* Floating shield */}
      <div className="flex justify-center mb-8">
        <div className="relative animate-float">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-25 blur-2xl" />
          <div className="relative w-20 h-20 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Map className="h-10 w-10 text-white" />
          </div>
        </div>
      </div>

      {/* 404 text */}
      <div className="mb-4">
        <h1 className="text-8xl font-black gradient-text-animate leading-none">404</h1>
        <h2 className="text-2xl font-bold text-white mt-3">Region Not Found</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
          The geopolitical sector you're looking for doesn't exist in our database. Navigate back to your command center.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-6 py-3 premium-gradient-btn text-white font-bold rounded-xl text-sm"
        >
          <Shield className="h-4 w-4" />
          Return to Dashboard
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 glass-panel-dark border border-white/10 text-slate-300 font-semibold rounded-xl text-sm hover:border-violet-500/30 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  </div>
);

export default NotFound;
