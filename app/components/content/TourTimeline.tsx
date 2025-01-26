import React from 'react';
import { Clock, MapPin, Sun, Sunset, Moon } from 'lucide-react';
import Image from 'next/image';
import { TourStop } from '@/app/interface';

type TimeOfDay = 'buổi sáng' | 'buổi trưa' |'buổi chiều' | 'buổi tối';

// interface TourStop {
//   day: number;
//   timeOfDay: TimeOfDay;
//   time?: string | null;
//   place: string;
//   description?: string | null;
//   image: string;
// }

const getTimeIcon = (timeOfDay ?: TimeOfDay | undefined) => {
  switch (timeOfDay) {
    case 'buổi sáng':
    case 'buổi trưa':
      return <Sun className="w-5 h-5 text-yellow-500" />;
    case 'buổi chiều':
      return <Sunset className="w-5 h-5 text-orange-500" />;
    case 'buổi tối':
      return <Moon className="w-5 h-5 text-blue-500" />;
  }
};

interface TourComponentProps {
    tourData: TourStop[];
  }

const TourTimeline: React.FC<TourComponentProps> = ({ tourData }) => {
  // Group tour stops by day
  const groupedTourData = tourData.reduce((acc, stop) => {
    if (!acc[stop.day]) {
      acc[stop.day] = [];
    }
    acc[stop.day].push(stop);
    return acc;
  }, {} as Record<number, TourStop[]>);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-title mb-8 text-center">LỊCH TRÌNH THAM QUAN</h1>
        
        {Object.entries(groupedTourData).map(([day, stops]) => (
          <div key={day} className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
              Ngày {day}
            </h2>

<div className="space-y-6">
  {stops.map((stop, index) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="lg:flex">
        {stop.image ? (
          <div className="lg:w-80 w-full flex-shrink-0 relative aspect-[4/3]">
            {/* Sử dụng Next.js Image */}
            <Image
              src={stop.image}
              alt={stop.place}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority={index === 0} // Tăng ưu tiên cho ảnh đầu tiên
            />
          </div>
        ) : null}
        <div className="p-6 flex-1">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-gray-500">
              {getTimeIcon(stop.timeOfDay)}
              <span className="text-sm capitalize">{stop.timeOfDay}</span>
            </div>
            {stop.time ? (
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{stop.time}</span>
              </div>
            ) : null}
          </div>

          <div className="mt-4">
            <div className="flex items-center space-x-2 text-gray-900">
              <MapPin className="w-5 h-5 text-gray-500" />
              <h3 className="text-xl font-semibold">{stop.place}</h3>
            </div>
            <p className="mt-2 text-gray-600">{stop.description}</p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TourTimeline;