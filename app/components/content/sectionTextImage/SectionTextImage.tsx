import React, { CSSProperties } from "react";
import styles from "./SectionTextImage.module.css";

interface SectionTextImage {
  titleRef?: React.Ref<HTMLParagraphElement>;
  leftRef?: React.Ref<HTMLParagraphElement>; // Ref for left paragraph
  rightRef?: React.Ref<HTMLParagraphElement>; // Ref for right paragraph
  titleStyle : string; //CSSProperties
  leftStyle : string;  //CSSProperties
  rightStyle : string; //CSSProperties
  title: string; // Tiêu đề lớn
  leftContent: string; // Nội dung cột trái
  rightContent: string; // Nội dung cột phải
}

const SectionCol: React.FC<SectionTextImage> = 
    ({titleRef = null, leftRef = null, rightRef = null, 
      titleStyle = "", leftStyle = null, rightStyle = null, 
      title, leftContent, rightContent }) => {
  return (
    <section className={`${styles.section}`}>
      {/* Tiêu đề lớn */}
      <h1 ref={titleRef} className={`${titleStyle} font-bold text-lg md:text-4xl text-[#3a56d6] text-left px-4 pb-5`}>{title}</h1>

      {/* Nội dung 2 cột */}
      <div className={`flex flex-col md:flex-row md:space-x-1`}>
        {/* Cột bên trái */}
        <div className={`flex-1 p-4 my-0 text-[#444] text-justify`}>
          <p ref = {leftRef} className={`${leftStyle} text-sm md:text-lg`}>{leftContent}</p>
        </div>

        {/* Cột bên phải */}
        <div ref = {rightRef} className={`${rightStyle} flex-1 p-4 my-0 flex justify-center`}>
          <img src={rightContent} className="h-64 w-auto pt-0 mt-0 rounded-sm"/>
        </div>
      </div>
    </section>
  );
};

export default SectionCol;
