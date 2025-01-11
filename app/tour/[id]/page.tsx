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
  const tourData: TourStop[] = [
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
  ];
  
  const tour = {
    id: '1',
    name: 'DU LỊCH ĐÀ LẠT – THÀNH PHỐ NGÀN HOA',
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
  }

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
            src="/dalat/dalat.jpg" 
            alt={tour.name} 
            width={800} 
            height={400} 
            className="rounded-lg mb-6"
          />
          <p className="text-gray-600 mb-6">{tour.description}</p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className='text-primary'>Những địa điểm nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {tour.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* -------- LỊCH TRÌNH ------------ */}

          <TourTimeline tourData={tourData}/>

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
                {tour.included.map((item, index) => (
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
                {tour.notIncluded.map((item, index) => (
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

