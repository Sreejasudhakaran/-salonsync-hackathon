import React from 'react';
import { 
  Scissors, 
  Users, 
  Clock, 
  TrendingUp, 
  Smartphone, 
  Bell,
  MapPin,
  Shield,
  Heart,
  Zap,
  Target,
  Award
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'No App Required',
      description: 'Simply scan a QR code - no downloads, no accounts, no hassle.'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get timely alerts via SMS or web notifications when your turn approaches.'
    },
    {
      icon: MapPin,
      title: 'Location Aware',
      description: 'Track your location and get personalized return time estimates.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is secure and we only collect what\'s necessary for the service.'
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'For Customers',
      items: [
        'No more cramped waiting rooms',
        'Freedom to explore nearby shops',
        'Accurate wait time estimates',
        'Timely return notifications'
      ]
    },
    {
      icon: TrendingUp,
      title: 'For Salon Owners',
      items: [
        'Reduced crowding and stress',
        'Better customer satisfaction',
        'Detailed analytics and insights',
        'Improved operational efficiency'
      ]
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers', icon: Users },
    { number: '500+', label: 'Partner Salons', icon: Scissors },
    { number: '98%', label: 'Satisfaction Rate', icon: Heart },
    { number: '25min', label: 'Average Time Saved', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-sm mb-6">
              <Scissors className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">About SalonSync</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Revolutionizing the{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Salon Experience
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              SalonSync transforms traditional salon visits by eliminating idle waiting time and giving 
              customers the freedom to make the most of their day while staying connected to their queue position.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We believe that waiting shouldn't mean sitting idle. Our intelligent queue management 
                system empowers customers to use their time productively while ensuring they never 
                miss their appointment.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                By combining smart technology with thoughtful design, we're creating a new standard 
                for service-based businesses that prioritizes customer freedom and satisfaction.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-700">Customer-Centric Design</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-pink-600 mr-2" />
                  <span className="font-medium text-gray-700">Smart Technology</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 text-center">
              <Award className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Recognition</h3>
              <p className="text-gray-600">
                Winner of the 2024 Innovation in Service Award for transforming customer experience 
                in the beauty and wellness industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Making a Real Impact
            </h2>
            <p className="text-gray-600 text-lg">
              See how SalonSync is transforming salon experiences across the industry
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-shadow duration-200">
                  <stat.icon className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thoughtfully Designed Features
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every feature is built with both customers and salon owners in mind, 
              creating value for everyone involved.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                  <feature.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benefits for Everyone
            </h2>
            <p className="text-gray-600 text-lg">
              SalonSync creates value for both customers and business owners
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl flex items-center justify-center mr-4">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple. Smart. Seamless.
            </h2>
            <p className="text-gray-600 text-lg">
              Getting started with SalonSync is incredibly easy
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Scan QR Code',
                description: 'Simply scan the QR code displayed at your salon to join the digital queue instantly.'
              },
              {
                step: '02',
                title: 'Explore Freely',
                description: 'Leave the salon and explore nearby shops, grab a coffee, or run errands while staying connected.'
              },
              {
                step: '03',
                title: 'Get Notified',
                description: 'Receive timely notifications when your turn is approaching so you can return just in time.'
              },
              {
                step: '04',
                title: 'Enjoy Your Service',
                description: 'Arrive refreshed and ready for your appointment without the stress of waiting around.'
              }
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl text-white">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Salon Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers and salon owners who have discovered 
              the freedom of intelligent queue management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Find Participating Salons
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold border border-white/30 hover:bg-white/30 transition-all duration-200">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;