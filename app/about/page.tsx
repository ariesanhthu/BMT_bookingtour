"use client"
import React , { useEffect, useRef } from 'react';
import { Mountain , Globe, Trees, Crown } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
     {/* ABOUT PAGE  */}
    <Card className="relative w-full h-[50vh] bg-center bg-cover" style={{ backgroundImage: "url('/header.jpg')" }}>
      <CardContent className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col text-center justify-center items-center`}>
        <h1 ref={addToRefs} className={`${styles.hidden} mb-2 text-md md:text-3xl font-extrabold px-5 py-2`}>Ánh Trăng Xanh: Hành Trình Trọn Niềm Vui</h1>
        <p ref={addToRefs} className={`${styles.hidden} text-sm md:text-lg lg:w-max p-5`}>
          Khám phá vẻ đẹp Việt Nam và thế giới cùng Ánh Trăng Xanh, nơi hành trình
          trọn vẹn niềm vui và sự an toàn.
        </p>
      </CardContent>
    </Card> 
      {/* ------- */}
    {/* Section 1 */}
    <Card className={`${styles['odd-sec']}`}>
      <CardContent>
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
      </CardContent>
    </Card>  
    
    {/* Section 2 */}
    <Card className={`${styles['even-sec']}`}>
      <CardContent>
        <div className={`p-[2rem] bg-[#f5f7ff] m-auto my-[2rem] max-w-[1200px] shadow-lg rounded-lg`}>
          <h1 ref={addToRefs} className={`${styles.hidden} font-bold text-lg md:text-4xl text-[#3a56d6] text-left px-4 pb-6`}>Chúng tôi cung cấp các chuyến đi</h1>
          <div className={`flex flex-col md:flex-row md:space-x-1`}>
            {/* Nội dung bên trái */}
            <div className={`flex-1 p-4`}>
              <div className={`mb-[2rem]`}>
                <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Chất Lượng & An Toàn</h3>
                <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>
                  Cung cấp các tour du lịch chất lượng, đảm bảo an toàn tuyệt đối
                  cho khách hàng.
                </p>
              </div>
              <div className={`mb-[2rem]`}>
                <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Đối Tác Đáng Tin Cậy</h3>
                <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>
                  Lựa chọn những đối tác đáng tin cậy, mang lại dịch vụ tốt nhất với
                  mức giá hợp lý.
                </p>
              </div>
              <div className={`mb-[2rem]`}>
                <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Bền Vững & Bảo Vệ Môi Trường</h3>
                <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>
                  Hướng tới các giá trị bền vững bằng việc giảm thiểu tác động đến
                  môi trường và khuyến khích du khách tham gia vào các hoạt động bảo
                  vệ thiên nhiên.
                </p>
              </div>
              <div className={`mb-[2rem]`}>
                <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Cải Tiến & Đổi Mới</h3>
                <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>
                  Không ngừng cải tiến, đổi mới để đem đến những trải nghiệm tốt nhất
                  cho khách hàng.
                </p>
              </div>
            </div>

            {/* Phần ảnh bên phải */}
            <div ref = {addToRefs} className={` flex-1 p-4 my-0 flex justify-center`}>
              <img src="/about.jpg" className="h-64 w-auto pt-0 mt-0 rounded-sm" alt="About"/>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    {/* Section 3 */}
    {/* TẦM NHÌN VÀ SỨ MỆNH*/}
    <Card className={`${styles['odd-sec']}`}>
      <CardContent>
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
      </CardContent>
    </Card>
    
    {/* Section 4 */}
    {/* GIÁ TRỊ CỐT LỖI  */}
    <Card className={`${styles['even-sec']}`}>
      <CardContent>
        <div className={`p-[2rem] bg-[#f5f7ff] m-auto my-[2rem] max-w-[1200px] shadow-lg rounded-lg`}> 
          <h1 ref={addToRefs} className={`${styles.hidden} font-bold text-lg md:text-4xl text-[#3a56d6] text-left px-4 pb-6`}>Giá Trị Cốt Lõi</h1>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
            <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
              <CardContent className='p-0'>
                <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Chất Lượng Dịch Vụ</h3>
                <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>
                  Chúng tôi luôn nỗ lực mang đến dịch vụ tốt nhất, với đội ngũ nhân
                  viên chuyên nghiệp và tận tâm.
                </p>
              </CardContent>
            </Card>
            <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
              <CardContent className='p-0'>
                <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>An Toàn Tuyệt Đối</h3>
                <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>
                  Đặt an toàn của khách hàng lên hàng đầu, chúng tôi luôn tuân thủ các
                  tiêu chuẩn và quy định khắt khe về an toàn trong mọi hành trình.
                </p>
              </CardContent>
            </Card>
            <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
              <CardContent className='p-0'>
                <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Bảo Vệ Môi Trường</h3>
                <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>
                  Chúng tôi cam kết thực hiện các tour du lịch thân thiện với môi
                  trường, giảm thiểu rác thải và tăng cường các hoạt động bảo vệ thiên
                  nhiên.
                </p>
              </CardContent>
            </Card>
            <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
              <CardContent className='p-0'>
                <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Sáng Tạo & Đổi Mới</h3>
                <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}> 
                  Luôn tìm kiếm những điều mới mẻ và sáng tạo để mang đến cho khách
                  hàng những trải nghiệm du lịch độc đáo và thú vị.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
    
    {/* Section 5 */}
    {/* DỊCH VỤ CỦA CHÚNG TÔI */}
    <Card className={`${styles['odd-sec']}`}>
      <CardContent>
        <div className={`p-[2rem] bg-[#f5f7ff] m-auto my-[2rem] max-w-[1200px] shadow-lg rounded-lg`}>
          <h1 ref={addToRefs} className={`${styles.hidden} font-bold text-lg md:text-4xl text-[#3a56d6] text-left px-4 pb-6`}>Dịch Vụ Của Chúng Tôi</h1>
          <div className={`flex flex-col md:flex-row md:space-x-1`}>
            {/* Nội dung bên trái */}
            <div className={`flex-auto p-4`}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
              <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
                  <CardContent className='p-0'>
                    <div ref={addToRefs} className={`${styles.hidden}`}>
                      <Mountain  className={`text-[#3a56d6] w-8 h-8 md:w-14 md:h-14`}/>
                    </div>
                    <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Tour Trong Nước</h3>
                    <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>Khám phá vẻ đẹp của đất nước Việt Nam với các hành trình từ miền núi hùng vĩ đến bãi biển tuyệt đẹp.</p>
                  </CardContent>
                </Card>
                <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
                  <CardContent className='p-0'>
                    <div ref={addToRefs} className={`${styles.hidden}`}>
                      <Globe className={`text-[#3a56d6] w-8 h-8 md:w-14 md:h-14`}/>
                    </div>
                    <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Tour Quốc Tế</h3>
                    <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>Đưa bạn trải nghiệm các nền văn hóa đặc sắc trên khắp thế giới với các tour du lịch chất lượng và độc đáo.</p>
                  </CardContent>
                </Card>
                <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
                  <CardContent className='p-0'>
                    <div ref={addToRefs} className={`${styles.hidden}`}>
                      <Trees className={`text-[#3a56d6] w-8 h-8 md:w-14 md:h-14`}/>
                    </div>
                    <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Tour Sinh Thái</h3>
                    <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>Hành trình khám phá thiên nhiên, hướng đến việc bảo vệ và gìn giữ môi trường, kết nối cộng đồng địa phương với du khách.</p>
                  </CardContent>
                </Card>
                <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
                  <CardContent className='p-0'>
                    <div ref={addToRefs} className={`${styles.hidden}`}>
                      <Crown className={`text-[#3a56d6] w-8 h-8 md:w-14 md:h-14`}/>
                    </div>
                    <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Tour Nghỉ Dưỡng Cao Cấp</h3>
                    <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>Đáp ứng nhu cầu thư giãn, nghỉ dưỡng với các tour thiết kế đặc biệt tại các khu resort, spa sang trọng.</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Phần ảnh bên phải */}
            <div ref={addToRefs} className={`${styles.hidden} flex-auto p-4 my-0 flex justify-center`}>
              <img src="/about/about3.jpg" className="rounded-sm" alt="About"/>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    {/* Section 6 */}
    {/* CAM KẾT CỦA CHÚNG TÔI */}
    <Card className={`${styles['even-sec']}`}>
      <CardContent>
        <div className={`p-[2rem] bg-[#f5f7ff] m-auto my-[2rem] max-w-[1200px] shadow-lg rounded-lg`}>
          <h1 ref={addToRefs} className={`${styles.hidden} font-bold text-lg md:text-4xl text-[#3a56d6] text-left px-4 pb-6`}> Cam Kết Của Chúng Tôi</h1>
          <div className={`flex flex-col md:flex-row md:space-x-3`}>
            {/* Nội dung bên trái */}
            <div className={`flex-auto p-4`}>
              <div className={`flex flex-col space-y-5`}>
                <div className={`flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5`}> 
                  <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
                    <CardContent className='p-0'>
                      <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Uy Tín & Chuyên Nghiệp</h3>
                      <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>Chúng tôi luôn đặt chữ tín lên hàng đầu, cam kết cung cấp dịch vụ với tiêu chuẩn tốt nhất với những gì quý khách hàng bỏ ra.</p>
                    </CardContent>
                  </Card>
                  <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
                    <CardContent className='p-0'>
                      <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Trải Nghiệm Đa Dạng</h3>
                    <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>Ánh Trăng Xanh mang đến những hành trình phong phú, từ các chuyến phiêu lưu mạo hiểm đến các kỳ nghỉ thư giãn nhẹ nhàng.</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className={`bg-[#f2f3fa] p-6 shadow-lg border-0`}>
                  <CardContent className='p-0'>
                    <h3 ref={addToRefs} className={`${styles.hidden} text-[#3a56d6] font-semibold text-md md:text-[1.5rem] mb-2`}>Hỗ Trợ 24/7</h3>
                    <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>Chúng tôi luôn sẵn sàng hỗ trợ và đồng hành cùng khách hàng trong suốt chuyến đi, đảm bảo mọi yêu cầu và thắc mắc được giải quyết kịp thời.</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Phần ảnh bên phải */}
            <div ref={addToRefs} className={`${styles.hidden} flex-auto p-4 my-0 flex justify-center`}>
              <img src="/about/about2.jpg" className="rounded-sm" alt="About"/>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Section 7 */}
    {/* TRẢI NGHIỆM ÁNH SÁNG */}
    <Card className={`${styles['odd-sec']}`}>
      <CardContent>
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
      </CardContent>
    </Card>
    
    {/* Section 8 */}
    {/* CẢM ƠN */}
    <Card className={`${styles['even-sec']}`}>
        <CardContent>
      <div className={`p-[2rem] bg-[#f5f7ff] m-auto my-[2rem] max-w-[1200px] shadow-lg rounded-lg`}>
        {/* Tiêu đề lớn */}
        <h1 ref={addToRefs} className={`${styles.hidden} font-bold text-lg md:text-4xl text-[#3a56d6] text-left px-4 pb-6`}>LỜI CẢM ƠN</h1>

        {/* Nội dung 2 cột */}
        <div className={`flex flex-col md:flex-row md:space-x-1`}>
          {/* Cột bên trái */}
          <div className={`flex-1 p-4`}>
            <p ref={addToRefs} className={`${styles.hidden} text-[#555] font-medium text-sm md:text-base text-justify`}>
              Thay mặt Ban lãnh đạo và toàn thể cán bộ nhân viên Công ty Ánh Trăng Xanh, chúng tôi xin trân trọng cảm ơn Quý khách đã dành thời gian quan tâm đến phần giới thiệu của chúng tôi. Ánh Trăng Xanh luôn mong muốn được đồng hành cùng Quý khách trong những chuyến hành trình ý nghĩa và mang lại những dịch vụ tốt nhất, đáp ứng mọi nhu cầu của Quý khách hàng.
            </p>
          </div>
        </div>
      </div>
    </CardContent>
      </Card>

    {/* Section 9 */}
    {/* LIÊN HỆ VỚI CHÚNG TÔI*/}
    <Card className={`${styles['odd-sec']}`}>
      <CardContent>
        <SectionTextImage
          titleRef={addToRefs}
          leftRef={addToRefs}
          rightRef={addToRefs}
          titleStyle={styles.hidden}
          leftStyle={styles.hidden}
          rightStyle={styles.hidden}
          title="Liên Hệ Với Chúng Tôi"
          leftContent='Hãy liên hệ với chúng tôi để bắt đầu hành trình trọn niềm vui của bạn ngay hôm nay! Chúng tôi rất mong nhận được sự quan tâm, góp ý và phản hồi từ Quý khách để không ngừng hoàn thiện chất lượng dịch vụ.'
          rightContent="/about/contact.jpg"
          />
      </CardContent>
    </Card>
    </div>
  );
}

export default AboutPage;

