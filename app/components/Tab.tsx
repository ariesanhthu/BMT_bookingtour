"use client"
import React, { useState } from 'react';
import { categoryProps } from '../interface'; // Assuming you have imported the categoryProps interface from the correct file
import NhatrangTab from './categoryTour/NhaTrangTab';
import MoreTab from './categoryTour/MoreTab';
import PhuquocTab from './categoryTour/PhuquocTab';
interface TabProps {
  tabs: categoryProps[];
}

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
        <div className="flex justify-evenly">
          {tabs.map((tab, index) => (
            <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`${
              index === activeTab
              ? 'text-gray-800 text-primary border-b-white'
              : 'text-gray-500 hover:text-gray-800'
            } py-4 px-6 block border-b-2 font-semibold`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {activeTab == 0  && <PhuquocTab/> }
        {activeTab == 1 && <NhatrangTab/> }
        {activeTab == 2 && <MoreTab/> }
      </>
  );
};

export default Tab;