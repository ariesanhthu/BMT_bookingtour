import { Product } from '@/app/lib/models/Product';
import mongoose from 'mongoose';
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

export interface TourStop {
  day: number;
  timeOfDay?: TimeOfDay;
  time?: string | null;
  place: string;
  description?: string | null;
  url?: string;
}

export interface BaseProduct {
  name: string;
  category: string;
  url: string;
  duration ?: string | null;
  groupSize ?: string | null;
  price ?: string | null;
  rating ?: number | 0;
  reviewCount ?: number | 0;
  description ?: string | null;
  highlights ?: string[];
  included ?: string[];
  notIncluded ?: string[];
  tourData: TourStop[];
}

export interface productProps extends BaseProduct {
  _id: string; // Sản phẩm đã lưu trữ sẽ có _id
}

// export interface productProps {
//   _id ?: string;
//   name: string;
//   category: string;
//   url: string;
//   duration ?: string | null;
//   groupSize ?: string | null;
//   price ?: string | null;
//   rating ?: number | 0;
//   reviewCount ?: number | 0;
//   description ?: string | null;
//   highlights ?: string[];
//   included ?: string[];
//   notIncluded ?: string[];
//   tourData: TourStop[];
// }

// for push data

// export interface ProductObject {
//   name: string;
//   category: mongoose.Types.ObjectId;
//   url: string;
//   duration ?: string | null;
//   groupSize ?: string | null;
//   price ?: string | null;
//   rating ?: number | 0;
//   reviewCount ?: number | 0;
//   description ?: string | null;
//   highlights ?: string[];
//   included ?: string[];
//   notIncluded ?: string[];
//   tourData: TourStop[];
// }