import React from 'react';
import ImageComponent from './CardTour';

const PhuquocTab: React.FC<{}> = () => { 
  return (
    <>
 <div style={{ display: 'flex', justifyContent: 'space-around', gap: '10px', flexWrap: 'wrap', marginTop: '20px'}}>
      <ImageComponent
  src="/diatrunghai.jpg"
  alt="Image 1"
  text="Địa Trung Hải"
  description="Trải nghiệm tour cano 3 đảo"
  price={800000}
  oldPrice={900000}
  salePercentage={20}
  link="/mienbac"
/>
<ImageComponent

  src="/captreohonthom.jpg"
  alt="Image 3"
  text="Hòn Thơm"
  description="Tour cano 4 Đảo – Cáp treo"
  price={1200000}
  oldPrice={1450000}
  salePercentage={17}
  link="/miennam"
/>
      <ImageComponent
  src="/phuquoc.jpg"
  alt="Image 3"
  text="Nam Đảo"
  description="Check in 6 địa điểm hot nhất"
  price={690000}
  oldPrice={790000}
  salePercentage={13}
  link="/miennam"
/>
    </div>
    </>
  );
};

export default PhuquocTab;
