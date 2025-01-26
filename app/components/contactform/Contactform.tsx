'use client'
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const Contactform = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
            name: '',
            phone: '',
            email: '',
            request: '',
        });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setFormData({ ...formData, [e.target.name]: e.target.value,});
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
        await axios.post('/api/orders', { ...formData, tourId: '' });
        alert('Thông tin đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!');
        setFormData({ name: '', phone: '', email: '', request: '' });
        // router.refresh(); // Refresh lại trang để cập nhật thông tin nếu cần.
    } catch (error) {
        console.error('Lỗi khi gửi thông tin:', error);
        alert('Đã xảy ra lỗi. Vui lòng thử lại!');
    }
  };

  return (
  <div className="rounded-xl w-full min-h-screen flex items-center justify-center p-4 mt-10">
    <Card className="relative w-3/4 bg-primary/2 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden glow-card">
      <div className="absolute inset-0 bg-gradient-to-r"></div>
      <CardContent className="w-full p-6 sm:p-8 lg:p-10 relative z-10 backdrop-blur-sm">
        <div className="flex flex-col items-center w-full">
          <div className="w-full space-y-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center drop-shadow-glow">
              Liên hệ tư vấn
            </h1>
            
            <form onSubmit={handleFormSubmit} className="space-y-6 w-full max-w-md mx-auto">
              <Input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tên của bạn"
                className="w-full backdrop-blur-sm border-[#3a56d6]/30 focus:border-[#3a56d6] text-base sm:text-sm transition-all duration-200 hover:border-[#3a56d6]/50"
                required
              />
              
              <Input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Số điện thoại liên hệ" 
                className="w-full backdrop-blur-sm border-[#3a56d6]/30 focus:border-[#3a56d6] text-base sm:text-sm transition-all duration-200 hover:border-[#3a56d6]/50"
                required
              />
              
              <textarea
                name="request"
                value={formData.request}
                onChange={handleInputChange}
                placeholder="Lời nhắn"
                className="w-full min-h-[160px] rounded-md backdrop-blur-sm border border-[#3a56d6]/30 focus:border-[#3a56d6] px-3 py-2 text-base sm:text-sm transition-all duration-200 hover:border-[#3a56d6]/50 focus:ring-2 focus:ring-[#3a56d6]/30 focus:outline-none"
              />
              
              <div className="flex justify-center">
                <Button 
                  className="bg-primary text-white hover:bg-[#2a46c6] font-semibold px-8 py-2 shadow-glow transition-all duration-300 hover:shadow-glow-hover"
                  type="submit"
                >
                  Liên hệ
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>        
    </Card>
</div>
  )
}
export default Contactform;