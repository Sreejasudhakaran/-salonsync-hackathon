import { Customer, Service, Deal, Analytics } from '../types';

export const mockServices: Service[] = [
  { id: '1', name: 'Haircut', duration: 30, price: 35 },
  { id: '2', name: 'Beard Trim', duration: 15, price: 20 },
  { id: '3', name: 'Hair Coloring', duration: 90, price: 80 },
  { id: '4', name: 'Hair Wash & Blow Dry', duration: 20, price: 25 },
  { id: '5', name: 'Styling', duration: 25, price: 30 },
  { id: '6', name: 'Full Package', duration: 60, price: 65 },
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: '10% Off Coffee',
    description: 'Enjoy a fresh brew while you wait',
    discount: '10%',
    business: 'Café Luna',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '2 min walk'
  },
  {
    id: '2',
    title: 'Free Pastry',
    description: 'With any drink purchase',
    discount: 'FREE',
    business: 'Sweet Treats Bakery',
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '3 min walk'
  },
  {
    id: '3',
    title: '15% Off Books',
    description: 'Perfect reading material',
    discount: '15%',
    business: 'Corner Bookstore',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '5 min walk'
  },
  {
    id: '4',
    title: 'Buy 1 Get 1',
    description: 'Fresh juice combinations',
    discount: 'BOGO',
    business: 'Fresh Squeeze',
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '4 min walk'
  }
];

export const mockAnalytics: Analytics = {
  totalCustomersToday: 47,
  averageWaitTime: 18,
  peakHours: [
    { hour: 9, customers: 3 },
    { hour: 10, customers: 5 },
    { hour: 11, customers: 8 },
    { hour: 12, customers: 12 },
    { hour: 13, customers: 15 },
    { hour: 14, customers: 11 },
    { hour: 15, customers: 9 },
    { hour: 16, customers: 13 },
    { hour: 17, customers: 16 },
    { hour: 18, customers: 14 },
    { hour: 19, customers: 7 },
  ],
  serviceStats: [
    { service: 'Haircut', count: 18, avgTime: 32 },
    { service: 'Beard Trim', count: 12, avgTime: 16 },
    { service: 'Hair Coloring', count: 4, avgTime: 95 },
    { service: 'Styling', count: 8, avgTime: 28 },
    { service: 'Full Package', count: 5, avgTime: 65 },
  ]
};

export const generateMockCustomers = (): Customer[] => {
  const names = ['Alex Chen', 'Maria Rodriguez', 'James Wilson', 'Sarah Kim', 'Michael Brown', 'Emma Davis'];
  const services = mockServices.map(s => s.name);
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: `customer-${i + 1}`,
    name: names[i] || `Customer ${i + 1}`,
    service: services[Math.floor(Math.random() * services.length)],
    joinedAt: new Date(Date.now() - Math.random() * 3600000),
    estimatedTime: Math.floor(Math.random() * 30) + 10,
    position: i + 1,
    status: i === 0 ? 'being-served' : 'waiting'
  }));
};