// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// interface ImageComponentProps {
//   src: string;
//   alt: string;
//   text: string;
//   description?: string | null | undefined;
//   price: number;
//   oldPrice: number;
//   salePercentage?: number;
//   link: string;
// }
// function formatCurrency(value: number): string {
//   return new Intl.NumberFormat('vi-VN', {
//     style: 'currency',
//     currency: 'VND',
//   }).format(value).replace(/\sVND$/, ' VND'); // Đảm bảo có dấu cách trước VND
// }
// function calculateDiscountPercentage(oldPrice: number, price: number): string {
//   if (oldPrice <= 0 || price <= 0) {
//     throw new Error("Prices must be greater than 0.");
//   }

//   const discount = ((oldPrice - price) / oldPrice) * 100;
//   return `${discount.toFixed(2)}%`; // Làm tròn đến 2 chữ số thập phân
// }

// const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, text, description, price, oldPrice, salePercentage, link }) => {
//   const [hovered, setHovered] = useState(false);


//   return (
//     <Link href={link} passHref>
//       <div
//         style={{
//           position: 'relative',
//           borderRadius: '2%',
//           overflow: 'hidden',
//           transition: 'transform 0.3s',
//           transform: hovered ? 'scale(1.1)' : 'scale(1)',
//           zIndex: hovered ? '1' : '0',
//           width: '300px',
//           height: '200px',
//         }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         {salePercentage && (
//           <div
//             style={{
//               position: 'absolute',
//               top: '5px',
//               right: '5px',
//               backgroundColor: '#ff0000',
//               color: '#fff',
//               padding: '3px 5px',
//               borderRadius: '5%',
//               fontSize: '0.8rem',
//               zIndex: '2',
//             }}
//           >
//             -{calculateDiscountPercentage(oldPrice, price)}
//           </div>
//         )}
//         <div className="relative w-full h-full">
//           <Image src={src} alt={alt} width={300} height={200} className="cover h-full w-full"/>
//           <div
//             style={{
//               position: 'absolute',
//               bottom: '0',
//               left: '0',
//               width: '100%',
//               backgroundColor: 'rgba(0, 0, 0, 0.65)',
//               padding: '10px',
//               boxSizing: 'border-box',
//               textAlign: 'left',
//               borderRadius: '10% 0% 0% 0%',
//             }}
//           >
//             <div style={{ display: 'flex', justifyContent: 'space-between'}}>
//               <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', width:'65%'}}>
//                 <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>{text}</div>
//                 <div style={{ color: '#fff', fontSize: '0.8rem', marginTop: '5px' }} className='overflow-hidden text-ellipsis text-balance'>{description}</div>
//                 <div style={{ color: '#fff', fontSize: '0.8rem', marginTop: '5px', display: hovered ? '' : 'none' }}>dịch vụ: đưa đón, ăn trưa</div>
//               </div>
              
//               <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
//                 {oldPrice && (
//                   <div style={{ textDecoration: 'line-through', fontSize: '0.8rem', color: '#ddd' }}>
//                     {formatCurrency(oldPrice)}
//                   </div>
//                 )}
//                 <div style={{ color: '#FF9800', marginLeft: '3px', marginTop: '0.5rem',fontWeight: 'bold'}} className='xl:text-base '>{formatCurrency(price)}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ImageComponentProps {
  src: string;
  alt: string;
  text: string;
  description?: string | null | undefined;
  price?: string | null | undefined;
  oldPrice?: number;
  salePercentage?: number;
  link: string;
}

const formatCurrency = (value: any): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value).replace(/\sVND$/, ' VND');
};

