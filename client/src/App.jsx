import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, logout } from './store/slices/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';
import ThemeProviderWrapper from './components/ThemeProviderWrapper';
import ToastNotification from './components/ToastNotification';
import { Shield } from 'lucide-react';

// Lazy-loaded pages
const Login          = lazy(() => import('./pages/Login'));
const Register       = lazy(() => import('./pages/Register'));
const Dashboard      = lazy(() => import('./pages/Dashboard'));
const Conflicts      = lazy(() => import('./pages/Conflicts'));
const Analytics      = lazy(() => import('./pages/Analytics'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const Profile        = lazy(() => import('./pages/Profile'));
const Settings       = lazy(() => import('./pages/Settings'));
const NotFound       = lazy(() => import('./pages/NotFound'));

/* ── Premium Page Loader ─────────────────────────────────── */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#050811] relative overflow-hidden">
    {/* Background blobs */}
    <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-violet-900/10 blur-[120px] animate-slow-spin pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-indigo-900/10 blur-[100px] animate-reverse-slow-spin pointer-events-none" />

    <div className="relative z-10 flex flex-col items-center gap-5">
      {/* Spinning rings */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-violet-900/40" />
        <div className="absolute inset-0 rounded-full border-2 border-t-violet-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-indigo-400 border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="h-5 w-5 text-violet-400 animate-pulse" />
        </div>
      </div>

      <div className="text-center">
        <p className="text-white font-bold text-sm tracking-tight">Loading workspace</p>
        <p className="text-slate-500 text-xs mt-0.5 font-medium animate-pulse">Initializing modules…</p>
      </div>

      {/* Progress bar */}
      <div className="w-40 h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full animate-[shimmer_1.5s_ease_infinite]"
          style={{ width: '60%', backgroundSize: '200% 100%' }}
        />
      </div>
    </div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) dispatch(fetchCurrentUser());

    const handleAuthExpired = () => dispatch(logout());
    window.addEventListener('auth-expired', handleAuthExpired);
    return () => window.removeEventListener('auth-expired', handleAuthExpired);
  }, [dispatch, token]);

  return (
    <ThemeProviderWrapper>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public */}
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/dashboard"   element={<Dashboard />} />
              <Route path="/conflicts"   element={<Conflicts />} />
              <Route path="/analytics"   element={<Analytics />} />
              <Route path="/profile"     element={<Profile />} />
              <Route path="/settings"    element={<Settings />} />
              <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
            </Route>

            {/* Root redirect & 404 */}
            <Route path="/"  element={<Navigate to="/dashboard" replace />} />
            <Route path="*"  element={<NotFound />} />
          </Routes>
        </Suspense>
        <ToastNotification />
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
