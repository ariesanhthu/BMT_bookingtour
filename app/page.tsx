import Image from "next/image";
import Contactform from "./components/contactform/Contactform";
import HotTour from "./components/HotTour";
import RegionTour from "./components/RegionTour";
import ImageSlider from "./components/slider/SliderFull";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic";

export default async function Home() {
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
      <div className="w-full flex flex-col md:flex-row items-center justify-center mt-10">
        {/* section MAIN WELCOME */}
        <div className="flex flex-col justify-center items-center text-center md:text-center sm:max-xl:gap-2 p-2">
          <p className="xl:text-3xl xl:leading-snug sm:max-2xl:p-0 text-xl sm:max-lg:text-xl font-bold uppercase">{data.slogan}</p>
          <p className="text-base text-balance font-semibold lg:max-sm:text-sm">{data.subSlogan}</p>
        </div>

      </div>
      
      {/* section HOT TOUR */}
      <HotTour/>

      {/* <Card className="flex justify-center items-center p-0 md:p-5 mt-10 mx-5 md:mx-20">
        <CardContent className="p-3 md:p-5 ">
          <div className="flex flex-row justify-center items-center space-x-5">
            <img src="contact.png" className="flex-[2]  hidden md:block md:w-1/2"/>
            <div className="flex-[1] flex flex-col justify-center items-center space-y-2">
              <h1 className={`font-bold text-lg md:text-3xl text-[#3a56d6] text-center`}>Liên hệ tư vấn</h1>
              <Contactform/>  
            </div>
          </div>
        </CardContent>        
      </Card> */}
      <Contactform/>
      {/* </div> */}

      <RegionTour/>

    </div>

  );
}
