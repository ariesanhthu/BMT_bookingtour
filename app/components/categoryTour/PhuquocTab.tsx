import React from 'react';
import ImageComponent from './CardTour';

const PhuquocTab: React.FC<{}> = () => { 
  return (
    <>
 <div style={{ display: 'flex', justifyContent: 'space-around', gap: '10px', flexWrap: 'wrap', marginTop: '20px'}}>
      <ImageComponent
  src="/dalat/dalat.jpg"
  alt="Image 1"
  text="Đà lạt"
  description="Thành phố ngàn hoa"
  price={2839000}
  oldPrice={3000000}
  salePercentage={5.3}
  link="/tour/1"
/>
<ImageComponent

  src="/captreohonthom.jpg"
  alt="Image 3"
  text="Hòn Thơm"
  description="Tour cano 4 Đảo – Cáp treo"
  price={1200000}
  oldPrice={1450000}
  salePercentage={17}
  link="/tour/3"
/>
      <ImageComponent
  src="/phuquoc.jpg"
  alt="Image 3"
  text="Nam Đảo"
  description="Check in 6 địa điểm hot nhất"
  price={690000}
  oldPrice={790000}
  salePercentage={13}
  link="/tour/2"
/>
    </div>
    </>
  );
};

export default PhuquocTab;

