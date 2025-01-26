"use client"
import React, { useState } from 'react';

interface TabProps {
  categories: { _id: string; name: string }[];
  onSelect: (categoryId: string) => void;
}

const Tab: React.FC<TabProps> = ({ categories, onSelect }) => {
  // const [activeTab, setActiveTab] = useState(0);
  const [activeTab, setActiveTab] = useState(categories[0]?._id || "");
  
  const handleTabClick = (categoryId: string) => {
    setActiveTab(categoryId);
    onSelect(categoryId);
  };

  return (
    <div className="flex space-x-4 border-b justify-evenly">
      {categories.map((category) => (
        <button
          key={category._id}
          className={`px-4 py-2 font-bold md:text-lg text-sm ${
            activeTab === category._id ? "border-b-2 border-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleTabClick(category._id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Tab;