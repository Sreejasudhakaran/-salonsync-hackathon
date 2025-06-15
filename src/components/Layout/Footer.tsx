import React from 'react';
import { Heart, Scissors } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-50 to-pink-50 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl">
                <Scissors className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SalonSync
                </h3>
                <p className="text-sm text-gray-500">Smart Queue Management</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Transform your salon experience with our intelligent queue management system. 
              Walk in, wander out, and be back just in time for your service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/walk-in" className="text-gray-600 hover:text-purple-600 transition-colors">Join Queue</a></li>
              <li><a href="/waitlist" className="text-gray-600 hover:text-purple-600 transition-colors">Live Queue</a></li>
              <li><a href="/deals" className="text-gray-600 hover:text-purple-600 transition-colors">Nearby Deals</a></li>
              <li><a href="/estimator" className="text-gray-600 hover:text-purple-600 transition-colors">Return Timer</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 SalonSync. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-gray-500 mt-4 sm:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-pink-500 fill-current" />
            <span>for beautiful salon experiences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;