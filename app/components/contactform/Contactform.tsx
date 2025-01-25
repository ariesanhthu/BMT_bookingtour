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
    <div>
      <Card className="flex justify-center items-center p-0 md:p-5 mt-10 mx-5 md:mx-20">
        <CardContent className="p-3 md:p-0 ">
          <div className="flex flex-row justify-center items-center space-x-5">
            <img src="contact.png" className="flex-[1]  hidden md:block md:w-1/2"/>
            <div className="flex-[1] flex flex-col justify-center items-center space-y-2">
              <h1 className={`font-bold text-lg md:text-3xl text-[#3a56d6] text-center`}>Liên hệ tư vấn</h1>
              <div className="flex flex-col w-full h-full justify-center items-center p-1 md:p-4">
                <form className="justify-center grid" onSubmit={handleFormSubmit}>
                  <Input 
                        type="text" 
                        name = "name"
                        value = {formData.name}
                        onChange = {handleInputChange}
                        placeholder="Tên của bạn"
                        className='mt-5 border-[#000000] dark:border-[#ffffff]'
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
                  <textarea
                    name = "request"
                    value = {formData.request}
                    onChange = {handleInputChange}
                    placeholder="Lời nhắn"
                    // className='mt-5 border-[#000000] dark:border-[#ffffff] h-40 p-2 border border-input rounded-md'
                    className="mt-5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                  <Button className='text-bold mt-5 justify-self-center bg-[#3a56d6]' type="submit">
                      Liên hệ
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </CardContent>        
      </Card>
    </div>
  )
}
export default Contactform;