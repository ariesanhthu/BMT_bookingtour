// import Link from "next/link";
// import { simplifiedProduct } from "../interface";
// import { client } from "../lib/sanity";
// import Image from "next/image";
// async function getData(cateogry: string) {
//   const query = `*[_type == "product" && category->name == "${cateogry}"] {
//         _id,
//           "imageUrl": images[0].asset->url,
//           price,
//           name,
//           "slug": slug.current,
//           "categoryName": category->name
//       }`;

//   const data = await client.fetch(query);

//   return data;
// }

// // export const dynamic = "force-dynamic";

// type Params = Promise<{ category: string }>;
// export default async function Page({ params }: { params: Params }) {
//     const { category } = await params; 
//   const data: simplifiedProduct[] = await getData(
//     category);

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//             Our Products for {category}
//           </h2>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {data.map((product) => (
//             <div key={product._id} className="group relative">
//               <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
//                 <Image
//                   src={product.imageUrl}
//                   alt="Product image"
//                   className="w-full h-full object-cover object-center lg:h-full lg:w-full"
//                   width={300}
//                   height={300}
//                 />
//               </div>

//               <div className="mt-4 flex justify-between">
//                 <div>
//                   <h3 className="text-sm text-gray-700">
//                     <Link href={`/product/${product.slug}`}>
//                       {product.name}
//                     </Link>
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     {/* {product.categoryName} */}
//                   </p>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900">
//                   ${product.price}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// Trong file mienbac.js

import React from "react";
import Slideshow from '../components/Slideshow';
import Contactform from "../components/contactform/Contactform";
import TourPage from "../components/schedule/TourPage";

const Page = () => {
    return (
        <div style={{ padding: '20px', display: "flex", flexDirection: 'column', gap: '5rem' }}>
            <div style={{ display: "flex", gap: '10rem', padding: '0 20px' }}>
                
                <div style={{ flex: 1, marginTop: '20px' }}>
                    <Contactform />
                </div>
                
            </div>
            
            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around', padding: '0 20px' }}>
                <div>
                    <TourPage />
                </div>

                <div style={{ marginLeft: '100px', maxWidth: '600px' }}>
                    <h3 style={{ marginBottom: '20px' }}>
                        Trải nghiệm dịch vụ đẳng cấp thế giới ở The Shells Resort & Spa Phu Quoc
                    </h3>
                    <p style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                        Nằm dọc theo bờ biển của thị trấn Dương Đông,
                        <b>“The Shells Resort & Spa Phu Quoc”</b> có hồ bơi ngoài trời, trung tâm thể dục và khu vực bãi biển riêng.
                        <br />
                        Resort này cung cấp dịch vụ lễ tân 24 giờ, chỗ đỗ xe riêng miễn phí và WiFi miễn phí trong toàn bộ khuôn viên.
                        Chợ Dương Đông nằm trong bán kính 4 km từ chỗ nghỉ này.
                        Phòng nghỉ lắp máy điều hòa tại đây có ban công riêng, sàn lát gạch, tủ để quần áo, khu vực ghế ngồi, két an toàn và truyền hình cáp màn hình phẳng.
                        <br />
                        Ấm đun nước điện và minibar cũng được trang bị trong phòng.
                        Tất cả các phòng đều nhìn ra biển và được bố trí phòng tắm riêng với bồn tắm, tiện nghi vòi sen cùng đồ vệ sinh cá nhân miễn phí.
                        <br />
                        Khách lưu trú tại <b>“The Shells Resort & Spa Phu Quoc”</b> có thể sử dụng phòng xông hơi khô hoặc tận hưởng dịch vụ mát-xa thư giãn tại spa.
                        Dịch vụ giặt là và sắp xếp tour du lịch có thể được cung cấp theo yêu cầu. Chỗ nghỉ cũng có tiện nghi tổ chức hội họp và sự kiện.
                        Tại nhà hàng, du khách sẽ được phục vụ một loạt món ăn ngon của Việt Nam.
                        Các bữa ăn cũng có thể được phục vụ trong sự riêng tư ngay tại phòng nghỉ của khách.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
