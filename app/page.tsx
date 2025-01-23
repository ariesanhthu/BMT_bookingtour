'use client'
import Image from "next/image";
import Contactform from "./components/contactform/Contactform";
import HotTour from "./components/HotTour";
import RegionTour from "./components/RegionTour";
import ImageSlider from "./components/slider/SliderFull";
import { useState } from "react";
import axios from 'axios';
import { devNull } from "node:os";

export const dynamic = "force-dynamic";

export default async function Home() {

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


  // const data = await getData();
  // data.ts
  const data = {
    slogan:"Du lịch cùng chúng tôi",
    subSlogan: "Đồng hành cùng bạn tham quan các địa điểm nổi tiếng ở khắp Việt Nam",
    images: [
      '/slide1.jpg',
      '/slide2.jpg',
      '/slide3.jpg',
      '/slide4.jpg',
      '/slide5.jpg',
    ],
    count: 5,
  };

// export default data;
  const imagesCount = data.images.length;
  return (

    <div className="w-full h-full">

        <ImageSlider />
      {/* section MAIN WELCOME */}
      <div className="flex flex-col mt-10 justify-center items-center"> 
        <Contactform/>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <div className="flex w-1/2 flex-col justify-items-center text-center md:text-center sm:max-xl:gap-2">
          <p className="xl:text-3xl xl:leading-snug sm:max-2xl:p-0 text-xl sm:max-lg:text-xl font-bold uppercase">{data.slogan}</p>
          <p className="text-base text-balance font-semibold lg:max-sm:text-sm">{data.subSlogan}</p>
        </div>
        
      </div>
      
      {/* section HOT TOUR */}

        <HotTour/>

        <RegionTour/>
        

    </div>

  );
}
