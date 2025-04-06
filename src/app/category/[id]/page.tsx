'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { restaurants, categories } from '../../../data/mockData';

export default function CategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const category = categories.find(c => c.id === params.id);
  const categoryRestaurants = restaurants.filter(
    r => r.cuisine.toLowerCase() === category?.name.toLowerCase()
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
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

      {/* Category Hero */}
      <div className="relative h-[300px]">
        <Image
          src={category.image}
          alt={category.name}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold">{category.name} Restaurants</h1>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group cursor-pointer"
              onClick={() => router.push(`/restaurant/${restaurant.id}`)}
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

        {categoryRestaurants.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No restaurants found</h2>
            <p className="text-gray-300">
              We couldn't find any {category.name} restaurants at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 