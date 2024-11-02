"use client"
import React, { useState, useEffect } from 'react';
import { urlFor } from '../lib/sanity';

const Slideshow = (images) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % 5); // Change 5 to the number of images
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      {images.map((image, idx) => (
        <img
          key={idx}
          src={urlFor(image).url()} // Change extension if your images have different extensions
          alt={idx}
          style={{
            objectFit: 'cover',
            transition: 'opacity 1s ease',
            position: 'absolute',
            height: '100%',
            
            opacity: idx === index ? 1 : 0,
            borderRadius: '5%',
          }}
        />
      ))}
    </div>
  );
};

export default Slideshow;
