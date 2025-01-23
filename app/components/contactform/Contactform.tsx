'use client'
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';



const Contactform = (): React.JSX.Element => {
  const [state, setState] = useState('');
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

        alert('Thông tin đã được gửi thành công!');
        setFormData({ name: '', phone: '', email: '', request: '' });
        // router.refresh(); // Refresh lại trang để cập nhật thông tin nếu cần.
    } catch (error) {
        console.error('Lỗi khi gửi thông tin:', error);
        alert('Đã xảy ra lỗi. Vui lòng thử lại!');
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 h-full justify-center items-center">
      <form className="justify-center grid w-3/4" onSubmit={handleFormSubmit}>
        <Input 
              type="text" 
              name = "name"
              value = {formData.name}
              onChange = {handleInputChange}
              placeholder="Tên của bạn"
              className='border-[#000000] dark:border-[#ffffff]'
              required
        />
        <Input 
              type="text" 
              name = "phone"
              value = {formData.phone}
              onChange = {handleInputChange}
              placeholder="Số điện thoại liên hệ" 
              className='mt-5 border-[#000000] dark:border-[#ffffff]' 
              required
        />
        
        <Button className='mt-5 justify-self-center' type="submit">
            Liên hệ
        </Button>
      </form>
    </div>
  )
}

export default Contactform;
        