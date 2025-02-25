import React from 'react';
import { AlertCircle, CreditCard, Users, Info } from 'lucide-react';

const TourPolicies: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-8 h-fit">
       {/* Additional Notes */}
       <section>
        <div className="flex items-center space-x-2 mb-4">
          <Info className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Lưu ý quan trọng</h2>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            Thứ tự các điểm tham quan có thể thay đổi cho phù hợp với tình hình thực tế nhưng vẫn đảm bảo thực hiện đầy đủ nội dung chương trình
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            Quy định của khách sạn: giờ nhận phòng sau: 12h00 – 14h00. Giờ trả phòng 10h00
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            Khi đi Quý khách nhớ mang theo giấy tờ tùy thân, giấy khai sinh cho trẻ em và giấy ủy quyền trường hợp em bé đi với người không phải là cha mẹ
          </li>
        </ul>
      </section>

      {/* Children's Pricing */}
      <section>
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Giá tour dành cho trẻ em</h2>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Trẻ em từ 11 tuổi trở lên mua 1 vé
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Trẻ em từ 6 tuổi đến 10 tuổi mua 75% vé tour
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Trẻ em 5 tuổi trở xuống miễn vé, nhưng 02 người lớn chỉ kèm 1 trẻ em dưới 05 tuổi, nếu trẻ em đi kèm nhiều hơn thì trẻ em thứ 2 trở lên mua 75% vé
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Tiêu chuẩn 75% vé được 1 suất ăn, 1 ghế ngồi và ghép ngủ chung với cha mẹ
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Trẻ em 75% vé không phát sinh phòng 3
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Trẻ em đi tham gia tour miễn phí bố mẹ tự túc mua vé và các dịch vụ khi đi tham quan
          </li>
        </ul>
      </section>

      {/* Cancellation Policy */}
      <section>
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Hủy vé</h2>
        </div>
        <p className="mb-2 text-gray-700">Quý khách vui lòng thanh toán các khoản hủy tour, lệ phí cụ thể:</p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            Sau khi đăng ký hủy vé phạt: 50% giá tour
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            Trước ngày đi 07 - 10 ngày hủy phạt: 80% giá tour
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            Sau thời gian trên, hủy hoặc không báo hủy phạt 100% giá tour
          </li>
        </ul>
      </section>

      {/* Payment Terms */}
      <section>
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary">Điều kiện thanh toán</h2>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Lần 01: Quý khách vui lòng thanh toán cọc 50% giá trị tour sau khi đăng kí
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Lần 02: Thanh toán hết phần còn lại trước ngày khởi hành
          </li>
        </ul>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 italic">
          "Trong những trường hợp khách quan như: khủng bố, thiên tai, dịch bệnh... hoặc do có sự cố, có sự thay đổi lịch trình của các phương tiện vận chuyển công cộng như: máy bay, tàu hỏa... thì Công ty sẽ giữ quyền thay đổi lộ trình bất cứ lúc nào vì sự thuận tiện, an toàn cho khách hàng và sẽ không chịu trách nhiệm bồi thường những thiệt hại phát sinh"
        </p>
      </section>
    </div>
  );
};

export default TourPolicies;