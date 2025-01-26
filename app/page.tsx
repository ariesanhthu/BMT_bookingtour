'use client';

import Contactform from "./components/contactform/Contactform";
import RegionTour from "./components/RegionTour";
import ImageSlider from "./components/slider/SliderFull";
import Slogan from "./components/Slogan";
import { categoryProps, productProps, DBproductProps } from "./interface";
import { useState, useEffect } from "react";
import axios from "axios";
import Tab from "./components/Tab";
import  ProductList  from "./components/ProductList";
export const dynamic = "force-dynamic";

export default function Home() {
  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [products, setProducts] = useState<productProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Fetch categories khi component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products khi selectedCategory thay đổi
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/category');
      const categoriesData = res.data.data;
      setCategories(categoriesData);

      // Nếu có categories, set category đầu tiên làm mặc định
      if (categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0]._id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (categoryId: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/product/category/${categoryId}`);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <ImageSlider />
      <Slogan/>
      <div className="m-10">
        <h4 className="text-2xl bold font-bold mb-5 max-md:ml-10 flex max-md:justify-start max-sm:justify-center">🔥 Tour được yêu thích </h4>
        
        {categories.length > 0 && (
          <Tab 
            categories={categories} 
            onSelect={(categoryId) => {
              setSelectedCategory(categoryId);
            }} 
          />
        )}

        {loading ? (
          <div className="text-center text-gray-500 mt-4">Loading...</div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
      
      <Contactform/>
      <RegionTour/>
    </div>
  );
}