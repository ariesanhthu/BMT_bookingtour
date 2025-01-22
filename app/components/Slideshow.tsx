"use client";

import Image from "next/image";
import React, { useState, useEffect } from 'react';

interface iAppProps {
  images: any;
  count: number;
}

export default function Slideshow({ images, count }: iAppProps) {
    const [index, setIndex] = useState(0);
    useEffect(() => {   
        const interval = setInterval(() => {
          setIndex(prevIndex => (prevIndex + 1) % count); // Change 5 to the number of images
        }, 3000);
        return () => clearInterval(interval);
      }, []);
  return (
    <div className="flex relative justify-center w-11/12 h-64 md:h-64 md:w-1/2 lg:h-96 xl:h-[32rem]">
        {images.map((image: any, idx: any) => (
            <Image
              key={idx}
              src={image}
              fill
              alt="photo"
              style={{
                objectFit: 'cover',
                position: 'absolute',
                transition: 'opacity 1s ease',
                opacity: idx === index ? 1 : 0,
                borderRadius: '3%',
              }}
            />
        ))}
    </div>
  );
}
