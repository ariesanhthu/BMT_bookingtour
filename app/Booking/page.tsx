import React from 'react'
import Image from 'next/image';
import styles from "./booking.module.css";
import Contactform from '../components/contactform/Contactform';
const BookingPage = () => {
  return (
    <div> 
      <Contactform/>
    </div>
    // <div className={styles.container}>
    //   <div className={styles.imgContainer}>
    //     <Image src="/contact.png" alt="" fill className={styles.img} />
    //   </div>
    //   <div className={styles.formContainer}>
    //     {/* <HydrationTestNoSSR/> */}
    //     {/* <div suppressHydrationWarning>{a}</div> */}
    //     <form action="" className={styles.form}>
    //       <input type="text" placeholder="Tên của bạn" />
    //       <input type="text" placeholder="Số điện thoại liên hệ" />
    //       <input
    //         type="text"
    //         placeholder="Lời nhắn"
    //       ></input>
    //       <button className="btn bg-red-50 justify-center">Send</button>
    //     </form>
    //   </div>
    // </div>
  )
}

export default BookingPage;