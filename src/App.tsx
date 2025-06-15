import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './components/HomePage';
import WalkInPage from './components/WalkInPage';
import WaitlistPage from './components/WaitlistPage';
import StaffDashboard from './components/StaffDashboard';
import NearbyDeals from './components/NearbyDeals';
import ReturnEstimator from './components/ReturnEstimator';
import AboutPage from './components/AboutPage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import ProfilePage from './components/Auth/ProfilePage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/walk-in" element={<WalkInPage />} />
              <Route path="/waitlist" element={<WaitlistPage />} />
              <Route path="/deals" element={<NearbyDeals />} />
              <Route path="/estimator" element={<ReturnEstimator />} />
              <Route path="/about" element={<AboutPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/staff" 
                element={
                  <ProtectedRoute requireRole="staff">
                    <StaffDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;