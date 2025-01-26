'use client'
import React from 'react'
import { useState , useEffect } from 'react'
import seedData from '@/app/lib/seedData';

const Contactform = (): React.JSX.Element => {
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
  }, []);

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center mt-10">
        {/* section MAIN WELCOME */}
        <div className="flex flex-col justify-center items-center text-center md:text-center sm:max-xl:gap-2 p-2">
          <p className="xl:text-3xl xl:leading-snug sm:max-2xl:p-0 text-xl sm:max-lg:text-xl font-bold uppercase">{homePageData.slogan}</p>
          <p className="text-base text-balance font-semibold lg:max-sm:text-sm">{homePageData.subSlogan}</p>
        </div>
      </div>
    </div>
  )
}
export default Contactform;