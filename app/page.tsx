import Image from "next/image";
import Hero from "./components/Hero";
// import Newest from "./components/Newest";
import Slideshow from './components/Slideshow';
import { client, urlFor } from "./lib/sanity";
import ImageGallery from "./components/ImageGallery";
import HotTour from "./components/HotTour";
import RegionTour from "./components/RegionTour";
export const dynamic = "force-dynamic";

async function getData() {
  const query = `*[_type == "banner"][0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {

  const data = await getData();
  const imagesCount = data.images.length;
  return (

    <div className="w-full h-full p-10">
      {/* section MAIN WELCOME */}
      <div className="w-full flex md:flex-row gap-5 items-center justify-center flex-col">
        <div className="flex w-full md:w-1/3 flex-col justify-items-center text-center md:text-left sm:max-2xl:gap-5 gap-2">
          <p className="xl:text-6xl xl:leading-snug sm:max-2xl:p-0 text-3xl pl-5 pr-5 sm:max-lg:text-4xl font-bold uppercase">{data.slogan}</p>
          <p className="lg:pr-10 text-base text-balance font-semibold sm:max-md:text-sm lg:max-2xl:text-xl">{data.subSlogan}</p>
        </div>
        <Slideshow images={data.images} count = {imagesCount}/>
      </div>
      {/* section HOT TOUR */}

        <RegionTour/>
        <HotTour/>
    {/* <Hero /> */}
    {/* <Newest /> */}
  </div>

  );
}
