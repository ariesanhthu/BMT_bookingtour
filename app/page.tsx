import Image from "next/image";
import Contactform from "./components/contactform/Contactform";
import HotTour from "./components/HotTour";
import RegionTour from "./components/RegionTour";
import ImageSlider from "./components/slider/SliderFull";

export const dynamic = "force-dynamic";

export default async function Home() {

  // const data = await getData();
  // data.ts
  const data = {
    slogan:"Du lịch cùng chúng tôi",
    subSlogan: "Đồng hành cùng bạn tham quan các địa điểm nổi tiếng ở khắp Việt Nam",
    images: [
      '/slide1.jpg',
      '/slide2.jpg',
      '/slide3.jpg',
      '/slide4.jpg',
      '/slide5.jpg',
    ],
    count: 5,
  };

// export default data;
  const imagesCount = data.images.length;
  return (

    <div className="w-full h-full">

        <ImageSlider />
      {/* section MAIN WELCOME */}
      
      <div className="w-full flex md:flex-row items-center justify-center flex-col mt-10">
        <div className="flex w-1/2 flex-col justify-items-center text-center md:text-center sm:max-xl:gap-2">
          <p className="xl:text-3xl xl:leading-snug sm:max-2xl:p-0 text-xl sm:max-lg:text-xl font-bold uppercase">{data.slogan}</p>
          <p className="text-base text-balance font-semibold lg:max-sm:text-sm">{data.subSlogan}</p>
        </div>
        <Contactform/>
      </div>
      
      {/* section HOT TOUR */}

        <HotTour/>

        <RegionTour/>
        

    </div>

  );
}
