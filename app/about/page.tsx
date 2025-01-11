"use client"
import React , { useEffect, useRef } from 'react';
import { Mountain , Globe, Trees, Crown } from 'lucide-react';
import Image from 'next/image';

import styles from "./about.module.css";

import SectionCol from '../components/content/sectionCol/SectionCol';
import SectionTextImage from '../components/content/sectionTextImage/SectionTextImage';

const AboutPage = () => {
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target); // Stop observing once it's visible
        }
      });
    });

    elementsRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect(); // Clean up observer
  }, []);
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };
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
    <div ref={addToRefs} className={`${styles.hero} ${styles.hidden}`}>
        <div className={styles.content}>
          <h1 ref={addToRefs} className={`${styles.hidden} ${styles.title}`}>Ánh Trăng Xanh: Hành Trình Trọn Niềm Vui</h1>
          <p ref={addToRefs} className={`${styles.hidden} ${styles.description}`}>
            Khám phá vẻ đẹp Việt Nam và thế giới cùng Ánh Trăng Xanh, nơi hành trình
            trọn vẹn niềm vui và sự an toàn.
          </p>
        </div>
    </div>
      {/* ------- */}
    {/* Section 1 */}
    <div>
      <SectionCol
        titleRef={addToRefs}
        leftRef={addToRefs}
        rightRef={addToRefs}
        titleStyle={styles.hidden}
        leftStyle={styles.hidden}
        rightStyle={styles.hidden}
        title="Blue Moon Light"
        leftContent="Được thành lập vào năm 2023, Ánh Trăng Xanh mang đến những trải nghiệm đáng nhớ, an toàn, và thân thiện với môi trường. Chúng tôi cam kết bảo vệ và gìn giữ thiên nhiên cho thế hệ tương lai."
        rightContent="Với phương châm 'Hành trình trọn niềm vui', chúng tôi không chỉ tập trung vào việc tổ chức các tour du lịch chất lượng mà còn hướng tới sự phát triển bền vững."
        />
    </div>  
    
    {/* Section 2 */}
    <section className={`${styles.section}`}>
    <h1 ref={addToRefs} className={`${styles.header} ${styles.hidden}`}>Chúng tôi cung cấp các chuyến đi</h1>
    <div className={styles.sec2content}>
      {/* Nội dung bên trái */}
      <div className={styles.left}>
        <div className={styles.item}>
          <h3 ref={addToRefs} className={`${styles.hidden}`}>Chất Lượng & An Toàn</h3>
          <p ref={addToRefs} className={`${styles.hidden}`}>
            Cung cấp các tour du lịch chất lượng, đảm bảo an toàn tuyệt đối
            cho khách hàng.
          </p>
        </div>
        <div className={styles.item}>
          <h3 ref={addToRefs} className={`${styles.hidden}`}>Đối Tác Đáng Tin Cậy</h3>
          <p ref={addToRefs} className={`${styles.hidden}`}>
            Lựa chọn những đối tác đáng tin cậy, mang lại dịch vụ tốt nhất với
            mức giá hợp lý.
          </p>
        </div>
        <div className={styles.item}>
          <h3 ref={addToRefs} className={`${styles.hidden}`}>Bền Vững & Bảo Vệ Môi Trường</h3>
          <p ref={addToRefs} className={`${styles.hidden}`}>
            Hướng tới các giá trị bền vững bằng việc giảm thiểu tác động đến
            môi trường và khuyến khích du khách tham gia vào các hoạt động bảo
            vệ thiên nhiên.
          </p>
        </div>
        <div className={styles.item}>
          <h3 ref={addToRefs} className={`${styles.hidden}`}>Cải Tiến & Đổi Mới</h3>
          <p ref={addToRefs} className={`${styles.hidden}`}>
            Không ngừng cải tiến, đổi mới để đem đến những trải nghiệm tốt nhất
            cho khách hàng.
          </p>
        </div>
      </div>

      {/* Phần ảnh bên phải */}
      <div ref={addToRefs} className={`${styles.right} ${styles.hidden}`}>
        <img src="/about.jpg" alt="About"/>
      </div>
    </div>
    </section>

    {/* TẦM NHÌN VÀ SỨ MỆNH*/}
    <SectionCol
      titleRef={addToRefs}
      leftRef={addToRefs}
      rightRef={addToRefs}
      titleStyle={styles.hidden}
      leftStyle={styles.hidden}
      rightStyle={styles.hidden}
      title="Tầm Nhìn & Sứ Mệnh"
      leftContent="Ánh Trăng Xanh hướng đến trở thành một trong những công ty du lịch hàng đầu, không chỉ ở Việt Nam mà còn vươn tầm ra quốc tế."
      rightContent="Chúng tôi mong muốn trở thành người bạn đồng hành tin cậy của mọi du khách, mang đến những trải nghiệm độc đáo và trọn vẹn nhất."
      />
    
    
    {/* GIÁ TRỊ CỐT LỖI  */}
    <section ref={addToRefs} className={`${styles.sec3} ${styles.hidden}`}>
      <h2 ref={addToRefs} className={`${styles["sec3-header"]} ${styles.hidden}`}>Giá Trị Cốt Lõi</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 ref={addToRefs} className={`${styles.hidden}`}>Chất Lượng Dịch Vụ</h3>
          <p ref={addToRefs} className={`${styles.hidden}`}>
            Chúng tôi luôn nỗ lực mang đến dịch vụ tốt nhất, với đội ngũ nhân
            viên chuyên nghiệp và tận tâm.
          </p>
        </div>
        <div className={styles.card}>
          <h3 ref={addToRefs} className={`${styles.hidden}`}>An Toàn Tuyệt Đối</h3>
          <p ref={addToRefs} className={`${styles.hidden}`}>
            Đặt an toàn của khách hàng lên hàng đầu, chúng tôi luôn tuân thủ các
            tiêu chuẩn và quy định khắt khe về an toàn trong mọi hành trình.
          </p>
        </div>
        <div className={styles.card}>
          <h3 ref={addToRefs} className={`${styles.hidden}`}>Bảo Vệ Môi Trường</h3>
          <p ref={addToRefs} className={`${styles.hidden}`}>
            Chúng tôi cam kết thực hiện các tour du lịch thân thiện với môi
            trường, giảm thiểu rác thải và tăng cường các hoạt động bảo vệ thiên
            nhiên.
          </p>
        </div>
        <div className={styles.card}>
          <h3 ref={addToRefs} className={`${styles.hidden}`}>Sáng Tạo & Đổi Mới</h3>
          <p ref={addToRefs} className={`${styles.hidden}`}> 
            Luôn tìm kiếm những điều mới mẻ và sáng tạo để mang đến cho khách
            hàng những trải nghiệm du lịch độc đáo và thú vị.
          </p>
        </div>
      </div>
    </section>

    {/* DỊCH VỤ CỦA CHÚNG TÔI */}
    <section className={`${styles.section}`}>
    <h1 ref={addToRefs} className={`${styles.header} ${styles.hidden}`}>Dịch Vụ Của Chúng Tôi</h1>
    <div className={styles.sec2content}>
      {/* Nội dung bên trái */}
      <div className={styles.left2_3}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div ref={addToRefs} className={`${styles.hidden}`}>
              <Mountain color="#3a56d6" size={50}/>
            </div>
            <h3 ref={addToRefs} className={`${styles.hidden}`}>Tour Trong Nước</h3>
            <p ref={addToRefs} className={`${styles.hidden}`}>Khám phá vẻ đẹp của đất nước Việt Nam với các hành trình từ miền núi hùng vĩ đến bãi biển tuyệt đẹp.</p>
          </div>
          <div className={styles.card}>
            <div ref={addToRefs} className={`${styles.hidden}`}>
              <Globe color="#3a56d6" size={50}/>
            </div>
            <h3 ref={addToRefs} className={`${styles.hidden}`}>Tour Quốc Tế</h3>
            <p ref={addToRefs} className={`${styles.hidden}`}>Đưa bạn trải nghiệm các nền văn hóa đặc sắc trên khắp thế giới với các tour du lịch chất lượng và độc đáo.</p>
          </div>
          <div className={styles.card}>
            <div ref={addToRefs} className={`${styles.hidden}`}>
              <Trees color="#3a56d6" size={50}/>
            </div>
            <h3 ref={addToRefs} className={`${styles.hidden}`}>Tour Sinh Thái</h3>
            <p ref={addToRefs} className={`${styles.hidden}`}>Hành trình khám phá thiên nhiên, hướng đến việc bảo vệ và gìn giữ môi trường, kết nối cộng đồng địa phương với du khách.</p>
          </div>
          <div className={styles.card}>
            <div ref={addToRefs} className={`${styles.hidden}`}>
              <Crown color="#3a56d6" size={50}/>
            </div>
            <h3 ref={addToRefs} className={`${styles.hidden}`}>Tour Nghỉ Dưỡng Cao Cấp</h3>
            <p ref={addToRefs} className={`${styles.hidden}`}>Đáp ứng nhu cầu thư giãn, nghỉ dưỡng với các tour thiết kế đặc biệt tại các khu resort, spa sang trọng.</p>
          </div>
        </div>
      </div>

      {/* Phần ảnh bên phải */}
      <div ref={addToRefs} className={`${styles.right2_3} ${styles.hidden}`}>
        <img src="/about.jpg" alt="About"/>
      </div>
    </div>
    </section>

    {/* CAM KẾT CỦA CHÚNG TÔI */}
    <section className={`${styles.section}`}>
    <h1 ref={addToRefs} className={`${styles.header} ${styles.hidden}`}>Cam Kết Của Chúng Tôi</h1>
    <div className={styles.sec2content}>
      {/* Nội dung bên trái */}
      <div className={styles.left2_3}>
        <div className={styles["sec-flex-col"]}>
          <div className={styles.subsec}> 
            <div className={styles.card}>
              <h3 ref={addToRefs} className={`${styles.hidden}`}>Uy Tín & Chuyên Nghiệp</h3>
              <p ref={addToRefs} className={`${styles.hidden}`}>Chúng tôi luôn đặt chữ tín lên hàng đầu, cam kết cung cấp dịch vụ với tiêu chuẩn tốt nhất với những gì quý khách hàng bỏ ra.</p>
            </div>
            <div className={styles.card}>
            <h3 ref={addToRefs} className={`${styles.hidden}`}>Trải Nghiệm Đa Dạng</h3>
            <p ref={addToRefs} className={`${styles.hidden}`}>Ánh Trăng Xanh mang đến những hành trình phong phú, từ các chuyến phiêu lưu mạo hiểm đến các kỳ nghỉ thư giãn nhẹ nhàng.</p>
            </div>
          </div>
          <div className={styles.card}>
            <h3 ref={addToRefs} className={`${styles.hidden}`}>Hỗ Trợ 24/7</h3>
            <p ref={addToRefs} className={`${styles.hidden}`}>Chúng tôi luôn sẵn sàng hỗ trợ và đồng hành cùng khách hàng trong suốt chuyến đi, đảm bảo mọi yêu cầu và thắc mắc được giải quyết kịp thời.</p>
          </div>
        </div>
      </div>

      {/* Phần ảnh bên phải */}
      <div ref={addToRefs} className={`${styles.right2_3} ${styles.hidden}`}>
        <img src="/about.jpg" alt="About"/>
      </div>
    </div>
    </section>


    {/* TRẢI NGHIỆM ÁNH SÁNG */}
    <SectionTextImage
      titleRef={addToRefs}
      leftRef={addToRefs}
      rightRef={addToRefs}
      titleStyle={styles.hidden}
      leftStyle={styles.hidden}
      rightStyle={styles.hidden}
      title="Trải Nghiệm Ánh Trăng Xanh"
      leftContent='Đến với Công ty Ánh Trăng Xanh, Quý khách không chỉ có những trải nghiệm mới mẻ mà còn cảm nhận sự thoải mái, an nhiên trong từng hành trình. Chúng tôi luôn cam kết mang đến những dịch vụ du lịch chất lượng, các tour nghỉ dưỡng và chữa lành, giúp Quý khách hài lòng và trọn vẹn niềm vui sau mỗi chuyến đi.'
      rightContent="/about.jpg"
      />

    {/* CẢM ƠN */}
    <section className={`${styles.section}`}>
      {/* Tiêu đề lớn */}
      <h1 ref={addToRefs} className={`${styles.header} ${styles.hidden}`}>LỜI CẢM ƠN</h1>

      {/* Nội dung 2 cột */}
      <div className={styles.columns}>
        {/* Cột bên trái */}
        <div className={styles.column}>
          <p ref={addToRefs} className={`${styles.hidden}`}>
          Thay mặt Ban lãnh đạo và toàn thể cán bộ nhân viên Công ty Ánh Trăng Xanh, chúng tôi xin trân trọng cảm ơn Quý khách đã dành thời gian quan tâm đến phần giới thiệu của chúng tôi. Ánh Trăng Xanh luôn mong muốn được đồng hành cùng Quý khách trong những chuyến hành trình ý nghĩa và mang lại những dịch vụ tốt nhất, đáp ứng mọi nhu cầu của Quý khách hàng.
          </p>
        </div>
      </div>
    </section>

    {/* LIÊN HỆ VỚI CHÚNG TÔI*/}
    <SectionTextImage
      titleRef={addToRefs}
      leftRef={addToRefs}
      rightRef={addToRefs}
      titleStyle={styles.hidden}
      leftStyle={styles.hidden}
      rightStyle={styles.hidden}
      title="Liên Hệ Với Chúng Tôi"
      leftContent='Hãy liên hệ với chúng tôi để bắt đầu hành trình trọn niềm vui của bạn ngay hôm nay! Chúng tôi rất mong nhận được sự quan tâm, góp ý và phản hồi từ Quý khách để không ngừng hoàn thiện chất lượng dịch vụ.'
      rightContent="/about.jpg"
      />
    
  
    {/* 
    end
    */}
    </div>
  );
}

export default AboutPage;