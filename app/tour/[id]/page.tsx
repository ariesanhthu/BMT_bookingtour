'use client'

// UI
import { CalendarDays, MapPin, Users, Clock, DollarSign, Utensils, Hotel, Plane } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// react
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// API
import axios from 'axios';

// COMPONENT CONTENT
import TourTimeline from '@/app/components/content/TourTimeline'
import TourPolicies from '@/app/components/content/TourPolicies'

// image upload
import Image from 'next/image'
// ---------------------------

import { productProps } from '@/app/interface'
import { set } from 'mongoose'

type TimeOfDay = 'buổi sáng' | 'buổi trưa' |'buổi chiều' | 'buổi tối';

interface TourStop {
    day: number;
    timeOfDay: TimeOfDay;
    time?: string | null;
    place: string;
    description?: string | null;
    image: string;
  }
export default function TourDetailPage() {

  const [product, setProduct] = useState<productProps>();

    const { id } = useParams();
  // In a real application, you would fetch this data based on the tour ID
  const tours = [
    {
        id: '1',
        name: 'DU LỊCH ĐÀ LẠT – THÀNH PHỐ NGÀN HOA',
        category: 'Miền Nam',
        url: '/dalat/dalat.jpg',
        duration: '3 ngày 3 đêm',
        groupSize: '10+',
        price: "2.839.000",
        rating: 4.8,
        reviewCount: 124,
        description: 'Khám phá vẻ đẹp thơ mộng của Đà Lạt, thành phố ngàn hoa với tour du lịch hấp dẫn.',
        highlights: [
          'Đón bình minh tại thiên đường săn mây.',
          'Tham quan Chùa Linh Phước.',
          'Nông Trại Cún - Puppy Farm.',
          'Tham quan và vui chơi tại Mongo Land.',
          'Tham quan Thiền Viện Trúc Lâm, Quảng Trường Lâm Viên.',
          'Cafe Xóm Lèo.',
          'Thác Pongour Đà Lạt – Nam Thiên Đệ Nhất Thác.',
        ],
        included: ['Chi phí vận chuyển', 'Ăn theo chương trình', 'Nước suối : 1 chai/khách/ngày ', 'Khách sạn tiêu chuẩn: 2 sao 2-3 người/phòng ', 'Vé tham quan', "Hướng dẫn viên"],
        notIncluded: ['Hóa đơn VAT, không áp dụng lễ, Tết', 'Chí phí cá nhân ngoài chương trình'],
        tourData: [
            {
              day: 1,
              timeOfDay: 'buổi sáng',
              time: '20:00',
              place: ' CẦN THƠ – ĐÀ LẠT',
              description: 'Xe và Hướng dẫn viên đón quý khách tại điểm hẹn. Xe khởi hành, bắt đầu hành trình Tour đến thành phố Ngàn Hoa Đà Lạt. ',
              image: '/servicetour.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Ăn sáng tại nhà hàng.',
              description: null,
              image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'ĐÀ LẠT – SĂN MÂY ĐỒI CHÈ CẦU ĐẤT',
              description: 'Đón bình minh tại thiên đường săn mây.',
              image: '/dalat/dalat4.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi trưa',
              time: "14:00",
              place: 'Dùng cơm trưa - di chuyển về khách sạn',
              description: 'Đoàn dùng cơm trưa tại nhà hàng, di chuyển đến khách sạn nhận phòng nghỉ ngơi.',
              image: 'https://plus.unsplash.com/premium_photo-1674147611212-4d7ede62638c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
              day: 2,
              timeOfDay: 'buổi chiều',
              time: null,
              place: 'Nông Trại Cún - Puppy Farm',
              description: 'Đến với Puppy Farm bạn sẽ được hòa mình trong thế giới đầy thú vị của những chú cún. Với diện tích rộng lớn nên nông trại cún Puppy Farm Đà Lạt còn có những cánh đồng hoa rộng lớn và vườn nông sản công nghệ cao: Vườn cà chua cherry đủ màu và đủ loại, Vườn dâu Tây treo công nghệ, Vườn dưa pepino (dưa hấu nam mỹ) Vườn cây nguyên sinh nhiệt đới , vườn sen đá + xương rồng đủ loại , Đồi hoa lavender, cánh bướm, Cẩm Tú cầu...v.v..... Đặt biệt hái dâu tại vườn với quy mô lớn (tự túc phí hái dâu). ',
              image: '/dalat/dalat7.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi tối',
              time: null,
              place: 'Nông Trại Cún - Puppy Farm',
              description: 'Đến với Puppy Farm bạn sẽ được hòa mình trong thế giới đầy thú vị của những chú cún. Với diện tích rộng lớn nên nông trại cún Puppy Farm Đà Lạt còn có những cánh đồng hoa rộng lớn và vườn nông sản công nghệ cao: Vườn cà chua cherry đủ màu và đủ loại, Vườn dâu Tây treo công nghệ, Vườn dưa pepino (dưa hấu nam mỹ) Vườn cây nguyên sinh nhiệt đới , vườn sen đá + xương rồng đủ loại , Đồi hoa lavender, cánh bướm, Cẩm Tú cầu...v.v..... Đặt biệt hái dâu tại vườn với quy mô lớn (tự túc phí hái dâu). ',
              image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
            },
            {
              day: 2,
              timeOfDay: 'buổi tối',
              time: null,
              place: 'Quý khách dùng cơm Tối tại Nhà hàng, tự do khám phá chợ đêm Đà Lạt',
              description: '•	Giao lưu cồng chiêng Tây Nguyên (Chi phí tự túc). •	Đoàn nghỉ đêm tại Đà lạt.',
              image: '/dalat/cho-dem-da-lat-2.jpg',
            },
            {
              day: 3,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Ăn sáng tại nhà hàng.',
              description: null,
              image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',    
              },
            {
              day: 3,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'MONGO LAND – TIỂU MÔNG CỔ TẠI ĐÀ LẠT',
              description: 'Quý khách Di chuyển đến tham quan và vui chơi tại Mongo Land Đà Lạt là một địa điểm tham quan hiện đang thu hút sự quan tâm và tới lui của nhiều du khách. Không chỉ là một điểm đến thông thường, Mongo Đà Lạt còn mang đến một trải nghiệm hoàn toàn mới lạ. Tới đây bạn sẽ được khám phá một không gian thảo nguyên rộng lớn với sự đa dạng của tự nhiên và vô số tiểu cảnh tạo điểm đặc biệt là những người thích được hoà mình vào thiên nhiên. Khuôn viên rộng lớn của Mongo Land Đà Lạt tận hưởng bầu không khí mênh mông của đồi núi và thảo nguyên xanh ngắt. Điểm đặc biệt ở đây là những chiếc lều Mông Cổ rực rỡ và những chiếc cối xay gió truyền thống. Mỗi góc nhìn đều đưa bạn vào một thế giới nông trại thu nhỏ với sắc màu đa dạng, xen kẽ giữa vẻ đẹp tự nhiên to lớn. ',
              image: '/dalat/dalat6.jpg',
            },
            {
              day: 3,
              timeOfDay: 'buổi trưa',
              time: null,
              place: 'Dùng cơm trưa, nghỉ ngơi.',
              description: '•	Đoàn dùng cơm trưa tại nhà hàng.  •	Đoàn di chuyển về khách sạn nghỉ ngơi.',
              image: 'https://plus.unsplash.com/premium_photo-1674147611212-4d7ede62638c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
              day: 3,
              timeOfDay: 'buổi chiều',
              time: null,
              place: 'Thiền Viện Trúc Lâm.',
              description: 'Đến đây, du khách như trút bỏ hết ưu tư, phiền muộn, thiện viện mang đến một cảnh quan thanh khiết tuyệt vời. Du khách dâng hương, cầu xin an bình, may mắn.Vẻ đẹp Phật giáo hài hòa cùng thiên nhiên và muôn sắc hoa. Rất nhiều loài hoa đẹp và quý hiếm như Sim Tím, bông Gòn úc, Phù Dung...khiến khung cảnh càng thêm thơ mộng. ',
              image: '/dalat/dalat8.jpg',
            },
            {
              day: 3,
              timeOfDay: 'buổi chiều',
              time: null,
              place: 'Quảng Trường Lâm Viên ',
              description: 'Biểu tượng của thành phố. Trở thành điểm dừng chân của hàng ngàn du khách mỗi khi đặt chân đến thành  phố ngàn hoa.',
              image: '/dalat/dalat1.jpg',
            },
            {
              day: 3,
              timeOfDay: 'buổi chiều',
              time: null,
              place: 'Quán cafe Xóm Lèo ',
              description: 'Hoà mình vào khung cảnh thơ mộng, bao quát những đồi thông xanh mướt, thung lũng mờ sương và dãy núi xa xăm ẩn hiện trong ánh nắng. Không gian yên bình, hòa quyện với thiên nhiên, tạo cảm giác thư thái và gần gũi. Đây là điểm lý tưởng để ngắm hoàng hôn và tận hưởng không khí se lạnh đặc trưng của Đà Lạt.',
              image: '/dalat/dalat9.jpg',
            },
            {
              day: 3,
              timeOfDay: 'buổi tối',
              time: null,
              place: 'Quý khách tự do dùng buổi tối, tận hưởng ẩm thực địa phương tại Đà Lạt.',
              description: 'Quý khách tự do khám phá mua sắm đặc sản tại chợ đêm Đà Lạt. Đoàn di chuyển về khách sạn nghỉ ngơi.',
              image: '/dalat/cho-dem-da-lat-2.jpg',
            },
            {
              day: 4,
              timeOfDay: 'buổi sáng',
              time: '6:30',
              place: 'Quý khách dùng điểm tâm sáng tại khách sạn. Trả phòng.',
              description: 'Quý khách tự do khám phá mua sắm đặc sản tại chợ đêm Đà Lạt. Đoàn di chuyển về khách sạn nghỉ ngơi.',
              image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',    
            },
            {
                day: 4,
                timeOfDay: 'buổi sáng',
              time: null,
              place: 'Thác Pongour Đà Lạt – Nam Thiên Đệ Nhất Thác.',
              description: 'Thác có chiều cao hơn 40m và độ rộng lên đến 100m, ấn tượng hơn cả là dòng thác chảy qua 7 bậc ghềnh đá chông chênh, cái tên thác 7 tầng cũng từ đó mà có. Bên dưới chân thác là một hệ thống phiến đá rộng được hình thành từ thời tiền cổ. Du khách như hòa mình vào với phong cảnh thiên nhiên núi rừng. Dòng chảy của thác trắng xóa nối tiếp nhau chảy xuống từng tầng thác như dải lụa mềm mại vắt qua những phiến đá. Nước đổ xuống thác tạo thành mặt hồ xanh biếc mát lạnh tạo ra bầu không khí mát mẻ, trong lành và đầy sức sống cho vùng đất này. ',
              image: '/dalat/dalat10.jpg',
            },
              {
              day: 4,
              timeOfDay: 'buổi trưa',
              time: null,
              place: 'Đoàn dùng cơm và di chuyển về Cần Thơ',
              description: 'Trên đường về Đoàn dùng cơm chiều tại nhà hàng sau đó tiếp tục hành trình. Kết thúc chương trình tham quan Đà Lạt 3 ngày 3 đêm và hẹn gặp lại du khách trong chuyến hành trình tiếp theo.',
              image: '/servicetour.jpg',    
              },
          ],
    },
    {
        id: '2',
        name: 'DU LỊCH NAM DU - VẺ ĐẸP HOANG SƠ',
        category: 'Miền Nam',
        url: '/namdu/namdu1.jpg',
        duration: '2 ngày 1 đêm',
        groupSize: '10+',
        price: "2.139.000 - 2.379.000",
        rating: 4.9,
        reviewCount: 124,
        description: 'Đảo Nam Du Phú Quốc là một hòn đảo xinh đẹp thuộc vùng biển Kiên Giang và là điểm đến cực hot thu hút đông đảo du khách bởi cảnh sắc hoang sơ, không gian yên tĩnh, thức ăn ngon cùng chi phí hợp lý.',
        highlights: [
            'Khám phá Nam Du: vừa tắm biển vừa câu cá, vừa lặn nhum và bắt ốc',
            'HÒN MẤU để tắm biển hay ghé qua BA HÒN NỒM tham quan.',
            'Ăn tối với buổi tiệc BBQ',
            'Ăn sáng với các món ăn đặc trưng của Nam Du: Cháo mực, bún cá, bún chả cá, bánh canh chả cá, bún mắm...',
            'Di chuyển tham quan bằng xe gắn máy, 2 người/xe',
            'BÃI ĐẤT ĐỎ, DỐC ÂN TÌNH: nhìn được toàn cảnh Nam Du',
            'BÃI CÂY MẾN',
        ],
        included: ['Chi phí di chuyển', 'Ăn theo chương trình', 'Nước suối : 2 chai/khách/ngày ', 'Khách sạn tiêu chuẩn: 2 sao (2-4 người/phòng máy lạnh)', 'Vé tham quan', "•	Xe máy đi tham quan quanh đảo 1 ngày", "Hướng dẫn viên", "Bảo hiểm: 20.000.000 vnđ/người/ngày."],
        notIncluded: ['Hóa đơn VAT, không áp dụng lễ, Tết', 'Chí phí cá nhân ngoài chương trình'],
        tourData: [
            {
              day: 1,
              timeOfDay: 'buổi sáng',
              time: '3:00',
              place: 'VỊ THANH – RẠCH GIÁ – NAM DU',
              description: 'Xe và Hướng dẫn đón khách tại điểm hẹn, khởi hành đi TP. Rạch Giá. ',
              image: '/servicetour.jpg',
            },
            {
              day: 1,
              timeOfDay: 'buổi sáng',
              time: '5:00',
              place: 'Ăn sáng tại nhà hàng.',
              description: "Quý khách ăn sáng tại nhà hàng, sau đó xuống bến tàu Rạch Giá làm thủ tục lên tàu khởi hành đi Đảo Nam Du (tàu chạy khoảng 02h30 phút là đến Nam Du)",
              image: '/namdu/namdu4.png',
            },
            {
              day: 1,
              timeOfDay: 'buổi chiều',
              time: "13:00",
              place: 'Tham quan Nam Du ',
              description: 'HDV sẽ đưa Quý khách xuống tàu tham quan để câu cá giữa biển, tham quan bè cá, lặn ngắm san hô. Quý khách có thể vừa tắm biển vừa câu cá, vừa lặn nhum và bắt ốc... ',
              image: '/namdu/namdu5.jpg',
            },
            {
              day: 1,
              timeOfDay: 'buổi chiều',
              time: "17:00",
              place: 'Hòn Mấu - Ba Hòn Nồm',
              description: 'Đoàn di chuyển qua HÒN MẤU để tắm biển hay ghé qua BA HÒN NỒM tham quan. ',
              image: '/namdu/namdu6.jpg',
            },
            {
              day: 1,
              timeOfDay: 'buổi chiều',
              time: "18:00",
              place: 'Tiệc BBQ',
              description: 'Đoàn trở về hòn và ăn tối với buổi tiệc BBQ như: Cá nướng, ốc nướng, tôm nướng, sò nướng,...(có thêm món ăn với cơm), toàn là những món đặc sản của NAM DU. ',
              image: 'https://plus.unsplash.com/premium_photo-1661777712373-9a9ee6e01007?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
              day: 1,
              timeOfDay: 'buổi tối',
              time: null,
              place: 'Quý khách tự do khám phá Đảo Nam Du về đêm.',
              description: null,
              image: '/namdu/hon-ngang-nam-du-dem.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Ăn sáng',
              description: 'Đoàn ăn sáng với các món ăn đặc trưng của Nam Du như: Cháo mực, bún cá, bún chả cá, bánh canh chả cá, bún mắm...',
              image: '/namdu/chaomuc.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: '8:00',
              place: 'Tham quan bằng xe gắn máy',
              description: 'HDV sẽ hướng dẫn Quý khách đường đi quanh hòn để ngắm toàn cảnh của NAM DU vào ban ngày, ngắm cảnh và chụp ảnh lưu niệm ghi dấu ấn tại NAM DU. (di chuyển tham quan bằng xe gắn máy, 2 người/xe)',
              image: '/namdu/namdu3.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: '8:30',
              place: 'BÃI ĐẤT ĐỎ, DỐC ÂN TÌNH',
              description:'nơi những đôi yêu nhau hay hẹn hò, nơi đẹp nhất tại NAM DU có thể nhìn được toàn Nam Du',
              image: '/namdu/namdu7.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: '9:30',
              place: 'BÃI CÂY MẾN',
              description:'Một trong những bãi biển đẹp của quần đảo Nam Du, bãi cát trắng, có hàng dừa cao xanh mát, cuốn hút du khách bởi hình dáng của một vùng vịnh nhỏ vắng vẻ',
              image: '/namdu/namdu8.png',
            },
            {
              day: 2,
              timeOfDay: 'buổi trưa',
              time: null,
              place: 'Nghỉ ngơi, làm thủ tục trả phòng. Đoàn dùng cơm trưa.',
              description: null,
              image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',
            },
            {
              day: 2,
              timeOfDay: 'buổi chiều',
              time: "14:15",
              place: 'Đoàn xuống tàu Superđong về lại đất liền',
              description: null,
              image: '/namdu/namdu4.png',
            },
            {
              day: 2,
              timeOfDay: 'buổi chiều',
              time: "17:00",
              place: 'Cơm tối',
              description: 'Về đến Rạch Giá, xe đón Quý khách dùng cơm tối.',
              image: '/namdu/namdu4.png',
            },
            {
                day: 2,
                timeOfDay: 'buổi tối',
                time: "18:00",
                place: 'Về lại điểm đón',
                description: 'Xe đưa Quý khách về điểm đón ban đầu, kết thúc chương trình tham quan ĐẢO NAM DU, hẹn ngày gặp lại Quý khách! ',
                image: '/dinner.jpg',
              }
          ],
    },
    {
        id: '3',
        name: 'DU LỊCH HÒN SƠN – THIÊN NHIÊN TƯƠI ĐẸP',
        category: 'Miền Nam',
        url: '/honson/honson.jpg',
        duration: '2 ngày 1 đêm',
        groupSize: '10+',
        price: "2.239.000 - 2.679.000",
        rating: 4.9,
        reviewCount: 128,
        description: 'Hòn Sơn đang trở thành một địa điểm được nhiều du khách săn đón, đề khám phá một viên ngọc giữa biển đảo Kiên Giang. Với vẻ đẹp hoang sơ, cảnh quan núi non hùng vĩ và những món ngon bình dị hấp dẫn và những con người thân thiện mến khách. Bạn sẽ có một kỳ nghỉ dưỡng lý thú, tận hưởng cảm giác bình yên và mộc mạc khi được hoà mình vào thiên nhiên biển đảo miền Tây.',
        highlights: [
            'Khám phá Nam Du: vừa tắm biển vừa câu cá, vừa lặn nhum và bắt ốc',
            'HÒN MẤU để tắm biển hay ghé qua BA HÒN NỒM tham quan.',
            'Ăn tối với buổi tiệc BBQ',
            'Ăn sáng với các món ăn đặc trưng của Nam Du: Cháo mực, bún cá, bún chả cá, bánh canh chả cá, bún mắm...',
            'Di chuyển tham quan bằng xe gắn máy, 2 người/xe',
            'BÃI ĐẤT ĐỎ, DỐC ÂN TÌNH: nhìn được toàn cảnh Nam Du',
            'BÃI CÂY MẾN',
        ],
        included: ['Chi phí di chuyển', 'Ăn theo chương trình', 'Nước suối : 1 chai/khách/ngày', 'Khách sạn tiêu chuẩn: 2 sao (2-4 người/phòng máy lạnh)', 'Vé tham quan', "Xe máy tại Hòn Sơn", "Tàu câu", "Hướng dẫn viên"],
        notIncluded: ['Hóa đơn VAT, không áp dụng lễ, Tết', 'Chí phí cá nhân ngoài chương trình', "Giặt ủi"],
        tourData: [
            {
              day: 1,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Khởi hành',
              description: 'Xe và Hướng dẫn viên  đón quý khách tại điểm hẹn. Xe khởi hành, bắt đầu hành trình Tour đến thành phố Biển Tây Nam Rạch Giá.',
              image: '/servicetour.jpg',
            },
            {
              day: 1,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Lại Sơn',
              description: "Đến với Lại Sơn quý khách di chuyển về khách sạn gởi đồ và hành lý, nhận xe gắn máy (2 người/xe). Quý đoàn với Bãi Xếp check-in với cây dừa nằm độc đáo thư giãn, đoàn đến với Miếu Bà Cố Chủ lễ bà, người được người dân quý trọng và tôn kính được xây miếu thờ tự.",
              image: '/honson/honson4.jpg',
            },
            {
              day: 1,
              timeOfDay: 'buổi trưa',
              time: null,
              place: 'Cơm trưa',
              description: 'Đoàn dùng cơm trưa tại nhà hàng. Di chuyển đến khách sạn nhận phòng nghỉ ngơi.',
              image: '/honson/honson6.jpg',
            },
            {
              day: 1,
              timeOfDay: 'buổi chiều',
              time: "14:30",
              place: 'Ra khơi câu cá, ngắm san hô và đến với Bãi Bàng',
              description: 'Quý khách lên tàu ra khơi câu cá, ngắm san hô và đến với Bãi Bàng, tắm biển vui chơi, ăn uống, hòa mình vào làn nước mát trong xanh. ',
              image: '/honson/honson5.jpg',
            },
            {
              day: 1,
              timeOfDay: 'buổi chiều',
              time: "16:30",
              place: 'Về lại khách sạn - dùng cơm chiều',
              description: "Đoàn dùng cơm chiều với các món Hải Sản được nướng bằng than hồng đầy hấp dẫn. như Mực nướng, sò nướng, cá nướng, nhum nướng, tôm hấp, lẩu hải sản, gỏi,.. ",
              image: '/honson/honson6.jpg',
            },
            {
              day: 1,
              timeOfDay: 'buổi tối',
              time: null,
              place: 'Đoàn nghỉ đêm tại Hòn Sơn, khám phá xã Đảo về đêm, quý khách có thể trải nghiệm câu mực đêm (chi phí tự túc).',
              description: null,
              image: '/namdu/hon-ngang-nam-du-dem.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Ăn sáng',
              description: 'Quý khách dùng điểm tâm sáng tại nhà hàng.',
              image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Dinh Cá Ông',
              description: 'Nơi thờ của Nam Hải Đại Tướng Quân, lưu niệm với nhiều góc hình đẹp của Bãi Thiên Tuế.',
              image: '/honson/le-nghinh-ong-va-tham-mieu-ba-co-chu-o-hon-son-hpCs.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Rùa Đá',
              description:'Điểm check-in không thể thiếu khi đến với Hòn Sơn.',
              image: '/honson/honson3.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Dốc Yên - Ngựa đường xuyên Đảo',
              description:'Thác Nước khung cảnh tuyệt đẹp trên đường chinh phục dốc Yên - Ngựa đường xuyên Đảo.',
              image: '/namdu/namdu8.png',
            },
            {
              day: 2,
              timeOfDay: 'buổi sáng',
              time: null,
              place: 'Bãi Bàng',
              description: "Bãi Bàng, quý khách thỏa thích đắm mình vào làn nước biển tươi mát. Là bãi biển đẹp của xã Đảo.",
              image: '/honson/honson2.jpg',
            },
            {
              day: 2,
              timeOfDay: 'buổi trưa',
              time: '10:00',
              place: 'Cơm trưa',
              description: "Đoàn dùng cơm trưa tại nhà hàng.",
              image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',
            },
            {
              day: 2,
              timeOfDay: 'buổi trưa',
              time: "12:00",
              place: 'Về lại đất liền',
              description: "Di chuyển đến bến tàu khởi hành về lại Rạch Giá với chuyến tàu lúc. Đến với bến Cảng Rạch Giá đoàn khởi hành về lại Vị Thanh tạm khép lại chương trình tham quan và du lịch.",
              image: '/honson/honson1.jpg',
            },
          ],
    },
    {
      id: '6',
      name: 'DU LỊCH HÀ NỘI – HẠ LONG – NINH BÌNH - SAPA',
      category: 'Miền Bắc',
      url: '/mienbac/mienbac.jpg',
      duration: '5 ngày 4 đêm',
      groupSize: '10+',
      price: "6.979.000 - 7.279.000",
      rating: 4.6,
      reviewCount: 268,
      description: 'Hòn Sơn đang trở thành một địa điểm được nhiều du khách săn đón, đề khám phá một viên ngọc giữa biển đảo Kiên Giang. Với vẻ đẹp hoang sơ, cảnh quan núi non hùng vĩ và những món ngon bình dị hấp dẫn và những con người thân thiện mến khách. Bạn sẽ có một kỳ nghỉ dưỡng lý thú, tận hưởng cảm giác bình yên và mộc mạc khi được hoà mình vào thiên nhiên biển đảo miền Tây.',
      highlights: [
        'Đền Hùng - Phú Thọ.',
        'Bản Cát Cát.',
        'Chinh phục đỉnh Fansipan',
        'Đền Mẫu Thượng Sapa, chợ Cốc Lếu',
        'Tràng An – khu du lịch nằm trong quần thể danh thắng Tràng An đã được UNESCO công nhận di sản hỗn hợp đầu tiên của Việt Nam và khu vực Đông Nam Á.',
        'Tham quan Quần thể Du lịch - Giải trí Sun World Hạ Long Park',
        'Du ngoạn Vịnh Hạ Long - một trong 7 kỳ quan thiên nhiên mới của thế giới, chiêm ngưỡng động Thiên Cung, các hòn Đỉnh Hương - Trống Mái (Gà Chọi) - Chó Đá.',
        'Dạo quanh Hồ Hoàn Kiếm, tham quan “36 phố phường” ',
        'Viếng lăng Chủ tịch Hồ Chí Minh.',
        'Thăm Văn Miếu Quốc Tử Giám, viếng Chùa Một Cột, Khu di tích Phủ Chủ tịch',
      ],
      included: ['Chi phí di chuyển', 'Ăn theo chương trình', 'Nước suối : 2 chai/khách/ngày', 'Khách sạn tiêu chuẩn', 'Vé tham quan', "Hướng dẫn viên"],
      notIncluded: ['Hóa đơn VAT, không áp dụng lễ, Tết', 'Vé máy bay', 'Chí phí cá nhân ngoài chương trình', "Giặt ủi"],
      tourData: [
          {
            day: 1,
            timeOfDay: 'buổi sáng',
            time: '11:00',
            place: 'Khởi hành',
            description: 'Xe và Hướng dẫn viên  đón quý khách tại điểm hẹn. Xe khởi hành đến với thành phố Cần Thơ Xe và HDV đưa quý khách đến Ga đi Sân bay Cần Thơ. Làm thủ tục bay đến Thủ đô Hà Nội (chuyến bay 6h10 – 8h20)',
            image: '/servicetour.jpg',
          },
          {
            day: 1,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Dùng bữa sáng',
            description: "Đáp xuống sân bay Nội Bài xe đón đoàn đi dùng bữa sáng. Đoàn khởi hành đi Sapa theo tuyến đường cao tốc Nội Bài – Lào Cai. Trên đường đi, chiêm ngưỡng vẻ đẹp hùng vĩ của dãy Hoàng Liên Sơn.",
            image: '/mienbac/mienbac.jpg',
          },
          {
            day: 1,
            timeOfDay: 'buổi trưa',
            time: null,
            place: 'Đền Hùng - Phú Thọ',
            description: 'Là nơi hội tụ những giá trị văn hóa tâm linh sâu sắc của cộng đồng dân tộc Việt Nam trong suốt chiều dài lịch sử. Điều này thể hiện hết sức cụ thể, sinh động thông qua tín ngưỡng thờ cúng Hùng Vương và lễ hội Đền Hùng. Đền Trung ở Đền Hùng còn gọi là Hùng Vương Tổ miếu được tương truyền là nơi các Vua Hùng ngắm cảnh và luận bàn việc nước cùng chư vị Lạc hầu, Lạc tướng. Đây cũng chính là nơi gắn liền với sự tích vua Hùng thứ 6 truyền ngôi cho Lang Liêu – vị hoàng tử đã làm ra bánh chưng bánh dày.',
            image: '/mienbac/mienbac4.jpg',
          },
          {
            day: 1,
            timeOfDay: 'buổi trưa',
            time: "14:30",
            place: 'Đoàn dùng cơm trưa tại nhà hàng. Và tiếp tục khởi hành đến Sapa.',
            description: null,
            image: null,
          },
          {
            day: 1,
            timeOfDay: 'buổi chiều',
            time: null,
            place: 'Bản Cát Cát',
            description: "Thưởng ngoạn cảnh sắc núi non hữu tình của vùng cao. Mỗi đoạn đường mở ra một bức tranh thiên nhiên hùng vĩ, nơi dãy núi cao vút chạm vào mây trời, còn bên dưới là thung lũng Sapa thơ mộng với những cánh đồng bậc thang xanh mướt trải dài.",
            image: '/mienbac/mienbac5.jpg',
          },
          {
            day: 1,
            timeOfDay: 'buổi tối',
            time: null,
            place: 'Đoàn dùng cơm tại nhà hàng. Khám phá Sa Pa về đêm.',
            description: "Khi mặt trời lặn, thị trấn nhỏ chìm trong làn sương mờ ảo, tạo nên không khí huyền bí và lãng mạn.",
            image: '/mienbac/mienbac6.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Quý khách dùng điểm tâm sáng tại nhà hàng.',
            description: null,
            image: null,
          },
          {
            day: 2,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Nhà ga cáp treo Fansipan',
            description: 'Quý khách tự do tham quan khu vực vườn hoa, chợ phiên, mua sắm, trải nghiệm cáp treo, chinh phục đỉnh Fansipan với hệ thống cáp treo 3 dây hiện đại với cảm giác đi giữa biển mây. Viếng khu tâm linh Fanpsian, vượt gần 600 bậc thang, chinh phục “Nóc nhà Đông Dương” – đỉnh Fansipan 3,143m. Cột mốc Fansipan cột cờ trên đỉnh Fansipan là điểm check-in được ưa chuộng nhất để lưu giữ kỷ niệm trên nóc nhà Đông Dương. ',
            image: '/mienbac/mienbac7.jpg',
          },
          
          {
            day: 2,
            timeOfDay: 'buổi trưa',
            time: null,
            place: 'Dùng Buffet trưa ở Fansipan.',
            description:null,
            image: null,
          },
          {
            day: 2,
            timeOfDay: 'buổi chiều',
            time: null,
            place: 'Đền Mẫu Thượng Sapa ',
            description:'Là một ngôi đền rất thiêng đã có từ lâu đời với kiến trúc cổ kính, trang nghiêm. Đền Mẫu Thượng Sapa hàng năm thu hút hàng vạn du khách tới tham quan, chiêm bái…Đền Mẫu Thượng Sapa thờ Công chúa Liễu Hạnh – một trong 4 vị tứ bất tử được nhân dân tôn vinh theo quan niệm của người Việt Nam.',
            image: '/mienbac/mienbac8.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi chiều',
            time: null,
            place: 'Chợ Cốc Lếu',
            description: "Mang trong mình nét đẹp văn hóa lâu đời. Nơi đây bán các mặt hàng phong phú, đa dạng mẫu mã với giá cả vô cùng phải chăng",
            image: '/mienbac/mienbac8.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi chiều',
            time: '10:00',
            place: 'Đoàn khởi hành đi Ninh Bình. Đoàn dùng cơm chiều tại nhà hàng và nhận phòng khách sạn nghỉ ngơi.',
            description: null,
            image: null,
          },
          {
            day: 2,
            timeOfDay: 'buổi tối',
            time: null,
            place: 'Xe đưa Quý khách đến nhà hàng dùng cơm tối. Quý khách nghỉ đêm tại Ninh Bình.',
            description: null,
            image: null,
          },
          {
            day: 3,
            timeOfDay: 'buổi sáng',
            time: '7:00',
            place: 'Quý khách dùng điểm tâm sáng tại nhà hàng. Khởi hành đi tham quan Tràng An',
            description: "khu du lịch nằm trong quần thể danh thắng Tràng An đã được UNESCO công nhận di sản hỗn hợp đầu tiên của Việt Nam và khu vực Đông Nam Á (đạt cả hai tiêu chí về văn hóa và thiên nhiên) vào ngày 25/6/2014, tham quan Ngôi Làng Thổ Dân, viếng Chùa Bái Đính nằm trên dãy núi Tràng An. Chùa có lịch sử hình thành từ thời Đinh nhưng vẫn có nhiều chi tiết kiến trúc và cổ vật mang dấu ấn đậm nét của thời Lý.",
            image: '/mienbac/mienbac9.jpg',
          },
          {
            day: 3,
            timeOfDay: 'buổi trưa',
            time: null,
            place: 'Đoàn dùng cơm trưa tại nhà hàng. Đoàn khởi hành đi TP. Hạ Long.',
            description: null,
            image: null,
          },
          {
            day: 3,
            timeOfDay: 'buổi tối',
            time: null,
            place: 'Xe đưa Quý khách đến nhà hàng dùng cơm tối. Quý khách nghỉ đêm tại Ninh Bình.',
            description: null,
            image: null,
          },
          {
            day: 3,
            timeOfDay: 'buổi tối',
            time: null,
            place: 'Xe bus 2 tầng hoặc tham quan Quần thể Du lịch - Giải trí Sun World Hạ Long Park',
            description: "Quý khách có thể lựa chọn trãi nghiệm xe bus 2 tầng vừa khai thác từ 02/2023, chiêm ngưỡng cảnh quan trên trục đường ven biển thành phố Hạ Long. Hoặc tham quan Quần thể Du lịch - Giải trí Sun World Hạ Long Park, gồm 2 khu công viên vui chơi ven biển Bãi Cháy và trên núi Ba Đèo - được kết nối với nhau bởi hệ thống cáp treo vượt biển Nữ Hoàng đạt 2 kỷ lục thế giới (cabin có sức chứa lớn nhất thế giới và cáp treo có trụ cáp cao nhất thế giới so với mặt đất). Trải nghiệm trò chơi mạo hiểm, Vòng quay Mặt Trời - một trong những vòng quay cao nhất thế giới,.. (tự túc chi phí di chuyển & tham quan).",
            image: '/mienbac/vinhalong.jpg',
          },
          {
            day: 4,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Quý khách dùng điểm tâm sáng tại nhà hàng.',
            description: "8h00 Quý khách lên thuyền du ngoạn Vịnh Hạ Long - một trong 7 kỳ quan thiên nhiên mới của thế giới, chiêm ngưỡng động Thiên Cung, các hòn Đỉnh Hương - Trống Mái (Gà Chọi) - Chó Đá.",
            image: '/mienbac/vinhalong.jpg',
          },
          {
            day: 4,
            timeOfDay: 'buổi trưa',
            time: null,
            place: 'Đoàn dùng cơm trưa tại nhà hàng. Quý khách khởi hành về lại Hà Nội. Đoàn nhận phòng khách sạn nghỉ ngơi.',
            description: null,
            image: null,
          },
          {
            day: 4,
            timeOfDay: 'buổi chiều',
            time: null,
            place: 'Tự do dạo quanh Hồ Hoàn Kiếm, tham quan “36 phố phường”',
            description: "Khu phố cổ với những ngành nghề đặc trưng và truyền thống của cư dân Thủ đô.",
            image: "/mienbac/mienbac10.jpg",
          },
          {
            day: 4,
            timeOfDay: 'buổi tối',
            time: null,
            place: 'Đoàn dùng cơm tối tại nhà hàng, Đoàn nghỉ đêm tại Hà Nội.',
            description: null,
            image: null,
          },
          {
            day: 5,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Quý khách dùng điểm tâm sáng tại nhà hàng',
            description: null,
            image: null,
          },
          {
            day: 5,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Viếng lăng Chủ tịch Hồ Chí Minh. Thăm Văn Miếu Quốc Tử Giám, viếng Chùa Một Cột, Khu di tích Phủ Chủ tịch.',
            description: "Lăng Chủ tịch Hồ Chí Minh là nơi lưu giữ di hài của Bác và là điểm đến mà mỗi thế hệ người Việt đều mong mỏi viếng thăm để bày tỏ tình cảm và lòng biết ơn sâu sắc dành cho Bác.",
            image: '/mienbac/langbac.jpg',
          },
          {
            day: 5,
            timeOfDay: 'buổi trưa',
            time: null,
            place: 'Đoàn dùng cơm trưa tại nhà hàng. Sau buổi trưa, xe đưa đoàn đến sân bay Nội Bài làm thủ tục về lại Cần Thơ. Đến sân bay Cần Thơ, xe đón quý khách đi ăn chiều và quay lại điểm đón ban đầu. Kết thúc chương trình. Chào tạm biệt và hẹn gặp lại!',
            description: null,
            image: null,
          },
        ],
    },
    {
      id: '4',
      name: 'DU LỊCH PHÚ QUỐC – THÀNH PHỐ HOÀNG HÔN',
      category: 'Miền Bắc',
      url: '/phuquoc.jpg',
      duration: '3 ngày 2 đêm',
      groupSize: '10+',
      price: "3.339.000",
      rating: 4.6,
      reviewCount: 268,
      description: 'Thành phố biển Đảo Phú Quốc xinh đẹp.',
      highlights: [
          'Tham quan và thưởng thức rượu Sim, trại Rắn Đồng Tâm II ',
          'Thiền Viện Trúc Lâm(Chùa Hộ Quốc)',
          'Tham quan di tích lịch sử Nhà Tù Phú Quốc.',
          'Tham quan khu đô thị Hoàng Hôn bên bờ biển xinh đẹp và dạo bước chợ đêm Vui Phết.',
          'Tham quan xưởng nuôi cấy Ngọc trai',
          'Tắm biển ở Bãi Sao',
          'Khu du lịch Grand World',
          'Xem Show diễn thực cảnh đỉnh cao: "Sắc màu Venice"',
          'Dinh Cậu – Dinh Bà Thuỷ Long Thánh Mẫu',
      ],
      included: ['Chi phí di chuyển.', 'Ăn theo chương trình.', 'Nước suối : 1 chai/khách/ngày.', 'Khách sạn tiêu chuẩn 3 sao.', 'Vé tham quan, vé Tàu Cao Tốc Rạch Giá – Phú Quốc khứ hồi.', 'Bảo hiểm du lịch theo quy định: 30.000.000đ/người.',"Hướng dẫn viên."],
      notIncluded: ['Hóa đơn VAT, không áp dụng lễ, Tết', 'Vé máy bay', 'Vé  đi bộ dưới đáy biển, vé tham quan Cầu Hôn, vé xem show  Kiss the stars, vé đi thuyền trên sông sông Venice, bảo tàng gấu.', 'Chí phí cá nhân ngoài chương trình', "Giặt ủi"],
      tourData: [
          {
            day: 1,
            timeOfDay: 'buổi sáng',
            time: '3:00',
            place: 'Xe và Hướng dẫn viên đón quý khách tại điểm hẹn. Chào mừng các thành viên của đoàn đã tham gia Ngôi nhà chung Blue Moonlight Travel. Xe khởi hành, bắt đầu hành trình  đến Thành phố biển Đảo Phú Quốc xinh đẹp.',
            description: null,
            image: null,
          },
          {
            day: 1,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Quý khách dùng điểm tâm sáng tại nơi có tầm nhìn đẹp tại thành phố Rạch Giá. Quý khách lên tàu khởi hành đến với Phú Quốc với tàu cao tốc dự kiến chuyến 7h10 Rạch giá – Phú quốc.',
            description: null,
            image: null,
          },
          {
            day: 1,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Tham quan và thưởng thức rượu Sim, trại Rắn Đồng Tâm II',
            description: "Quý khách đến Phú Quốc Đoàn sẽ dừng điểm tham quan và thưởng thức rượu  rượu Sim và tìm hiểu nghề làm rượu trên đảo, mật Sim đậm hương vị và cân bằng lại sau thời gian trên Biển Tây Nam Tổ Quốc.Đến với Trại Rắn Đồng Tâm II tham quan và tìm hiểu về cách lấy nọc rắn.",
            image: '/phuquoc/phuquoc1.jpg',
          },
          {
            day: 1,
            timeOfDay: 'buổi trưa',
            time: "14:00",
            place: 'Đoàn dùng cơm trưa tại nhà hàng. Di chuyển đến khách sạn nhận phòng nghỉ ngơi.',
            description: null,
            image: null,
          },
          {
            day: 1,
            timeOfDay: 'buổi chiều',
            time: "15:30",
            place: 'Thiền Viện Trúc Lâm(Chùa Hộ Quốc)',
            description: "Chùa Hộ Quốc được xem như nơi hội tụ của “Đại danh thắng” trên Đảo Ngọc. Thiền viện Trúc Lâm Hộ Quốc còn biểu tượng cho nét đẹp của công trình tâm linh bởi sự hài hòa giữa sáng tạo của con người với thiên nhiên hoang sơ, hùng vĩ.",
            image: '/phuquoc/phuquoc4.jpg',
          },
          {
            day: 1,
            timeOfDay: 'buổi chiều',
            time: "16:30",
            place: 'Tham quan di tích lịch sử Nhà Tù Phú Quốc ',
            description: "Nơi từng giam giữ hơn 40 ngàn tù binh, một điểm tham quan ý nghĩa khi nơi đây chứng kiến thời gian đau thương của đất nước. ",
            image: '/phuquoc/nhatu.png',
          },
          {
            day: 1,
            timeOfDay: 'buổi tối',
            time: '18:00',
            place: 'Đoàn nghỉ đêm tại Hòn Sơn, khám phá xã Đảo về đêm, quý khách có thể trải nghiệm câu mực đêm (chi phí tự túc).',
            description: null,
            image: null,  
          },
          {
            day: 1,
            timeOfDay: 'buổi tối',
            time: '18:00',
            place: 'Đoàn ngắm pháo hoa biểu diễn tại Vịnh Hoàng Hôn xinh đẹp. Đoàn về lại khách sạn nghỉ ngơi.',
            description: null,
            image: '/phuquoc/phuquoc5.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Ăn sáng',
            description: 'Quý khách dùng điểm tâm sáng tại nhà hàng.',
            image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',
          },
          {
            day: 2,
            timeOfDay: 'buổi sáng',
            time: '7:30',
            place: 'Tham quan xưởng nuôi cấy Ngọc trai',
            description: 'Một điểm đến hấp dẫn cũng là nghề đã phát triển hơn 30 năm qua trên đất Đảo, nghề Ngọc trai tạo nên thương hiệu cho Đảo Phú Quốc là Đảo Ngọc xinh đẹp.',
            image: '/phuquoc/phuquoc6.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi sáng',
            time: '8:30',
            place: 'Tắm biển ở Bãi Sao',
            description: 'Bãi Sao Phú Quốc không chỉ nổi bật với bờ cát trắng mịn và làn nước xanh ngọc bích, mà còn là nơi lý tưởng để chiêm ngưỡng những chú sao biển rực rỡ nằm yên bình dưới làn nước trong veo. Thiên đường biển này mang đến vẻ đẹp hoang sơ và trải nghiệm khó quên.',
            image: '/phuquoc/phuquoc7.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi trưa',
            time: '11:00',
            place: 'Đoàn dùng cơm trưa tại nhà hàng. Đoàn di chuyển về khách sạn nghỉ ngơi.',
            description: null,
            image: null,
          },
          {
            day: 2,
            timeOfDay: 'buổi chiều',
            time: "15:30",
            place: 'Grand World',
            description: "Thành phố không ngủ.Công Trình Tre – làm từ 32.000 cây tre tầm vông; Việt Nam cổ trấn – Điểm check-in văn hoá Việt Nam chưa từng có tại Phú Quốc.",
            image: '/phuquoc/phuquoc8.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi tối',
            time: "18:00",
            place: 'Show diễn thực cảnh đỉnh cao: "Sắc màu Venice" ',
            description: "“xuyên không” đến Châu Âu thời trung cổ. Show diễn chính là điểm nhấn không thể bỏ qua khi đến với Grand World. Show diễn với các màn phối hợp giữa âm thanh, ánh sáng, âm nhạc, những trang phục rực rỡ cùng những con thuyền Gondola rực sáng nổi bậc trên dòng kênh. “Sắc màu Venice” sẽ đem đến cho bạn trải nghiệm thú vị cùng những phút giây đáng nhớ trong kỳ nghỉ tại đảo Ngọc.",
            image: '/phuquoc/phuquoc10.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi tối',
            time: '22:30',
            place: 'Xe đưa đoàn về trung tâm. Quý khách tự do tham quan. Đoàn nghỉ đêm tại Phú Quốc.',
            description: null,
            image: null,
          },
          {
            day: 3,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Quý khách dùng điểm tâm sáng tại nhà hàng.',
            description: null,
            image: null,
          },
          {
            day: 3,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Dinh Cậu – Dinh Bà Thuỷ Long Thánh Mẫu',
            description: "Biểu tượng tâm linh của người dân xứ đảo. Ngoài ra quý khách còn có thể mua những viên ngọc trai được nuôi cấy tại đây để làm quà lưu niệm; trung tâm đặc sản Phú Quốc ,… để làm quà cho người thân và bạn bè.",
            image: "/phuquoc/phuquoc11.jpg",
          },
          {
            day: 3,
            timeOfDay: 'buổi trưa',
            time: '13:10',
            place: 'Quý khách dùng cơm trưa và xe khởi hành  đưa đoàn ra bến tàu Phú Quốc lên tàu khởi hành về lại Cần Thơ trên chuyến tàu cao tốc dự kiến 13h10.',
            description: null,
            image: null,
          },
          {
            day: 3,
            timeOfDay: 'buổi chiều',
            time: '13:10',
            place: 'Đến Rạch Giá xe đón đoàn và khởi hành về lại Cần Thơ. Hướng dẫn viên thay mặt Công ty xin chào quý khách và hẹn gặp lại.',
            description: null,
            image: null,
          },
        ],
    },
    {
      id: '5',
      name: 'PHAN THIẾT – MŨI NÉ BIỂN XANH CÁT TRẮNG NẮNG VÀNG',
      category: 'Miền Nam',
      url: '/phanthiet/phanthiet.jpg',
      duration: '3 ngày 3 đêm',
      groupSize: '10+',
      price: "2.539.000 - 3.439.000",
      rating: 4.6,
      reviewCount: 268,
      description: 'Thành phố biển Đảo Phú Quốc xinh đẹp.',
      highlights: [
          'Tham quan Làng Mông Cổ Mian Farm',
          'Tham quan Bikini Beach, Mango Beach',
          'Tham quan Bàu Trắng - “tiểu sa mạc Sahara”',
          'Trải nghiệm ngắm HOÀNG HÔN vào lúc chiều tà và cảm giác mới lạ cùng với xe địa hình'
      ],
      included: ['Chi phí di chuyển.', 'Ăn theo chương trình.', 'Nước suối : 1 chai/khách/ngày.', 'Khách sạn tiêu chuẩn 3 sao.', 'Vé tham quan', 'Bảo hiểm du lịch theo quy định: 30.000.000đ/người.',"Hướng dẫn viên."],
      notIncluded: ['Hóa đơn VAT, không áp dụng lễ, Tết', 'Vé máy bay', 'Chí phí cá nhân ngoài chương trình', "Giặt ủi"],
      tourData: [
          {
            day: 1,
            timeOfDay: 'buổi tối',
            time: '21:00',
            place: 'Khởi hành',
            description: 'Xe và Hướng dẫn viên  đón quý khách tại điểm hẹn. Xe khởi hành, bắt đầu hành trình Tour đến thành phố Biển Phan Thiết ',
            image: '/servicetour.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Điểm tâm',
            description: null,
            image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',
          },
          {
            day: 2,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Tham quan Bikini Beach ',
            description: 'Quý khách di chuyển tham quan Bikini Beach sở hữu các iconic khổng lồ được đặt ở bãi biển dài nên du khách có cơ hội được “check – in” sống ảo với những góc hình độc đáo và mới lạ. Ngoài ra nơi này còn sở hữu khu quảng trường trung tâm rộng lớn với các hoạt động, sự kiện diễn ra vô cùng náo nhiệt để du khách có thể khám phá điển hình như Muscle Zone, khu tập gym Outdoor cùng các hoạt động thể thao khác được tổ chức ngoài trời.(khu vui chơi quý khách tự túc)',
            image: '/phanthiet/phanthiet4.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi trưa',
            time: "14:30",
            place: 'Dùng cơm trưa tại nhà hàng',
            description: 'Sau khi quý khách dùng cơm trưa Đoàn di chuyển đến khách sạn nhận phòng nghỉ ngơi. ',
            image: '/phanthiet/phanthiet1.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi chiều',
            time: null,
            place: 'Mango Beach',
            description: "Tọa lạc trên bãi rạng Mũi Né tuyệt đẹp, Mango Beach là nơi nghỉ dưỡng yêu thích của nhiều du khách. Tại Mango Beach, lắng nghe tiếng sóng vỗ rì rào và cảm nhận hơi gió mát lành sẽ mang lại sự bình yên, thoải mái lan tỏa trong từng hơi thở của bạn. Bên cạnh đó, cách bài trí những tiểu cảnh tại đây như xích đu, giường lưới, những hàng ghế cũng rất thông minh và tinh tế.",
            image: '/phanthiet/phanthiet5.jpg',
          },
          {
            day: 2,
            timeOfDay: 'buổi tối',
            time: null,
            place: 'Dùng cơm Tối tại Nhà hàng',
            description: null,
            image: '/namdu/hon-ngang-nam-du-dem.jpg',
          },
          {
            day: 3,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Ăn sáng',
            description: 'Quý khách dùng điểm tâm sáng tại nhà hàng.',
            image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',
          },
          {
            day: 3,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Bàu Trắng - “tiểu sa mạc Sahara”',
            description: 'Bàu Trắng được bao quanh bởi những đồi cát trắng hoang sơ mà thơ mộng, kỳ vĩ mà yên bình. Du khách đứng trước những đồi cát trắng nối tiếp nhau được bao quanh bởi một hồ sen rộng lớn quanh năm mát mẻ.',
            image: '/phanthiet/phanthiet6.jpg',
          },
          {
            day: 3,
            timeOfDay: 'buổi trưa',
            time: null,
            place: 'Dùng cơm trưa tại nhà hàng. ',
            description:'Quý khách dùng cơm trưa tại nhà hàng. Về khách sạn nghỉ ngơi.',
            image: '/phanthiet/phanthiet2.jpg',
          },
          {
            day: 3,
            timeOfDay: 'buổi chiều',
            time: null,
            place: 'Làng Mông Cổ Mian Farm',
            description:'Là một điểm đến du lịch độc đáo nằm tại tỉnh Bình Thuận, Việt Nam. Với không gian thu nhỏ của một Làng Mông Cổ truyền thống, mang đến cho du khách một trải nghiệm văn hóa và thiên nhiên độc đáo. Nơi đây tựa như viên ngọc giữa biển cát nhuộm màu vàng, Làng Mông Cổ Mian Farm thu hút du khách bởi không chỉ sự độc đáo trong kiến trúc, mà còn bởi không khí yên bình, giản dị mà tạo nên một không gian thật gần gũi và ấm áp.',
            image: '/phanthiet/phanthiet9.jpg',
          },
          {
            day: 3,
            timeOfDay: 'buổi tối',
            time: null,
            place: 'Dùng cơm Tối tại Nhà hàng',
            description: "Quý khách dùng cơm Tối tại Nhà hàng. Đoàn nghỉ đêm tại Phan Thiết.",
            image: '/phanthiet/phanthiet3.jpg',
          },
          {
            day: 4,
            timeOfDay: 'buổi sáng',
            time: null,
            place: 'Điểm tâm sáng',
            description: "•	Quý khách dùng điểm tâm sáng tại khách sạn. trả phòng. Tham quan và mua sắm đặc sản địa phương, sau đó Di chuyển về lại TP. Cần Thơ.",
            image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800',
          },
          {
            day: 4,
            timeOfDay: 'buổi trưa',
            time: null,
            place: 'Trở về',
            description: "Đoàn tới nhà hàng dùng bữa trưa. Sau đó di chuyển về lại Cần Thơ. Trên đường về Đoàn dùng bữa nhẹ tại nhà hàng sau đó tiếp tục hành trình. Kết thúc chương trình vui chơi tại Phan Thiết  3 ngày 3 đêm và hẹn gặp lại du khách trong chuyến hành trình tiếp theo.",
            image: '/phanthiet/phanthiet1.jpg',
          },
        ],
    }
  ]
  const tour:any = tours.find(tour => tour.id === id);

//-------------------------------------------------------
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        request: '',
    });

