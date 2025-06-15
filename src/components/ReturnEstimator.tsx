import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  Timer,
  Smartphone
} from 'lucide-react';

const ReturnEstimator: React.FC = () => {
  const [userLocation, setUserLocation] = useState<'nearby' | 'far' | 'unknown'>('unknown');
  const [estimatedReturn, setEstimatedReturn] = useState<number>(5);
  const [queueTime, setQueueTime] = useState<number>(12);
  const [countdown, setCountdown] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Simulate getting user location
    const timer = setTimeout(() => {
      setUserLocation('nearby');
      setEstimatedReturn(5);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleStartReturn = () => {
    setCountdown(estimatedReturn * 60); // Convert to seconds
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const getStatusColor = () => {
    const timeDiff = queueTime - estimatedReturn;
    if (timeDiff >= 3) return 'green';
    if (timeDiff >= 0) return 'yellow';
    return 'red';
  };

  const getStatusMessage = () => {
    const timeDiff = queueTime - estimatedReturn;
    if (timeDiff >= 3) return "Perfect timing! You'll arrive with time to spare.";
    if (timeDiff >= 0) return "Good timing! You should arrive just in time.";
    return "You might be a few minutes late. Consider heading back now.";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-sm mb-6">
            <Navigation className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Return Timer</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Return Estimator
          </h1>
          <p className="text-gray-600">
            Track your location and get notified when it's time to head back to the salon
          </p>
        </div>

        {/* Notification Banner */}
        {showNotification && (
          <div className="bg-blue-600 text-white rounded-2xl p-4 mb-6 shadow-lg animate-bounce">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 mr-3" />
              <span className="font-medium">Return timer started! We'll notify you when to head back.</span>
            </div>
          </div>
        )}

        {/* Current Status Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-500" />
            Current Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{queueTime} min</div>
              <div className="text-sm text-gray-500">Your turn in queue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">
                {userLocation === 'unknown' ? '...' : `${estimatedReturn} min`}
              </div>
              <div className="text-sm text-gray-500">Return time</div>
            </div>
          </div>

          {/* Location Status */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-700">Location Status</span>
              {userLocation === 'unknown' ? (
                <div className="flex items-center text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                  <span className="text-sm">Locating...</span>
                </div>
              ) : (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">Located</span>
                </div>
              )}
            </div>
            
            {userLocation !== 'unknown' && (
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Corner Bookstore • 3 blocks away</span>
              </div>
            )}
          </div>

          {/* Timing Assessment */}
          {userLocation !== 'unknown' && (
            <div className={`rounded-2xl p-4 border-2 ${
              getStatusColor() === 'green' 
                ? 'bg-green-50 border-green-200'
                : getStatusColor() === 'yellow'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center mb-2">
                {getStatusColor() === 'green' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className={`h-5 w-5 mr-2 ${
                    getStatusColor() === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                )}
                <span className={`font-medium ${
                  getStatusColor() === 'green' 
                    ? 'text-green-700'
                    : getStatusColor() === 'yellow'
                    ? 'text-yellow-700'
                    : 'text-red-700'
                }`}>
                  Timing Assessment
                </span>
              </div>
              <p className={`text-sm ${
                getStatusColor() === 'green' 
                  ? 'text-green-600'
                  : getStatusColor() === 'yellow'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}>
                {getStatusMessage()}
              </p>
            </div>
          )}
        </div>

        {/* Return Timer */}
        {countdown > 0 && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-8 shadow-xl">
            <div className="text-center">
              <Timer className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Return Timer Active</h3>
              <div className="text-4xl font-bold mb-2">{formatTime(countdown)}</div>
              <p className="text-purple-100">Time remaining to start your return journey</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {userLocation !== 'unknown' && countdown === 0 && (
            <button
              onClick={handleStartReturn}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              <Timer className="h-5 w-5 mr-2" />
              Start Return Timer
            </button>
          )}

          <button className="w-full bg-white/80 backdrop-blur-sm text-purple-600 font-semibold py-4 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 flex items-center justify-center">
            <MapPin className="h-5 w-5 mr-2" />
            Get Walking Directions
          </button>

          <button className="w-full bg-white/80 backdrop-blur-sm text-gray-600 font-semibold py-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 flex items-center justify-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Enable Push Notifications
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• We recommend starting your return 2-3 minutes before your estimated time</li>
            <li>• Consider traffic and walking speed when planning your return</li>
            <li>• You'll receive a notification when you're next in queue</li>
            <li>• The salon will hold your spot for up to 5 minutes after your turn</li>
          </ul>
        </div>

        {/* Emergency Contact */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Running late or need help?</p>
          <button className="text-purple-600 font-medium text-sm hover:text-purple-700 transition-colors">
            Contact Salon Directly
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnEstimator;