import React, { useState } from 'react';
import { MapPin, Clock, Star, ExternalLink, Filter, Navigation } from 'lucide-react';
import { mockDeals } from '../utils/mockData';

const NearbyDeals: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Deals' },
    { id: 'food', name: 'Food & Drink' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'entertainment', name: 'Entertainment' }
  ];

  const filteredDeals = selectedCategory === 'all' ? mockDeals : mockDeals;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-sm mb-6">
            <MapPin className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Nearby Offers</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Deals While You Wait
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make the most of your wait time! Discover exclusive offers from businesses near the salon.
          </p>
        </div>

        {/* Wait Time Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Queue Status</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>15 min estimated wait</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></span>
                  <span>Position #3 in queue</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-1">Perfect time to explore!</div>
              <div className="text-2xl font-bold">12 min</div>
              <div className="text-sm opacity-90">time remaining</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center mr-4">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-white/50 hover:text-purple-600 hover:bg-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {deal.discount} OFF
                </div>
                <div className="absolute bottom-4 left-4 flex items-center bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  <Navigation className="h-3 w-3 mr-1" />
                  {deal.distance}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{deal.title}</h3>
                    <p className="text-purple-600 font-medium text-sm">{deal.business}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{deal.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Perfect timing!</span>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center">
                    <span>Get Directions</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-purple-500" />
              Nearby Locations
            </h2>
            <button className="text-purple-600 font-medium text-sm hover:text-purple-700 transition-colors">
              View in Maps App
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <p className="text-purple-600 font-medium">Interactive Map</p>
              <p className="text-sm text-purple-500 mt-2">
                View all nearby deals on an interactive map
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Time for a Quick Adventure?
          </h3>
          <p className="text-gray-600 mb-4">
            You have enough time to grab a coffee or browse the bookstore. We'll notify you when to head back!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
              Enable Location Notifications
            </button>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-medium border border-purple-200 hover:bg-purple-50 transition-all duration-200">
              Set Return Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyDeals;