import { Item } from "@radix-ui/react-dropdown-menu";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={`flex flex-col md:flex-row my-5 mx-auto lg:mx-40 font-bold  space-x-5 v-screen`}>
      {/* Contact information */}
      <div className={`flex-1 p-5`}>
      {/* ${styles.costume_text} */}
        <h1 className={`text-center text-lg md:text-xl lg:text-3xl text-[#1E90FF] mb-6`}> <i>Đặt lịch ngay với chúng tôi</i> </h1>
        {/*Link Mail*/}
        <p> 
          <a 
            className={`inline-flex my-3 text-sm md:text-md lg:text-lg ${styles.link}`}
            // href="mailto:bluemoonlight.travel@gmail.com"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=bluemoonlight.travel@gmail.com"
            target="_blank"
            rel="noopener noreferrer"> 
            <img className={`mr-5 w-5 h-5 md:w-8 md:h-8 brightness-0 dark:brightness-100`} src="/icon_mail.png" alt="Mail icon"/>
            bluemoonlight.travel@gmail.com 
          </a>
        </p>
        {/*Link facebook*/}
        <p> 
          <a
            className={`inline-flex my-3 text-sm md:text-md lg:text-lg ${styles.link}`}
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
            className={`inline-flex my-3 text-sm md:text-md lg:text-lg ${styles.link}`}
            href="https://zalo.me/0942190022"
            target="_blank"
            rel="noopener noreferrer">
            <img className={`mr-5 w-5 h-5 md:w-8 md:h-8 brightness-0 dark:brightness-100`} src="/icon_phone.png" alt="Mail icon"/>
            0942 190022
          </a>
        </p>
        {/*Link gg map*/}
        <p> 
          <a    
            className={`inline-flex my-3 text-sm md:text-md lg:text-lg ${styles.link}`}
            href="https://maps.app.goo.gl/GdHMkMAM9vXrKL789"
            target="_blank"
            rel="noopener noreferrer"> 
            <img className={`mr-5 w-5 h-5 md:w-8 md:h-8 brightness-0 dark:brightness-100`} src="/icon_map.png" alt="Mail icon"/>
            158 Bùi Quang Trinh, P. Phú Thứ, Q. Cái Răng, Tp. Cần Thơ
          </a>
        </p>

      </div>
      
      {/* QR information */}
      <div className={`flex-1 p-5`}>
        <p>
          <img className={`${styles.image} brightness-0 dark:brightness-100`} width="200px" height="200px" src="/qr_zalo.png" alt="QR zalo"/>
        </p>
        <h1 className={`text-center text-lg md:text-xl lg:text-3xl text-[#1E90FF] my-3`}> <i> Quét để xem ưu đãi </i> </h1>
      </div>
      {/* THong tin khac */}
      <div className={`flex-1 p-5`}>
        <h1 className={`text-lg md:text-xl lg:text-3xl text-[#1E90FF] mb-6`}> CÔNG TY TNHH MÔI TRƯỜNG & DU LỊCH ÁNH TRĂNG XANH</h1>
        <p className={`my-3 text-sm md:text-md lg:text-lg`}>Blue Moonlight Travel & Environment CO., LTD</p>
        <p className={`my-3 text-sm md:text-md lg:text-lg`}>MÃ SỐ THUẾ (MST): 0317967773</p>
      </div>
    </footer>
  );
};

export default Footer;

// return (
//   <footer className={styles.footer}>
//     {/* Contact information */}
//     <div className={styles.footer_column}>
//     {/* ${styles.costume_text} */}
//       <p className={`text-base sm:text-sm md:text-xl lg:text-2xl`}> <i>Đặt lịch ngay với chúng tôi</i> </p>
//       {/*Link Mail*/}
//       <p> 
//         <a 
//           className={styles.link}
//           // href="mailto:bluemoonlight.travel@gmail.com"
//           href="https://mail.google.com/mail/?view=cm&fs=1&to=bluemoonlight.travel@gmail.com"
//           target="_blank"
//           rel="noopener noreferrer"> 
//           <img className={styles.icon} src="/icon_mail.png" alt="Mail icon"/>
//           bluemoonlight.travel@gmail.com 
//         </a>
//       </p>
//       {/*Link facebook*/}
//       <p> 
//         <a
//           className={styles.link}
//           href="https://www.facebook.com/profile.php?id=61569547720275"
//           target="_blank"
//           rel="noopener noreferrer"> 
//           <img className={styles.icon} src="/icon_fb.png" alt="Mail icon"/>
//           Blue MoonLight Travel
//         </a>
//       </p>
//       {/*Link Zalo*/}
//       <p> 
//         <a
//           className={styles.link}
//           href="https://zalo.me/0942190022"
//           target="_blank"
//           rel="noopener noreferrer">
//           <img className={styles.icon} src="/icon_phone.png" alt="Mail icon"/>
//           0942 190022
//         </a>
//       </p>
//       {/*Link gg map*/}
//       <p> 
//         <a  
//           className={styles.link}
//           href="https://maps.app.goo.gl/GdHMkMAM9vXrKL789"
//           target="_blank"
//           rel="noopener noreferrer"> 
//           <img className={styles.icon} src="/icon_map.png" alt="Mail icon"/>
//           158 Bùi Quang Trinh, P. Phú Thứ, Q. Cái Răng, Tp. Cần Thơ
//         </a>
//       </p>

//     </div>

//     {/* QR information */}
//     <div className={styles.footer_column}>
//       <p>
//         <img className={styles.image} width="200px" height="200px" src="/qr_zalo.png" alt="QR zalo"/>
//       </p>
//       <p className={styles.text}> <i> Quét để xem ưu đãi </i> </p>
//     </div>
//   </footer>
// );