const calculateDiscountPercentage = (oldPrice: any, price: any): string => {
  if (oldPrice <= 0 || price <= 0) {
    throw new Error("Prices must be greater than 0.");
  }

  const discount = ((oldPrice - price) / oldPrice) * 100;
  return `${Math.round(discount)}%`; // Làm tròn số nguyên cho đẹp hơn
};

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  text,
  description,
  price,
  oldPrice = 2230000,
  salePercentage,
  link
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // <Link href={link} className="block w-[300px] rounded-lg">
    //   <motion.div
    //     className="relative h-[200px] rounded-lg overflow-hidden group"
    //     whileHover={{ scale: 1.05 }}
    //     transition={{ duration: 0.3, ease: 'easeOut' }}
    //     onMouseEnter={() => setIsHovered(true)}
    //     onMouseLeave={() => setIsHovered(false)}
    //   >
    //     {/* Discount Badge */}
    //     {salePercentage && (
    //       <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-medium z-10 shadow-md">
    //         -{calculateDiscountPercentage(oldPrice, price)}
    //       </div>
    //     )}

    //     {/* Image Container */}
    //     <div className="relative w-full h-full">
    //       <Image
    //         src={src}
    //         alt={alt}
    //         fill
    //         className="object-cover transition-transform duration-300"
    //         sizes="300px"
    //         priority={false}
    //       />

    //       {/* Content Overlay */}
    //       <div className="absolute bottom-0 left-0 w-full bg-black/75 p-4 backdrop-blur-sm">
    //         <div className="flex justify-between items-start gap-4">
    //           {/* Left Content */}
    //           <div className="flex-1 min-w-0"> {/* min-w-0 helps with text truncation */}
    //             <h3 className="text-white font-bold text-base ">
    //               {text}
    //             </h3>
    //             <p className="text-gray-200 text-sm mt-1 line-clamp-2 min-h-[2.5rem]">
    //               {description}
    //             </p>
                
    //             {/* Services - Animated on hover */}
    //             <div
    //               className={`
    //                 text-gray-300 text-sm mt-1
    //                 transition-all duration-300 ease-in-out
    //                 ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
    //                 overflow-hidden
    //               `}
    //             >
    //               <span className="font-medium">Dịch vụ:</span> đưa đón, ăn trưa
    //             </div>
    //           </div>

    //           {/* Price Section */}
    //           <div className="flex flex-col items-end space-y-1 min-w-[100px]">
    //             {oldPrice > 0 && (
    //               <span className="text-gray-400 line-through text-sm">
    //                 {formatCurrency(oldPrice)}
    //               </span>
    //             )}
    //             <span className="text-orange-400 font-bold whitespace-nowrap">
    //               {formatCurrency(price)}
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </motion.div>
    // </Link>
    <Link href={link} className="block w-80">
      <motion.div
        className="relative h-[200px] rounded-lg overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        {salePercentage && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-medium z-10 shadow-md">
            -{calculateDiscountPercentage(oldPrice, price)}
          </div>
        )}

        {/* Image Container */}
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300"
            sizes="300px"
            priority={false}
          />

          {/* Content Overlay */}
          <div  className={`
              rounded-tl-2xl
              absolute bottom-0 left-0 w-full bg-black/75 p-3 backdrop-blur-sm
              transition-all duration-300 ease-out
              ${isHovered ? 'h-2/3' : 'h-fit'}
            `}>
            <div className="flex justify-between items-start gap-2">
              {/* Left Content */}
              <div className="flex-1 min-w-0 h-[60px]"> {/* Fixed height container */}
                <h3 className="text-white text-sm font-semibold mb-1">
                  {text}
                </h3>
                <p className={`${isHovered ? 'visible' : 'hidden'} ' text-gray-300 text-xs line-clamp-2 mb-1 h-[2.5em] hover:line-clamp-3' `}>
                  {description}
                </p>
                
                {/* Services - Animated on hover */}
                <div
                  className={`
                    text-gray-400 text-xs
                    transition-all duration-300 ease-in-out
                    ${isHovered ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}
                    overflow-hidden
                  `}
                >
                  <span className="font-medium">Dịch vụ:</span> đưa đón, ăn trưa
                </div>
              </div>

              {/* Price Section */}
              <div className="flex flex-col items-end justify-start min-w-[80px] h-[60px]"> {/* Fixed height container */}
                {oldPrice > 0 && (
                  <span className="text-gray-400 line-through text-xs mb-1">
                    {formatCurrency(oldPrice)}
                  </span>
                )}
                <span className="text-orange-400 font-semibold text-sm whitespace-nowrap">
                  {formatCurrency(price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ImageComponent;