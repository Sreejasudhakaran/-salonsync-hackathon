import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Bell, 
  Settings, 
  Edit3, 
  Save, 
  X,
  Camera,
  Award,
  Clock,
  DollarSign,
  Scissors,
  Star,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    notifications: user?.preferences.notifications || true
  });

  const handleSave = async () => {
    if (!user) return;
    
    await updateProfile({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferences: {
        ...user.preferences,
        notifications: formData.notifications
      }
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!user) return;
    
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      notifications: user.preferences.notifications
    });
    setIsEditing(false);
  };

  if (!user) return null;

  const stats = [
    { 
      icon: Calendar, 
      label: 'Total Visits', 
      value: user.stats.totalVisits.toString(),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    { 
      icon: DollarSign, 
      label: 'Total Spent', 
      value: `$${user.stats.totalSpent}`,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      icon: Clock, 
      label: 'Avg. Wait Time', 
      value: `${user.stats.averageWaitTime}min`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      icon: Scissors, 
      label: 'Favorite Service', 
      value: user.stats.favoriteService || 'None',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-purple-600" />
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    <Camera className="h-4 w-4" />
                  </motion.button>
                </motion.div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-500 text-sm capitalize">{user.role}</p>
                
                {user.role === 'customer' && (
                  <div className="mt-4 inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-purple-700">Loyal Customer</span>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={logout}
                  className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 rounded-2xl hover:bg-gray-50 transition-all duration-200"
                >
                  Sign Out
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-purple-500" />
                  Account Information
                </h3>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors duration-200 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-600 transition-colors duration-200 flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    <User className="h-4 w-4 mr-2 text-purple-500" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.name}</div>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    <Mail className="h-4 w-4 mr-2 text-purple-500" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.email}</div>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    <Phone className="h-4 w-4 mr-2 text-purple-500" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                      {user.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    <Bell className="h-4 w-4 mr-2 text-purple-500" />
                    Notifications
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl">
                    <motion.label 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.notifications}
                        onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Enable queue notifications
                      </span>
                    </motion.label>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Statistics */}
            {user.role === 'customer' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Your Statistics
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-200"
                    >
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-500" />
                Recent Activity
              </h3>

              <div className="space-y-4">
                {[
                  { action: 'Completed haircut appointment', time: '2 days ago', icon: Scissors },
                  { action: 'Joined queue at Downtown Salon', time: '1 week ago', icon: Clock },
                  { action: 'Updated profile preferences', time: '2 weeks ago', icon: Settings }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <activity.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;