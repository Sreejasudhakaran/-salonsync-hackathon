import React, { useState, useEffect } from 'react';
import { Clock, Users, Eye, Settings, Bell, RefreshCw } from 'lucide-react';
import { useQueue } from '../hooks/useQueue';

const WaitlistPage: React.FC = () => {
  const { customers, waitingCustomers, currentCustomer } = useQueue();
  const [viewMode, setViewMode] = useState<'customer' | 'staff'>('customer');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getWaitTime = (position: number) => {
    if (position === 1 && currentCustomer) return 'Up Next!';
    return `${Math.max(5, (position - 1) * 8)} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-sm mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-700">Live Queue Updates</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Current Waitlist
          </h1>
          <p className="text-gray-600 mb-6">
            Real-time queue status • Last updated {formatTime(lastUpdated)}
          </p>

          {/* View Toggle */}
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-1 border border-purple-200 shadow-sm">
            <button
              onClick={() => setViewMode('customer')}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                viewMode === 'customer'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Eye className="h-4 w-4 inline mr-2" />
              Customer View
            </button>
            <button
              onClick={() => setViewMode('staff')}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                viewMode === 'staff'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Staff View
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{waitingCustomers.length}</div>
                <div className="text-sm text-gray-500">Waiting</div>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-pink-600">
                  {waitingCustomers.length > 0 ? `${Math.max(15, waitingCustomers.length * 8)}min` : '5min'}
                </div>
                <div className="text-sm text-gray-500">Avg. Wait</div>
              </div>
              <Clock className="h-8 w-8 text-pink-400" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {currentCustomer ? '1' : '0'}
                </div>
                <div className="text-sm text-gray-500">Being Served</div>
              </div>
              <RefreshCw className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Current Customer */}
        {currentCustomer && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Currently Being Served</h3>
                  <div className="text-2xl font-bold mb-1">
                    {viewMode === 'customer' ? currentCustomer.name.split(' ')[0] + ' S.' : currentCustomer.name}
                  </div>
                  <div className="text-green-100">{currentCustomer.service}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-100 text-sm">Started</div>
                  <div className="text-xl font-semibold">
                    {formatTime(currentCustomer.joinedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Queue List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-purple-500" />
            Waiting Queue
          </h2>

          {waitingCustomers.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/50 shadow-lg">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Queue is Empty</h3>
              <p className="text-gray-500">No customers waiting at the moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {waitingCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg transition-all duration-200 hover:shadow-xl ${
                    customer.position === 1 
                      ? 'ring-2 ring-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50' 
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        customer.position === 1
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse'
                          : customer.position <= 3
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500'
                      }`}>
                        {customer.position}
                      </div>
                      
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">
                          {viewMode === 'customer' ? customer.name.split(' ')[0] + ' S.' : customer.name}
                        </div>
                        <div className="text-purple-600 font-medium">{customer.service}</div>
                        <div className="text-sm text-gray-500">
                          Joined at {formatTime(customer.joinedAt)}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        customer.position === 1 ? 'text-yellow-600' : 'text-purple-600'
                      }`}>
                        {getWaitTime(customer.position)}
                      </div>
                      <div className="text-sm text-gray-500">estimated</div>
                      {customer.position === 1 && (
                        <div className="mt-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                          Next in line!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auto-refresh Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm">Updates automatically every 30 seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;