// "use client"
// import React, { useState, useEffect } from 'react';
// import { urlFor } from '../lib/sanity';
// import Image from 'next/image';

// const Slideshow = (images) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex(prevIndex => (prevIndex + 1) % 5); // Change 5 to the number of images
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);
  
//   return (
//     <div>
//       {images.map((image, idx) => (
//         <Image
//           key={idx}
//           src={urlFor(image).url()}
//           alt={`Image ${idx}`}
//           width={500} // Thay thế với giá trị width thực tế của bạn
//           height={500} // Thay thế với giá trị height thực tế của bạn
//           style={{
//             objectFit: 'cover',
//             transition: 'opacity 1s ease',
//             position: 'absolute',
//             height: '100%',
//             opacity: idx === index ? 1 : 0,
//             borderRadius: '5%',
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default Slideshow;
