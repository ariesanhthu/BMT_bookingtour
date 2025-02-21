"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageProps {
  src: string;
  alt: string;
  text: string;
  link: string;
}

const ImageRegion: React.FC<ImageProps> = ({ src, alt, text, link }) => {
    const [hovered, setHovered] = useState(false);
  
    return (
      <Link href={link} passHref>
        <div
          className="flex rounded-lg overflow-hidden transition-transform h-44 w-64 sm:max-md:h-32"
          style={{ transform: hovered ? 'scale(1.2)' : 'scale(1)', zIndex: hovered ? 1 : 0 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image src={src} alt={alt} fill className='object-cover'/>
          <div
             className="absolute bottom-0 left-0 w-full h-1/4 flex justify-center items-center transition-colors rounded-t-lg"
             style={{
              color: hovered ? '#000' : '#fff',
              backgroundColor: hovered ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="font-bold">{text}</div>
          </div>
        </div>
      </Link>
    );
  };
  

const RegionTour: React.FC = () => {
  return (
    <div className='mt-10 mx-10'>
         <h4 className="title">Tour hằng ngày 🚌</h4>

    <div className="flex justify-around gap-10 flex-wrap mt-10">
    
      <ImageRegion src="/mienbac.jpg" alt="Image 1" text="Miền Bắc" link="/mienbac" />
      <ImageRegion src="/mientrung.jpg" alt="Image 2" text="Miền Trung" link="/mientrung" />
      <ImageRegion src="/miennam.jpg" alt="Image 3" text="Miền Nam" link="/miennam" />
      {/* <ImageRegion src="/servicetour.jpg" alt="Image 4" text="Dịch vụ" link="/dichvu" /> */}
    </div>
    </div>
  );
};

export default RegionTour;
