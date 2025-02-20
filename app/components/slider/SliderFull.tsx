"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// import { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import seedData from '@/app/lib/seedData';

interface ImageSliderPros {
  images: string[];
}

export default function ImageSlider({images} : ImageSliderPros): JSX.Element {
    
  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
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
       <Image
          src={images[currentIndex] || '/slide1.jpg'}
          alt={`Slider Image ${currentIndex + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-b-3xl transition-all duration-500 ease-in-out cursor-pointer"
        />

        {/* {images[currentIndex]?.trim() ? (
          <Image
            src={images[currentIndex]}
            alt={`Slider Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-b-3xl transition-all duration-500 ease-in-out cursor-pointer"
          />
        ) : 
        <Image
            src={'/slide1.jpg'}
            alt={`Slider Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-b-3xl transition-all duration-500 ease-in-out cursor-pointer"
          />} */}
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
        {images.map((_, index) => (
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