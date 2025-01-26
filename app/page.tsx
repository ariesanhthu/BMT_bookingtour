import Image from "next/image";
import Contactform from "./components/contactform/Contactform";
import HotTour from "./components/HotTour";
import RegionTour from "./components/RegionTour";
import ImageSlider from "./components/slider/SliderFull";
import Slogan from "./components/Slogan";
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
      <Slogan/>
      
      {/* section HOT TOUR */}
      <HotTour/>
      <Contactform/>
      <RegionTour/>

    </div>

  );
}