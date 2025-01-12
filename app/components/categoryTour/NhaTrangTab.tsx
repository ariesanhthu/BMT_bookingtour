import React from 'react';
import ImageComponent from './CardTour';

const NhatrangTab: React.FC<{}> = () => { 
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '10px', flexWrap: 'wrap', marginTop: '20px'}}>
<ImageComponent
  src="/phanthiet/phanthiet1.jpg"
  alt="Phan thiết"
  text="Phan thiết"
  description="3 ngày 3 đêm"
  price={2539000}
  oldPrice={2739000}
  salePercentage={13}
  link="/tour/5"
/>
<ImageComponent

  src="/namdu/namdu1.jpg"
  alt="Nam du"
  text="NAM DU"
  description="Tiệc BBQ, lặn ngắm san hô, khám phá vẻ đẹp hoang sơ."
  price={2139000}
  oldPrice={2500000}
  salePercentage={17}
  link="/tour/2"
/>
      <ImageComponent
  src="/honson/honson3.jpg"
  alt="Hòn Sơn"
  text="HÒN SƠN"
  description="2 ngày 1 đêm: Check in những địa điểm hot nhất"
  price={2239000}
  oldPrice={2560000}
  salePercentage={13}
  link="/tour/3"
/>
<ImageComponent
  src="/phuquoc.jpg"
  alt="Phú Quốc"
  text="Phú Quốc"
  description="3 ngày 2 đêm"
  price={3339000}
  oldPrice={3539000}
  salePercentage={13}
  link="/tour/4"
/>
    </div>
  );
};

export default NhatrangTab;
