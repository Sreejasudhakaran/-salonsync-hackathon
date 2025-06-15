import { useState, useEffect } from 'react';
import { Customer } from '../types';
import { generateMockCustomers } from '../utils/mockData';

export const useQueue = () => {
  const [customers, setCustomers] = useState<Customer[]>(generateMockCustomers());
  const [isLoading, setIsLoading] = useState(false);

  const addCustomer = async (name: string, service: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newCustomer: Customer = {
      id: `customer-${Date.now()}`,
      name,
      service,
      joinedAt: new Date(),
      estimatedTime: Math.floor(Math.random() * 30) + 15,
      position: customers.length + 1,
      status: 'waiting'
    };

    setCustomers(prev => [...prev, newCustomer]);
    setIsLoading(false);
    return newCustomer;
  };

  const markAsServed = (customerId: string) => {
    setCustomers(prev => 
      prev.map(customer => {
        if (customer.id === customerId) {
          return { ...customer, status: 'being-served' as const };
        }
        if (customer.status === 'being-served') {
          return { ...customer, status: 'completed' as const };
        }
        return customer;
      }).filter(customer => customer.status !== 'completed')
        .map((customer, index) => ({ ...customer, position: index + 1 }))
    );
  };

  const removeCustomer = (customerId: string) => {
    setCustomers(prev => 
      prev.filter(customer => customer.id !== customerId)
        .map((customer, index) => ({ ...customer, position: index + 1 }))
    );
  };

  // Update wait times every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCustomers(prev => 
        prev.map(customer => ({
          ...customer,
          estimatedTime: Math.max(0, customer.estimatedTime - 1)
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    customers,
    isLoading,
    addCustomer,
    markAsServed,
    removeCustomer,
    waitingCustomers: customers.filter(c => c.status === 'waiting'),
    currentCustomer: customers.find(c => c.status === 'being-served'),
  };
};