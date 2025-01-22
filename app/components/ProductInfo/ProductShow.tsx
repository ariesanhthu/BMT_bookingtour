"use client";
import React from 'react';
import { BaseProduct } from '@/app/interface';
import TourTimeline from '../content/TourTimeline';
import Image from 'next/image';

import { CalendarDays, MapPin, Users, Clock, DollarSign, Utensils, Hotel, Plane } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

const ProductShow: React.FC<{ product: BaseProduct }> = ({ product }) => {
    return (
      <div>
        {/* HIGHLIGHTS */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary"><Clock className="w-4 h-4 inline mr-1" />{product.duration}</Badge>
            <Badge variant="secondary"><Users className="w-4 h-4 inline mr-1" />{product.groupSize}</Badge>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
          </div>
          <Image 
            src={product.url} 
            alt={product.name} 
            width={800} 
            height={400} 
            className="rounded-lg mb-6 max-h-80"
          />
        <Card className="mb-6">
            <CardHeader>
              <CardTitle>Giá vé</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{product.price} đ</p>
              <p className="text-gray-600">mỗi người</p>
            </CardContent>
        </Card>
          
           
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className='text-primary'>Những địa điểm nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {product.highlights?.map((highlight: any, index : any) => (
                    <li key={index}>{highlight}</li>
                    ))}
              </ul>
            </CardContent>
          </Card>
        
        {/* XUỐNG DÒNG ĐƯỢC */}
        <p className="text-white mb-6">{product.description}</p>
        </div>
        <h1>{product.name}</h1>
       

        {/* LỊCH TRÌNH */}
        <TourTimeline tourData ={product.tourData}/>
      </div>
    );
  };
  
  export default ProductShow;
  
