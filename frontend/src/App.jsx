import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';
import Tracking from './components/Tracking.jsx';
import UpdatePassword from './components/UpdatePassword.jsx';
import Events from './components/Events.jsx';
import OAuthAuthenticate from './components/OAuthAuthenticate.jsx';
import DialectTips from "./components/DialectTips.jsx";
import SavedTranslations from "./components/SavedTranslations.jsx";
import EventDetail from "./components/EventDetail.jsx";
import Reservations from "./components/Reservations.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        <Route path="/oauth-callback" element={<OAuthAuthenticate />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event-details/:event_id" element={<EventDetail />} />

        {/* Core MyTranslationBuddy Features */}
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/tips" element={<DialectTips />} />
        <Route path="/saved" element={<SavedTranslations />} />
      </Routes>
    </Router>
  );
}

export default App;