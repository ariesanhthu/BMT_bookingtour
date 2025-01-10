import React from 'react';
import Image from 'next/image';

import styles from "./about.module.css";

import SectionCol from '../components/content/sectionCol/SectionCol';

const AboutPage = () => {
  return (
    <div>
{/* 
    <div className="flex items-center justify-center">
      <div className="text-center">
        Logo image 
        <div className="rounded-full overflow-hidden w-64 h-64 mx-auto" style={{ position: 'relative' }}>
          <Image 
            src="/logo.jpg" 
            alt="Circle Image" 
            layout="fill" 
            objectFit="cover" 
            className="rounded-full"
            />
        </div>
        <h1 className="text-3xl font-bold mt-8">BLUE MOON LIGHT TRAVEL</h1>
         <h3>Công ty du lịch</h3> 
      </div>
    </div> */}

     {/* ABOUT PAGE  */}
     <div className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>Ánh Trăng Xanh: Hành Trình Trọn Niềm Vui</h1>
          <p className={styles.description}>
            Khám phá vẻ đẹp Việt Nam và thế giới cùng Ánh Trăng Xanh, nơi hành trình
            trọn vẹn niềm vui và sự an toàn.
          </p>
        </div>
      </div>
      {/* ------- */}
       {/* Section 1 */}
    <SectionCol
        title="Blue Moon Light"
        leftContent="Được thành lập vào năm 2023, Ánh Trăng Xanh mang đến những trải nghiệm đáng nhớ, an toàn, và thân thiện với môi trường. Chúng tôi cam kết bảo vệ và gìn giữ thiên nhiên cho thế hệ tương lai."
        rightContent="Với phương châm 'Hành trình trọn niềm vui', chúng tôi không chỉ tập trung vào việc tổ chức các tour du lịch chất lượng mà còn hướng tới sự phát triển bền vững."
      />
    {/* Section 2 */}
    <section className={styles.section}>
    <h1 className={styles.header}>Chúng tôi cung cấp các chuyến đi</h1>
    <div className={styles.sec2content}>
      {/* Nội dung bên trái */}
      <div className={styles.left}>
        <div className={styles.item}>
          <h3>Chất Lượng & An Toàn</h3>
          <p>
            Cung cấp các tour du lịch chất lượng, đảm bảo an toàn tuyệt đối
            cho khách hàng.
          </p>
        </div>
        <div className={styles.item}>
          <h3>Đối Tác Đáng Tin Cậy</h3>
          <p>
            Lựa chọn những đối tác đáng tin cậy, mang lại dịch vụ tốt nhất với
            mức giá hợp lý.
          </p>
        </div>
        <div className={styles.item}>
          <h3>Bền Vững & Bảo Vệ Môi Trường</h3>
          <p>
            Hướng tới các giá trị bền vững bằng việc giảm thiểu tác động đến
            môi trường và khuyến khích du khách tham gia vào các hoạt động bảo
            vệ thiên nhiên.
          </p>
        </div>
        <div className={styles.item}>
          <h3>Cải Tiến & Đổi Mới</h3>
          <p>
            Không ngừng cải tiến, đổi mới để đem đến những trải nghiệm tốt nhất
            cho khách hàng.
          </p>
        </div>
      </div>

      {/* Phần ảnh bên phải */}
      <div className={styles.right}>
        <img src="/about.jpg" alt="About" />
      </div>
    </div>
    </section>

    {/* section 3 */}
    <section className={styles.section}>
    {/* Tiêu đề lớn */}
    <h1 className={styles.header}>Tầm Nhìn & Sứ Mệnh</h1>

    {/* Nội dung 2 cột */}
    <div className={styles.columns}>
      {/* Cột bên trái */}
      <div className={styles.column}>
        <p>
        Ánh Trăng Xanh hướng đến trở thành một trong những công ty du lịch hàng đầu, không chỉ ở Việt Nam mà còn vươn tầm ra quốc tế.
        </p>
      </div>

      {/* Cột bên phải */}
      <div className={styles.column}>
        <p>
        Chúng tôi mong muốn trở thành người bạn đồng hành tin cậy của mọi du khách, mang đến những trải nghiệm độc đáo và trọn vẹn nhất.
        </p>
      </div>
    </div>
    </section>
  
    {/* GIÁ TRỊ CỐT LỖI  */}
    
    <section className={styles.sec3}>
      <h2 className={styles["sec3-header"]}>Giá Trị Cốt Lõi</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Chất Lượng Dịch Vụ</h3>
          <p>
            Chúng tôi luôn nỗ lực mang đến dịch vụ tốt nhất, với đội ngũ nhân
            viên chuyên nghiệp và tận tâm.
          </p>
        </div>
        <div className={styles.card}>
          <h3>An Toàn Tuyệt Đối</h3>
          <p>
            Đặt an toàn của khách hàng lên hàng đầu, chúng tôi luôn tuân thủ các
            tiêu chuẩn và quy định khắt khe về an toàn trong mọi hành trình.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Bảo Vệ Môi Trường</h3>
          <p>
            Chúng tôi cam kết thực hiện các tour du lịch thân thiện với môi
            trường, giảm thiểu rác thải và tăng cường các hoạt động bảo vệ thiên
            nhiên.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Sáng Tạo & Đổi Mới</h3>
          <p>
            Luôn tìm kiếm những điều mới mẻ và sáng tạo để mang đến cho khách
            hàng những trải nghiệm du lịch độc đáo và thú vị.
          </p>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      {/* Tiêu đề lớn */}
      <h1 className={styles.header}>LỜI CẢM ƠN</h1>

      {/* Nội dung 2 cột */}
      <div className={styles.columns}>
        {/* Cột bên trái */}
        <div className={styles.column}>
          <p>
          Thay mặt Ban lãnh đạo và toàn thể cán bộ nhân viên Công ty Ánh Trăng Xanh, chúng tôi xin trân trọng cảm ơn Quý khách đã dành thời gian quan tâm đến phần giới thiệu của chúng tôi. Ánh Trăng Xanh luôn mong muốn được đồng hành cùng Quý khách trong những chuyến hành trình ý nghĩa và mang lại những dịch vụ tốt nhất, đáp ứng mọi nhu cầu của Quý khách hàng.
          </p>
        </div>
      </div>
    </section>
    
    {/* BỔ SUNG CODE Ở ĐÂY */}
  
  
    {/* 
    end
    */}
    </div>
  );
}

export default AboutPage;
