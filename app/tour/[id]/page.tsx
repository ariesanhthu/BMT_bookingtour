'use client'
import { CalendarDays, MapPin, Users, Clock, DollarSign, Utensils, Hotel, Plane } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import { TourDescription } from '@/app/components/content/TourDescription'
import TourTimeline from '@/app/components/content/TourTimeline'
import TourPolicies from '@/app/components/content/TourPolicies'
import { useParams } from 'next/navigation';
import category from '@/sanity/schemas/category'

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
    }
  ]
  const tour:any = tours.find(tour => tour.id === id);
//   console.log(tour);
//   console.log(id);
//   const tour = {
//     id: '1',
//     name: 'DU LỊCH ĐÀ LẠT – THÀNH PHỐ NGÀN HOA',
//     category: 'Miền Nam',
//     url: '/dalat/dalat.jpg',
//     duration: '3 ngày 3 đêm',
//     groupSize: '10+',
//     price: "2.839.000",
//     rating: 4.8,
//     reviewCount: 124,
//     description: 'Khám phá vẻ đẹp thơ mộng của Đà Lạt, thành phố ngàn hoa với tour du lịch hấp dẫn.',
//     highlights: [
//       'Đón bình minh tại thiên đường săn mây.',
//       'Tham quan Chùa Linh Phước.',
//       'Nông Trại Cún - Puppy Farm.',
//       'Tham quan và vui chơi tại Mongo Land.',
//       'Tham quan Thiền Viện Trúc Lâm, Quảng Trường Lâm Viên.',
//       'Cafe Xóm Lèo.',
//       'Thác Pongour Đà Lạt – Nam Thiên Đệ Nhất Thác.',
//     ],
//     included: ['Chi phí vận chuyển', 'Ăn theo chương trình', 'Nước suối : 1 chai/khách/ngày ', 'Khách sạn tiêu chuẩn: 2 sao 2-3 người/phòng ', 'Vé tham quan', "Hướng dẫn viên"],
//     notIncluded: ['Hóa đơn VAT, không áp dụng lễ, Tết', 'Chí phí cá nhân ngoài chương trình'],
//   }

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
              <Button className="w-full">Đặt ngay để nhận<p className='text-white pl-1'>ƯU ĐÃI</p></Button>
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

