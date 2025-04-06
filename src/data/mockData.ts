import { Restaurant, Category } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Petite Maison',
    cuisine: 'French',
    priceRange: '$$$',
    rating: 4.8,
    image: '/restaurant-1.jpg',
    location: '123 Main St, City',
    description: 'Experience authentic French cuisine in an elegant setting.',
    openingHours: {
      open: '12:00',
      close: '23:00',
    },
    isOpen: true,
  },
  {
    id: '2',
    name: 'Sakura Japanese',
    cuisine: 'Japanese',
    priceRange: '$$$$',
    rating: 4.9,
    image: '/restaurant-2.jpg',
    location: '456 Oak St, City',
    description: 'Premium sushi and traditional Japanese dishes.',
    openingHours: {
      open: '11:30',
      close: '22:30',
    },
    isOpen: true,
  },
  {
    id: '3',
    name: 'Taj Mahal',
    cuisine: 'Indian',
    priceRange: '$$',
    rating: 4.7,
    image: '/restaurant-3.jpg',
    location: '789 Pine St, City',
    description: 'Authentic Indian flavors in a modern setting.',
    openingHours: {
      open: '11:00',
      close: '23:00',
    },
    isOpen: true,
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Italian',
    image: '/italian-cuisine.jpg',
  },
  {
    id: '2',
    name: 'Japanese',
    image: '/japanese-cuisine.jpg',
  },
  {
    id: '3',
    name: 'Indian',
    image: '/indian-cuisine.jpg',
  },
  {
    id: '4',
    name: 'French',
    image: '/french-cuisine.jpg',
  },
]; 