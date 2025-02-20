"use client";
import { useState, useEffect } from "react";
import { Item } from "@radix-ui/react-dropdown-menu";
import styles from "./footer.module.css";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import seedData from '@/app/lib/seedData';

export const  footer = {
  email: "bluemoonlight.travel@gmail.com",
  phone: "0942190022",
  address: "158 Bùi Quang Trinh, P. Phú Thứ, Q. Cái Răng, Tp. Cần Thơ",
}
const Footer = () => {
  // const [homePageData, setHomePageData] = useState({
  //   _id: '',
  //   images: [] as string[],
  //   navbar: [
  //     {
  //       name: '',
  //       href: '',
  //       sublinks: [{ name: '', href: '' }]
  //     }
  //   ],
  //   logo: '',
  //   slogan: '',
  //   subSlogan: '',
  //   footer: {
  //     email: '',
  //     phone: '',
  //     address: '',
  //   },
  // });
    
    // Lấy dữ liệu từ server
  // const fetchHomePageData = async () => {
  //   try {
  //     const response = await fetch('/api/homepage');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setHomePageData(data.data);
  //     } else {
  //       // Không có dữ liệu, tạo mới
  //       const newResponse = await fetch('/api/homepage', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify(seedData),
  //       });
  //       const newData = await newResponse.json();
  //       setHomePageData(newData.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching homepage data:', error);
  //   }
  // };
    
  // useEffect(() => {
  //   fetchHomePageData();
  // }, []);

  return (
    <footer className={`flex flex-col md:flex-row my-5 mx-auto lg:mx-40 font-bold  space-x-5 v-screen`}>
      {/* THong tin khac */}
      <div className={`flex-1 p-5`}>
        <p className={`text-lg md:text-md text-[#1E90FF] mb-6`}> CÔNG TY TNHH MÔI TRƯỜNG & DU LỊCH ÁNH TRĂNG XANH</p>
        <p className={`my-3 text-sm md:text-md`}>Blue Moonlight Travel & Environment CO., LTD</p>
        <p className={`my-3 text-sm md:text-md`}>MÃ SỐ THUẾ (MST): 0317967773</p>
      </div>
      
      {/* Contact information */}
      <div className={`flex-1 p-5`}>
      {/* ${styles.costume_text} */}
        <h1 className={`text-center text-md md:text-lg lg:text-xl text-[#1E90FF] mb-6`}> <i>Đặt lịch ngay với chúng tôi</i> </h1>
        {/*Link Mail*/}
        <p> 
          <a 
            className={`inline-flex my-3 text-sm md:text-md ${styles.link}`}
            // href="mailto:bluemoonlight.travel@gmail.com"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=bluemoonlight.travel@gmail.com"
            target="_blank"
            rel="noopener noreferrer"> 
            <img className={`mr-5 w-5 h-5 md:w-8 md:h-8 brightness-0 dark:brightness-100`} src="/icon_mail.png" alt="Mail icon"/>
            {footer.email}
          </a>
        </p>
        {/*Link facebook*/}
        <p> 
          <a
            className={`inline-flex my-3 text-sm md:text-md ${styles.link}`}
            href="https://www.facebook.com/profile.php?id=61569547720275"
            target="_blank"
            rel="noopener noreferrer"> 
            <img className={`mr-5 w-5 h-5 md:w-8 md:h-8 brightness-0 dark:brightness-100`} src="/icon_fb.png" alt="Mail icon"/>
            Blue MoonLight Travel
          </a>
        </p>
        {/*Link Zalo*/}
        <p> 
          <a
            className={`inline-flex my-3 text-sm md:text-md ${styles.link}`}
            href="https://zalo.me/0942190022"
            target="_blank"
            rel="noopener noreferrer">
            <img className={`mr-5 w-5 h-5 md:w-8 md:h-8 brightness-0 dark:brightness-100`} src="/icon_phone.png" alt="Mail icon"/>
            {footer.phone}
          </a>
        </p>
        {/*Link gg map*/}
        <p> 
          <a    
            className={`inline-flex my-3 text-sm md:text-md ${styles.link}`}
            href="https://maps.app.goo.gl/GdHMkMAM9vXrKL789"
            target="_blank"
            rel="noopener noreferrer"> 
            <img className={`mr-5 w-5 h-5 md:w-8 md:h-8 brightness-0 dark:brightness-100`} src="/icon_map.png" alt="Mail icon"/>
            {footer.address}
          </a>
        </p>

      </div>
      
      {/* QR information */}
      <div className={`flex-1 p-5`}>
        <p>
          <img className={`${styles.image} brightness-0 dark:brightness-100`} width="200px" height="200px" src="/qr_zalo.png" alt="QR zalo"/>
        </p>
        <h1 className={`text-center text-md md:text-lg lg:text-xl text-[#1E90FF] my-3`}> <i> Quét để xem ưu đãi </i> </h1>
      </div>
      
    </footer>
  );
};

export default Footer;