const router = useRouter();
// -------------------------------------------------------
// FETCH DATA

const fetchProduct = async () => {
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      // SET USESTAE
      const data = await response.json();
      setProduct(data.data);
    }
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
};

useEffect(() => {
  fetchProduct();
}, []);
// -------------------------------------------------------

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
  setFormData({ ...formData, [e.target.name]: e.target.value,});

  const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
      await axios.post('/api/orders', { ...formData, tourId: id });

      alert('Thông tin đã được gửi thành công!');
      setFormData({ name: '', phone: '', email: '', request: '' });
      setIsDialogOpen(false);
      router.refresh(); // Refresh lại trang để cập nhật thông tin nếu cần.
  } catch (error) {
      console.error('Lỗi khi gửi thông tin:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại!');
  }
};

//-------------------------------------------------------

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{tour.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary"><Clock className="w-4 h-4 inline mr-1" />{tour.duration}</Badge>
            <Badge variant="secondary"><Users className="w-4 h-4 inline mr-1" />{tour.groupSize}</Badge>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1">{tour.rating} ({tour.reviewCount} reviews)</span>
            </div>
          </div>
          <Image 
            src={tour.url} 
            alt={tour.name} 
            width={800} 
            height={400} 
            className="rounded-lg mb-6 max-h-80"
          />
          <p className="text-white mb-6">{tour.description}</p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className='text-primary'>Những địa điểm nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {tour.highlights.map((highlight: any, index : any) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* -------- LỊCH TRÌNH ------------ */}

          <TourTimeline tourData={tour.tourData}/>

          {/* THÔNG TIN ĐIỀU KHOẢN */}
          <TourPolicies />
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Giá vé</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tour.price} đ</p>
              <p className="text-gray-600">mỗi người</p>
            </CardContent>
            <CardFooter>
                  
                  {/* 
                  -----------------------------------------------------------------
                  */}
                    <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
                        Đặt ngay để nhận <p className="text-white pl-1">ƯU ĐÃI</p>
                    </Button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Đặt Tour</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleFormSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Họ Tên</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Số Điện Thoại</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="request">Yêu Cầu</Label>
                                        <textarea
                                            id="request"
                                            name="request"
                                            value={formData.request}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Gửi Thông Tin</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                  
                  {/* 
                  -----------------------------------------------------------------
                  */}
            </CardFooter>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Chuyến đi gồm</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tour.included.map((item : any, index : any) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Không bao gồm</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tour.notIncluded.map((item : any, index: any) => (
                  <li key={index} className="flex items-center">
                    <span className="text-red-500 mr-2">✗</span> {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

