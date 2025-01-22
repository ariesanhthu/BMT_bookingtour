// MoreTab.js
import React from 'react';
import ImageComponent from './CardTour';

const MoreTab: React.FC<{}> = () => { 
    return (
    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '10px', flexWrap: 'wrap', marginTop: '20px'}}>
      <ImageComponent
  src="/mienbac/mienbac.jpg"
  alt="Image 1"
  text="TOUR DU LỊCH MIỀN BẮC"
  description="5 ngày 4 đêm: HÀ NỘI – HẠ LONG – NINH BÌNH - SAPA"
  price={6979000}
  oldPrice={7000000}
  salePercentage={20}
  link="/tour/6"
/>
{/* <ImageComponent
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
/> */}
    </div>

  );
};

export default MoreTab;
