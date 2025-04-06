'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { restaurants } from '../../../data/mockData';
import { Restaurant } from '../../../types';

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const restaurant = restaurants.find(r => r.id === params.id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [guests, setGuests] = useState(2);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-[#E11D48] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#C01D48] transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    // Here you would typically make an API call to create a booking
    console.log('Booking details:', {
      restaurantId: restaurant.id,
      date: selectedDate,
      time: selectedTime,
      guests,
    });
    alert('Booking successful!');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="bg-[#141414] border-b border-[#2A2A2A] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>
              FoodClass
            </h1>
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <div className="relative h-[400px]">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Restaurant Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column - Restaurant Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>
            <div className="flex items-center gap-4 text-gray-300 mb-6">
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>{restaurant.priceRange}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {restaurant.rating} <span className="text-yellow-400">★</span>
              </span>
            </div>
            <p className="text-gray-300 mb-8">{restaurant.description}</p>
            
            <div className="bg-[#141414] rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <p className="text-gray-300">{restaurant.location}</p>
            </div>

            <div className="bg-[#141414] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Opening Hours</h2>
              <p className="text-gray-300">
                {restaurant.openingHours.open} - {restaurant.openingHours.close}
              </p>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="md:col-span-1">
            <div className="bg-[#141414] rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Make a Reservation</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                  />
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full bg-[#E11D48] text-white py-3 rounded-lg font-medium hover:bg-[#C01D48] transition-colors mt-6"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 