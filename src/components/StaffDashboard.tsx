import React from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  BarChart3, 
  User,
  Calendar,
  Timer
} from 'lucide-react';
import { useQueue } from '../hooks/useQueue';
import { mockAnalytics } from '../utils/mockData';

const StaffDashboard: React.FC = () => {
  const { customers, waitingCustomers, currentCustomer, markAsServed, removeCustomer } = useQueue();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getWaitTime = (joinedAt: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - joinedAt.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins}min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Staff Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your salon queue and track performance metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{mockAnalytics.totalCustomersToday}</div>
                <div className="text-sm text-gray-500">Today's Customers</div>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-pink-600">{waitingCustomers.length}</div>
                <div className="text-sm text-gray-500">Currently Waiting</div>
              </div>
              <Users className="h-8 w-8 text-pink-400" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{mockAnalytics.averageWaitTime}min</div>
                <div className="text-sm text-gray-500">Avg. Wait Time</div>
              </div>
              <Clock className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{currentCustomer ? '1' : '0'}</div>
                <div className="text-sm text-gray-500">Being Served</div>
              </div>
              <Timer className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Queue Management */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-purple-500" />
                Queue Management
              </h2>

              {/* Current Customer */}
              {currentCustomer && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-green-700 mb-1">Currently Serving</div>
                      <div className="text-lg font-semibold text-gray-900">{currentCustomer.name}</div>
                      <div className="text-sm text-green-600">{currentCustomer.service}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-600 mb-2">
                        Started: {formatTime(currentCustomer.joinedAt)}
                      </div>
                      <button
                        onClick={() => markAsServed(currentCustomer.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                      >
                        Mark as Complete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Waiting Queue */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700 mb-3">
                  Waiting Queue ({waitingCustomers.length})
                </h3>
                
                {waitingCustomers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No customers waiting</p>
                  </div>
                ) : (
                  waitingCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        customer.position === 1
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                          customer.position === 1
                            ? 'bg-yellow-500'
                            : 'bg-purple-500'
                        }`}>
                          {customer.position}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-600">{customer.service}</div>
                          <div className="text-xs text-gray-500">
                            Joined: {formatTime(customer.joinedAt)} • Waiting: {getWaitTime(customer.joinedAt)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {customer.position === 1 && !currentCustomer && (
                          <button
                            onClick={() => markAsServed(customer.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                          >
                            Start Service
                          </button>
                        )}
                        <button
                          onClick={() => removeCustomer(customer.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="space-y-6">
            {/* Peak Hours Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                Peak Hours Today
              </h3>
              <div className="space-y-2">
                {mockAnalytics.peakHours.slice(0, 6).map((hour) => (
                  <div key={hour.hour} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {hour.hour}:00 - {hour.hour + 1}:00
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${(hour.customers / 16) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-6">
                        {hour.customers}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                Service Performance
              </h3>
              <div className="space-y-3">
                {mockAnalytics.serviceStats.map((stat) => (
                  <div key={stat.service} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{stat.service}</span>
                      <span className="text-sm text-purple-600 font-semibold">{stat.count}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Avg time: {stat.avgTime}min
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-purple-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                  Export Today's Report
                </button>
                <button className="w-full bg-white border border-purple-200 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition-all duration-200">
                  Send Queue Updates
                </button>
                <button className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200">
                  View Weekly Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;