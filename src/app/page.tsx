'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Restaurant, Category, SearchFilters } from "../types";
import { restaurants, categories } from "../data/mockData";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    date: new Date().toISOString().split('T')[0],
    time: "19:00",
    guests: 2,
  });
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);

  // Filter restaurants based on search query
  useEffect(() => {
    const filtered = restaurants.filter((restaurant) => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
    setFilteredRestaurants(filtered);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExplore = () => {
    // You can implement the explore functionality here
    console.log('Exploring with filters:', filters);
  };

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="bg-[#141414] border-b border-[#2A2A2A] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>
                FoodClass
              </h1>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search restaurants, cuisines, and more"
                  className="w-[400px] bg-[#2A2A2A] text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <button 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => router.push('/explore')}
              >
                Explore
              </button>
              <button 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => router.push('/bookings')}
              >
                My Bookings
              </button>
              <button 
                className="bg-[#E11D48] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C01D48] transition-colors"
                onClick={() => router.push('/signin')}
              >
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
          <Image
            src="/restaurant-hero.jpg"
            alt="Featured Restaurant"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold mb-4">Discover Extraordinary Dining</h2>
              <p className="text-xl text-gray-300 mb-8">Book exclusive tables at the finest restaurants in your city</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="bg-[#2A2A2A] text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
                <input
                  type="date"
                  name="date"
                  className="bg-[#2A2A2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                  value={filters.date}
                  onChange={handleFilterChange}
                />
                <input
                  type="time"
                  name="time"
                  className="bg-[#2A2A2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                  value={filters.time}
                  onChange={handleFilterChange}
                />
                <input
                  type="number"
                  name="guests"
                  placeholder="Number of guests"
                  min="1"
                  className="bg-[#2A2A2A] text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                  value={filters.guests}
                  onChange={handleFilterChange}
                />
              </div>
              <button 
                className="bg-[#E11D48] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#C01D48] transition-colors"
                onClick={handleExplore}
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>

        {/* Featured Restaurants */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold mb-8">Featured Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <div 
                key={restaurant.id} 
                className="group cursor-pointer" 
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <div className="relative h-[300px] rounded-lg overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-xl font-bold mb-1">{restaurant.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span>{restaurant.cuisine} • {restaurant.priceRange}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{restaurant.rating} ★</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-[#141414] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="relative h-[200px] rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#141414] border-t border-[#2A2A2A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">FoodClass</h3>
              <p className="text-gray-400 text-sm">Experience extraordinary dining at the finest restaurants.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="cursor-pointer hover:text-white">All Restaurants</li>
                <li className="cursor-pointer hover:text-white">Top Rated</li>
                <li className="cursor-pointer hover:text-white">New Arrivals</li>
                <li className="cursor-pointer hover:text-white">Special Offers</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="cursor-pointer hover:text-white">Help Center</li>
                <li className="cursor-pointer hover:text-white">Contact Us</li>
                <li className="cursor-pointer hover:text-white">Privacy Policy</li>
                <li className="cursor-pointer hover:text-white">Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Follow Us</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center cursor-pointer hover:bg-[#3A3A3A] transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center cursor-pointer hover:bg-[#3A3A3A] transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center cursor-pointer hover:bg-[#3A3A3A] transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
