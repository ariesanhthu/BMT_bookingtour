import { productProps } from "../interface";
import ImageComponent from "./categoryTour/CardTour";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface ProductListProps {
    products: productProps[];

    title?: string;
    isLoading: boolean;
    error?: string;  
}
  
const ProductList : React.FC<ProductListProps> = ({ 
    products, 
    title,
    isLoading, 
    error 
}: ProductListProps) => {
  
// const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, text, description, price, oldPrice, salePercentage, link }) => {
//     const [hovered, setHovered] = useState(false);
// export interface BaseProduct {
//     name: string;
//     category: string;
//     url: string;
//     duration ?: string | null;
//     groupSize ?: string | null;
//     price ?: string | null;
//     rating ?: number | 0;
//     reviewCount ?: number | 0;
//     description ?: string | null;
//     highlights ?: string[];
//     included ?: string[];
//     notIncluded ?: string[];
//     tourData: TourStop[];
//   }
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//         {products.map((product) => (
            
//           <div key={product._id} className="">
//             <ImageComponent
//                 src = {product.url}
//                 alt = {product.name}
//                 text = {product.name}
//                 description = {product.description}
//                 price = {Number(product.price)}
//                 oldPrice = {Number(product.price)}
//                 salePercentage = {0}
//                 link = {`/product/${product._id}`}
//             />
//           </div>
//         ))}
//       </div>
//     );
//   }
const scrollContainerRef = useRef<HTMLDivElement>(null);
const [showLeftButton, setShowLeftButton] = useState(false);
const [showRightButton, setShowRightButton] = useState(true);

const handleScroll = () => {
  if (!scrollContainerRef.current) return;

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
  setShowLeftButton(scrollLeft > 0);
  setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10);
};

const scroll = (direction: 'left' | 'right') => {
  if (!scrollContainerRef.current) return;

  const scrollAmount = scrollContainerRef.current.clientWidth;
  const targetScroll = scrollContainerRef.current.scrollLeft + 
    (direction === 'left' ? -scrollAmount : scrollAmount);

  scrollContainerRef.current.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  });
};

if (error) {
  return (
    <div className="w-full p-4 text-center text-red-600 bg-red-50 rounded-lg">
      {error}
    </div>
  );
}

if (isLoading) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-200 rounded-lg h-[200px]"
        />
      ))}
    </div>
  );
}
if (products.length !== 0) {
return (
  <div className="w-full relative">
    {title && (
      <h2 className="text-xl font-bold mb-4 px-4">{title}</h2>
    )}

    <div className="relative group">
      {/* Navigation Buttons */}
      {showLeftButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Previous products"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {showRightButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Next products"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {/* Products Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-4 px-4 pb-4 pt-10 snap-x snap-mandatory scrollbar-hide justify-evenly"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="flex-none snap-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ImageComponent
              src={product.url}
              alt={product.name}
              text={product.name}
              description={product.description}
              price={product.price}
              oldPrice={Number(product.price) + 250000}
              link = {`/product/${product._id}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
  }

  return <div className="text-center text-gray-500 font-bold">No products found</div>;

};

export default ProductList;