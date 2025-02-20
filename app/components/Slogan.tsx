'use client'
import React from 'react'
import { useState , useEffect } from 'react'
import seedData from '@/app/lib/seedData';

interface SloganPros {
  slogan: string,
  subSlogan: string,
}

const Slogan = ({slogan, subSlogan} : SloganPros): React.JSX.Element => {
    
  useEffect(() => {
  }, []);

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center mt-10">
        {/* section MAIN WELCOME */}
        <div className="flex flex-col justify-center items-center text-center md:text-center sm:max-xl:gap-2 p-2">
          <p className="xl:text-3xl xl:leading-snug sm:max-2xl:p-0 text-xl sm:max-lg:text-xl font-bold uppercase">{slogan}</p>
          <p className="text-base text-balance font-semibold lg:max-sm:text-sm">{subSlogan}</p>
        </div>
      </div>
    </div>
  )
}
export default Slogan;

