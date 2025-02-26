"use client";

import Contactform from "./components/contactform/Contactform";
import RegionTour from "./components/RegionTour";
import ImageSlider from "./components/slider/SliderFull";
import Slogan from "./components/Slogan";
import { categoryProps, productProps } from "./interface";
import { useState, useEffect } from "react";
import axios from "axios";
import Tab from "./components/Tab";
import ProductList from "./components/ProductList";
import seedData from "@/app/lib/seedData";
import tourDatas from "./lib/tourData";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Testimonial from "./components/testimonials/Testimonials"
// export const dynamic = "force-dynamic";

const testimonials = [
  {
    name: "John Doe",
    avatar: "/avatar1.jpg",
    review: "Amazing experience! The team was so professional and helpful. I will definitely come back!",
    rating: 5,
  },
  {
    name: "Jane Smith",
    avatar: "/avatar2.jpg",
    review: "Great service and friendly staff. I highly recommend this to everyone!",
    rating: 4,
  },
  {
    name: "Michael Brown",
    avatar: "/avatar3.jpg",
    review: "Absolutely fantastic! They exceeded all my expectations.",
    rating: 5,
  },
];

export default function Home() {
  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [products, setProducts] = useState<productProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingHomePage, setLoadingHomePage] = useState(true);
  const [homePageData, setHomePageData] = useState({
    _id: "",
    images: [] as string[],
    navbar: [
      {
        name: "",
        href: "",
        sublinks: [{ name: "", href: "" }],
      },
    ],
    logo: "",
    slogan: "",
    subSlogan: "",
    footer: {
      email: "",
      phone: "",
      address: "",
    },
  });

  // Fetch categories and homepage data concurrently on initial load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
  //       // Fetch categories
  //       const categoryRes = await axios.get("/api/category");
  //       const categoriesData = categoryRes.data.data;
  //       setCategories(categoriesData);

  //       // If categories are available, select the first as default
  //       if (categoriesData.length > 0) {
  //         setSelectedCategory(categoriesData[0]._id);
  //       }
          setSelectedCategory("6782b1ad0cf0a980a16c16bd");
          setCategories(
            [
              {'_id': "6782b1ad0cf0a980a16c16bd", 'slug': "mien-nam", 'name': "Miền Nam"},
              {'_id': "6782b19f0cf0a980a16c16b8", 'slug': "mien-bac", 'name': "Miền Bắc"},
              {'_id': "678e5aa8f160f6e25546f998", 'slug': "mien-trung", 'name': "Miền Trung"},
            ]);
  //       // Fetch homepage data
          const homeRes = await fetch("/api/homepage");
          if (homeRes.ok) {
            const homeData = await homeRes.json();
            setHomePageData(homeData.data);
          } else {
            // If not found, create new homepage data
            const newHomeRes = await fetch("/api/homepage", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(seedData),
            });
            const newHomeData = await newHomeRes.json();
            setHomePageData(newHomeData.data);
          }
        } catch (error) {
          console.error("Error fetching initial data:", error);
        } finally {
          setLoadingHomePage(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products whenever the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async (categoryId: string) => {
        setLoadingProducts(true);
        try {
          const { data } = await axios.get(`/api/product/category/${categoryId}`);
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoadingProducts(false);
        }
      };

      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full h-full">
      <ImageSlider images={homePageData.images} />
      <Slogan slogan={homePageData.slogan} subSlogan={homePageData.subSlogan} />

      <div className="m-10">

        <h4 className="title">
          🔥 Tour được yêu thích
        </h4>

        {categories.length > 0 && (
          <Tab
            categories={categories}
            onSelect={(categoryId) => setSelectedCategory(categoryId)}
          />
        )}

        <ProductList products={products} isLoading={loadingProducts} />

      </div>

      <Contactform />
      <RegionTour />
      <Testimonial/>
    </div>
  );
}

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
// import { Card } from "@/components/ui/card";

// const testimonials = [
//   { name: "Alice M.", location: "Vancouver, BC", review: "This finance app is a game-changer! Its intuitive interface made managing my finances a breeze. Highly recommended!" },
//   { name: "Richard B.", location: "Montreal, QC", review: "I'm thrilled with this app. It streamlined my financial decisions and helped me make better savings choices." },
//   { name: "Michael D.", location: "New York, NY", review: "Great app with excellent insights. Helped me stay on track with my budgeting goals." },
//   { name: "Sophia L.", location: "Los Angeles, CA", review: "Super easy to use and very informative! I learned a lot about managing my money." },
// ];

// export default function Testimonials() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Navigation handlers
//   const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
//   const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
//   // Track current index
//   useEffect(() => {
//     if (!emblaApi) return;
//     const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
//     emblaApi.on("select", onSelect);
//     return () => emblaApi.off("select", onSelect);
//     // onSelect();
//   }, [emblaApi]);

//   return (
//     <section className="py-16 bg-gray-900 text-white">
//       <div className="container mx-auto text-center">
//         <h2 className="text-4xl font-bold">
//           <span className="text-green-400">What</span> people <span className="text-pink-400">say</span>
//         </h2>
//         <p className="text-gray-400 mt-2">Don’t take our word for it, read what people think about us.</p>
//       </div>

//       {/* Carousel */}
//       <div className="relative mt-8 flex items-center justify-center">
//         {/* Left Button */}
//         <button onClick={scrollPrev} className="absolute left-2 md:left-6 bg-gray-700 p-2 rounded-full z-10">
//           <ChevronLeft size={24} className="text-white" />
//         </button>

//         {/* Embla Carousel */}
//         <div className="overflow-hidden w-full max-w-3xl" ref={emblaRef}>
//           <div className="flex justify-center items-center space-x-4 ">
//             {testimonials.map((testimonial, index) => {
//               let positionClass = "opacity-100 scale-100"; // Center card
//               if (index === currentIndex) {
//               }
//               else if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) {
//                 positionClass = "opacity-50 scale-100 -translate-x-[10%]"; // Left faded card
//               } else if (index === (currentIndex + 1) % testimonials.length) {
//                 positionClass = "opacity-50 scale-100 translate-x-[10%]"; // Right faded card
//               }  else {
//                 positionClass = "opacity-0"
//               }
              
              
//               // if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) {
//               //   positionClass = "opacity-50 scale-90 translate-x-[-25%]"; // Left faded card
//               // } else if (index === (currentIndex + 1) % testimonials.length) {
//               //   positionClass = "opacity-50 scale-90 translate-x-[25%]"; // Right faded card
//               // } else if (
//               //   index !== currentIndex &&
//               //   index !== (currentIndex - 1 + testimonials.length) % testimonials.length &&
//               //   index !== (currentIndex + 1) % testimonials.length
//               // ) {
//               //   positionClass = "hidden"; // Hide extra cards
//               // }

//               return (
//                 <div
//                   key={index}
//                   className={`flex-shrink-0 w-[33%] transition-transform duration-500 ease-in-out ${positionClass}`}
//                 >
//                   <Card className="bg-white text-black p-6 rounded-lg shadow-lg w-full h-[15rem]">
//                     <Quote className="mx-auto text-gray-300" size={32} />
//                     <p className="text-gray-700 mt-4">{testimonial.review}</p>
//                     <div className="mt-4 font-semibold text-gray-900">{testimonial.name}</div>
//                     <div className="text-gray-500">{testimonial.location}</div>

//                   </Card>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Right Button */}
//         <button onClick={scrollNext} className="absolute right-2 md:right-6 bg-gray-700 p-2 rounded-full z-10">
//           <ChevronRight size={24} className="text-white" />
//         </button>
//       </div>
//     </section>
//   );
// }










