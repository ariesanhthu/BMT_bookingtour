"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// import { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import seedData from '@/app/lib/seedData';

export default function ImageSlider(): JSX.Element {
  const [homePageData, setHomePageData] = useState({
    _id: '',
    images: [] as string[],
    navbar: [
      {
        name: '',
        href: '',
        sublinks: [{ name: '', href: '' }]
      }
    ],
    logo: '',
    slogan: '',
    subSlogan: '',
    footer: {
      email: '',
      phone: '',
      address: '',
    },
  });

    // Lấy dữ liệu từ server
  const fetchHomePageData = async () => {
    try {
      const response = await fetch('/api/homepage');
      if (response.ok) {
        const data = await response.json();
        setHomePageData(data.data);
      } else {
        // Không có dữ liệu, tạo mới
        const newResponse = await fetch('/api/homepage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(seedData),
        });
        const newData = await newResponse.json();
        setHomePageData(newData.data);
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    }
  };
    
  useEffect(() => {
    fetchHomePageData();
    setCurrentIndex(0);
  }, []);



  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + homePageData.images.length) % homePageData.images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % homePageData.images.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full mx-auto">
      <div
        className=" h-[360px] mx-12 group"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {homePageData.images[currentIndex]?.trim() ? (
          <Image
            src={homePageData.images[currentIndex]}
            alt={`Slider Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-b-3xl transition-all duration-500 ease-in-out cursor-pointer"
          />
        ) : null}
      </div>
      <button
        className="absolute left-0 top-1/2 transform h-1/4 rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-slate-950 bg-opacity-20 p-2 group"
        onClick={prevSlide}
      >
        <ChevronLeft className=" text-white group-hover:text-white" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform h-1/4 rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-slate-950 bg-opacity-20 text-white p-2 group"
        onClick={nextSlide}
      >
        <ChevronRight className="text-white group-hover:text-white" />
      </button>
      <div className="flex justify-center mt-4">
        {homePageData.images.map((_, index) => (
          <div
            key={index}
            className={`z-0 h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-primary rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out mb-4`}
          ></div>
        ))}
      </div>
    </div>
  );
}