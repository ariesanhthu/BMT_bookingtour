'use client'

// UI
import { CalendarDays, MapPin, Users, Clock, DollarSign, Utensils, Hotel, Plane } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// react
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// API
import axios from 'axios';

// COMPONENT CONTENT
import TourTimeline from '@/app/components/content/TourTimeline'
import TourPolicies from '@/app/components/content/TourPolicies'

// image upload
import Image from 'next/image'
// ---------------------------

// utils
import { formatCurrency } from "@/utils/formatCurrency";

import { productProps } from '@/app/interface'

  const INITIAL_PRODUCT: productProps = {
    _id: '',
    name: '',
    category: '',
    url: '',
    duration: '',
    groupSize: '',
    price: '',
    rating: 0,
    reviewCount: 0,
    description: '',
    highlights: [''],
    included: [''],
    notIncluded: [''],
    tourData: [],
  };
export default function ProductPage() {

  const [tour, setTour] = useState<productProps>(INITIAL_PRODUCT);

    const { id } = useParams();

//-------------------------------------------------------
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        request: '',
    });

const router = useRouter();
// -------------------------------------------------------
// FETCH DATA

const fetchProduct = async () => {
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      // SET USESTAE
      const data = await response.json();
      setTour(data.data);
    }
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
};

useEffect(() => {
  fetchProduct();
}, []);
// -------------------------------------------------------

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
  setFormData({ ...formData, [e.target.name]: e.target.value,});

  const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
      await axios.post('/api/orders', { ...formData, tourId: id });

      alert('Thông tin đã được gửi thành công!');
      setFormData({ name: '', phone: '', email: '', request: '' });
      setIsDialogOpen(false);
      router.refresh(); // Refresh lại trang để cập nhật thông tin nếu cần.
  } catch (error) {
      console.error('Lỗi khi gửi thông tin:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại!');
  }
};

//-------------------------------------------------------

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* --------- basic info ------------ */}
          <h1 className="text-3xl font-bold mb-4">{tour.name}</h1>
          {/* RATING */}
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary"><Clock className="w-4 h-4 inline mr-1" />{tour.duration}</Badge>
            <Badge variant="secondary"><Users className="w-4 h-4 inline mr-1" />{tour.groupSize}</Badge>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1">{tour.rating} ({tour.reviewCount} reviews)</span>
            </div>
          </div>

          <Image 
            src={tour.url} 
            alt={tour.name} 
            width={800} 
            height={400} 
            className="rounded-lg mb-6 max-h-80"
          />
          <p className="text-white mb-6">{tour.description}</p>
          {/* ----------- NHỮNG ĐỊA ĐIỂM NỔI BẬT ----------- */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className='text-primary'>Những địa điểm nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {tour.highlights?.map((highlight: any, index : any) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
          
        <div className='grid grid-cols-1 gap-6'>
        
          {/* ----------- GIÁ VÉ ----------- */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Giá vé</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{formatCurrency(tour.price)}</p>
              <p className="text-gray-600">mỗi người</p>
            </CardContent>
            <CardFooter>
                  
                  {/* 
                  -----------------------------------------------------------------
                  */}
                    <Button className="w-full font-bold" onClick={() => setIsDialogOpen(true)}>
                        Đặt ngay để nhận<p className="text-white uppercase">ưu đãi</p>
                    </Button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Đặt Tour</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleFormSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Họ Tên</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Số Điện Thoại</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="request">Yêu Cầu</Label>
                                        <textarea
                                            id="request"
                                            name="request"
                                            value={formData.request}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Gửi Thông Tin</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                  
                  {/* 
                  -----------------------------------------------------------------
                  */}
            </CardFooter>
          </Card>

          {/* ------ BAO GỒM ------ */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Chuyến đi gồm</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tour.included?.map((item : any, index : any) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* ------ KHÔNG BAO GỒM ------ */}
          <Card>
            <CardHeader>
              <CardTitle>Không bao gồm</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tour.notIncluded?.map((item : any, index: any) => (
                  <li key={index} className="flex items-center">
                    <span className="text-red-500 mr-2">✗</span> {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

          {/* -------- LỊCH TRÌNH ------------ */}
          <div className="md:col-span-2">
            <TourTimeline tourData={tour.tourData}/>
          </div>

          {/* THÔNG TIN ĐIỀU KHOẢN */}
          <TourPolicies />
        
      </div>
    </div>
  )
}

