"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils"; 
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  { id: 1, name: "John Doe", avatar: "/avatar1.jpg", review: "Amazing experience! Amazing experience ! Amazing experience ! Amazing experience ! Amazing experience ! Amazing experience ! Amazing experience ! Amazing experience ! ", rating: 5 },
  { id: 2, name: "Jane Smith", avatar: "/avatar2.jpg", review: "Great service!", rating: 4 },
  { id: 3, name: "Michael Brown", avatar: "/avatar3.jpg", review: "Fantastic!", rating: 3 },
  { id: 4, name: "Alice Wonderland", avatar: "/avatar4.jpg", review: "Highly recommend!", rating: 5 },
  { id: 5, name: "David Johnson", avatar: "/avatar5.jpg", review: "Wonderful experience!", rating: 4 },
];

const infiniteTestimonials = [...testimonials, ...testimonials];

export default function Testimonial() {
  const [index, setIndex] = useState(testimonials.length - 2); // Bắt đầu ở giữa danh sách nhân đôi

  // Hàm cuộn sang trái
  const prevTestimonial = () => {
    setIndex((prev) => prev - 1);
  };

  // Hàm cuộn sang phải
  const nextTestimonial = () => {
    setIndex((prev) => prev + 1);
  };

  // Hiệu ứng reset index khi chạm giới hạn
  useEffect(() => {
    const timer = setTimeout(() => {
      if (index === -1) {
        setIndex(testimonials.length - 1);
      } else if (index === infiniteTestimonials.length - 2) {
        setIndex(testimonials.length - 2);
      }
    }, 500); // Delay nhỏ để reset vị trí mượt hơn

    return () => clearTimeout(timer);
  }, [index]);
  
  const intervalTime = 5000; // 5 giây (có thể chỉnh sửa)

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, intervalTime);
  
    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [index]); // Chạy lại mỗi khi index thay đổi
  
  return (
    <div className="relative flex flex-col items-center justify-center w-full mx-auto mt-28 px-5">
      <div className="container mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold">Khách hàng nói gì về chúng tôi?</h2>
        <p className="text-md md:text-lg mt-2">Những đánh giá thực tế từ những chuyến đi đáng nhớ.</p>
      </div>

      <div className="relative flex flex-row h-full w-full justify-center items-center">
        {/* Nút trái */}
        <button 
          onClick={prevTestimonial} 
          className="flex-[1] absolute left-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          <ChevronLeft className="w-4 md:w-6 h-4 md:h-6" />
        </button>
        

        {/* Danh sách Card */}
        <div className="relative flex w-full h-[25rem] justify-center items-center overflow-hidden mx-0">
          <div
            className="flex flex-row space-x-0 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 20}%)` }} // Trượt nhẹ, luôn thấy 3 card
          >
            {infiniteTestimonials.map((t, i) => {
              let scale = "scale-[80%] opacity-50"; // Mặc định: nhỏ + mờ (hai bên)
              if (i === index + 2) scale = "scale-[100%]  opacity-100 glow-card hover:shadow-glow-hover"; // Card chính giữa

              return (
                <Card
                  className={cn(
                    "w-1/5 py-6 flex-shrink-0 flex flex-col justify-center px-2 md:px-6 rounded-lg transition-all duration-700 ease-in-out transform",
                    scale
                  )}
                >
                  <CardHeader className="flex flex-row">
                    {/*thay cai nay bang Image*/}
                    <Image
                      src={"/icon_fb.png"}
                      alt={"t.name"}
                      width={50} 
                      height={50} 
                      className="rounded-b-3xl"
                    />
                    <p className="ml-3 text-md md:text-xl font-semibold">{t.name}</p>
                  </CardHeader>

                  <CardContent className="">
                    <p className="mt-4 text-sm md:text-lg">{t.review.length > 50 ? t.review.substring(0, 50) + "..." : t.review}</p>
                  </CardContent>

                  <CardFooter>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} fill="yellow" className="" size={18} />
                    ))}
                    {[...Array(5 - t.rating)].map((_, i) => (
                      <Star key={i} className="" size={18} />
                    ))}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      
        {/* Nút phải */}
        
        <button 
          onClick={nextTestimonial} 
          className="flex-[1] absolute right-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          <ChevronRight className="w-4 md:w-6 h-4 md:h-6" />
        </button>
        
      </div>
    </div>
  );
}
