import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, User, Scissors, Clock, CheckCircle, Loader } from 'lucide-react';
import { useQueue } from '../hooks/useQueue';
import { mockServices } from '../utils/mockData';

const WalkInPage: React.FC = () => {
  const navigate = useNavigate();
  const { addCustomer, isLoading, waitingCustomers } = useQueue();
  const [formData, setFormData] = useState({
    name: '',
    service: ''
  });
  const [step, setStep] = useState<'scan' | 'form' | 'success'>('scan');
  const [newCustomer, setNewCustomer] = useState<any>(null);

  const handleScanQR = () => {
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.service) return;

    try {
      const customer = await addCustomer(formData.name, formData.service);
      setNewCustomer(customer);
      setStep('success');
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleViewQueue = () => {
    navigate('/waitlist');
  };

  if (step === 'scan') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-sm mb-6">
              <QrCode className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Scan to Join</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Scan QR Code to Join Queue
            </h1>
            <p className="text-gray-600">
              Point your camera at the salon's QR code to get started
            </p>
          </div>

          {/* QR Code Simulation */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50 mb-8">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6">
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'} rounded-sm`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <QrCode className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-600 font-medium mb-2">Salon QR Code</p>
                <p className="text-sm text-purple-500">Tap to simulate scan</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleScanQR}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <QrCode className="h-5 w-5 mr-2" />
            Simulate QR Scan
          </button>

          {/* Current Queue Info */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Current Queue Status</h3>
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{waitingCustomers.length}</div>
                <div className="text-sm text-gray-500">In Queue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {waitingCustomers.length > 0 
                    ? `${Math.max(15, waitingCustomers.length * 8)}min`
                    : '5min'
                  }
                </div>
                <div className="text-sm text-gray-500">Est. Wait</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-sm mb-6">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">QR Code Scanned</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Join the Queue
            </h1>
            <p className="text-gray-600">
              Tell us about your service needs
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  <User className="h-4 w-4 mr-2 text-purple-500" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  <Scissors className="h-4 w-4 mr-2 text-purple-500" />
                  Service Type
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  <option value="">Select a service</option>
                  {mockServices.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name} - ${service.price} ({service.duration}min)
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-purple-700">Estimated Wait Time</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {waitingCustomers.length > 0 
                    ? `${Math.max(15, waitingCustomers.length * 8)} minutes`
                    : '5-10 minutes'
                  }
                </div>
                <p className="text-sm text-purple-600 mt-1">
                  You'll be #{waitingCustomers.length + 1} in queue
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.name.trim() || !formData.service}
              className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Joining Queue...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Join Queue
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            You're In the Queue!
          </h1>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              #{newCustomer?.position}
            </div>
            <div className="text-sm text-gray-600 mb-4">Your position in queue</div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-gray-700">Service</div>
                <div className="text-purple-600">{newCustomer?.service}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Est. Wait</div>
                <div className="text-pink-600">{newCustomer?.estimatedTime}min</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center text-blue-700">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  We'll notify you 5 minutes before your turn!
                </span>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="text-sm text-green-700">
                <strong>Pro tip:</strong> Check out nearby deals while you wait!
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleViewQueue}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              View Live Queue
            </button>
            
            <button
              onClick={() => navigate('/deals')}
              className="w-full bg-white text-purple-600 font-semibold py-3 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Explore Nearby Deals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkInPage;