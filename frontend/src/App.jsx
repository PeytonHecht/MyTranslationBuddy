import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';
import UpdatePassword from './components/UpdatePassword.jsx';
import Events from './components/Events.jsx';
import OAuthAuthenticate from './components/OAuthAuthenticate.jsx';
import DialectTips from "./components/DialectTips.jsx";
import EventDetail from "./components/EventDetail.jsx";
import Reservations from "./components/Reservations.jsx";
import TranslateWidget from "./components/TranslateWidget.jsx";
import { isLoggedIn, restoreSession } from './utils/auth.js';

/**
 * ProtectedRoute — renders the page in guest/empty state when not logged in.
 * Each protected page handles its own empty state internally by checking isLoggedIn().
 * This wrapper just redirects to login for pages that truly cannot show anything.
 */
function ProtectedRoute({ children, softGuard }) {
  if (isLoggedIn()) return children;
  // Soft guard: let the page render — it will show its own empty state
  if (softGuard) return children;
  // Hard guard: redirect
  return <Navigate to="/login" replace />;
}

/** Only show TranslateWidget when not on login/register */
function ConditionalTranslateWidget() {
  const location = useLocation();
  const hideOn = ["/login", "/register"];
  if (hideOn.includes(location.pathname)) return null;
  return <TranslateWidget />;
}

function App() {
  // On mount, try to restore a session from the stored JWT token
  useEffect(() => {
    if (!isLoggedIn()) restoreSession();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/update-password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
        <Route path="/oauth-callback" element={<OAuthAuthenticate />} />
        <Route path="/events" element={<ProtectedRoute softGuard><Events /></ProtectedRoute>} />
        <Route path="/event-details/:event_id" element={<EventDetail />} />
        <Route path="/tracking" element={<Navigate to="/reservations" replace />} />
        <Route path="/reservations" element={<ProtectedRoute softGuard><Reservations /></ProtectedRoute>} />
        <Route path="/tips" element={<DialectTips />} />
        <Route path="/saved" element={<Navigate to="/reservations?tab=saved" replace />} />
      </Routes>

      <ConditionalTranslateWidget />
    </Router>
  );
}

export default App;