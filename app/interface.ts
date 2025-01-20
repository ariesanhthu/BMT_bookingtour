import { Product } from '@/app/lib/models/Product';
export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categories: any;
  name: string;
}

export interface fullProduct {
  _id: string;
  images: any;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  description: string;
  price_id: string;
}

export interface categoryProps {
  _id : string;
  slug: string;
  name: string;
}


enum TimeOfDay {
  Morning = 'buổi sáng',
  Midday = 'buổi trưa',
  Afternoon = 'buổi chiều',
  Evening = 'buổi tối',
}

interface TourStop {
  day: number;
  timeOfDay: TimeOfDay;
  time?: string | null;
  place: string;
  description?: string | null;
  image: string;
}

export interface productProps {
  _id : string;
  name: string;
  category: string;
  url?: string | null;
  duration ?: string | null;
  groupSize ?: string | null;
  price ?: string | null;
  rating ?: number | 0;
  reviewCount ?: number | 0;
  description ?: string | null;
  highlights ?: string[];
  included ?: string[];
  notIncluded ?: string[];
  tourData ?: TourStop[];
}
