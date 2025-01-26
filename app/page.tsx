'use client';

import Image from "next/image";
import Contactform from "./components/contactform/Contactform";
import HotTour from "./components/HotTour";
import RegionTour from "./components/RegionTour";
import ImageSlider from "./components/slider/SliderFull";
import Slogan from "./components/Slogan";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { simplifiedProduct, categoryProps } from "./interface";
import { useState, useEffect } from "react";
import axios from "axios";
import Tab from "./components/Tab";

export const dynamic = "force-dynamic";


export default function Home() {
  const [categories, setCategories] = useState<categoryProps[]>([]);
  
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
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () =>{
    try {
      const res = await axios.get('/api/category');
      // console.log(res.data);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  

// export default data;
  const imagesCount = data.images.length;
  return (
    <div className="w-full h-full">

      <ImageSlider />
      <Slogan/>
      {/* <div className="w-full flex flex-col md:flex-row items-center justify-center mt-10"> */}
        {/* section MAIN WELCOME */}
        {/* <div className="flex flex-col justify-center items-center text-center md:text-center sm:max-xl:gap-2 p-2">
          <p className="xl:text-3xl xl:leading-snug sm:max-2xl:p-0 text-xl sm:max-lg:text-xl font-bold uppercase">{data.slogan}</p>
          <p className="text-base text-balance font-semibold lg:max-sm:text-sm">{data.subSlogan}</p>
        </div> */}

      {/* </div> */}
      
      {/* section HOT TOUR */}
      {/* <HotTour/> */}
      <Tab tabs = {categories}/>
      <Contactform/>
      <RegionTour/>

    </div>

  );
}