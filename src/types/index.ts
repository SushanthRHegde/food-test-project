export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: '$$' | '$$$' | '$$$$';
  rating: number;
  image: string;
  location: string;
  description: string;
  openingHours: {
    open: string;
    close: string;
  };
  isOpen: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface SearchFilters {
  location: string;
  date: string;
  time: string;
  guests: number;
  cuisine?: string;
} 