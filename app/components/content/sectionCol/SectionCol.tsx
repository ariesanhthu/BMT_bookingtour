import React from "react";
import styles from "./SectionCol.module.css";

interface SectionColProps {
  title: string; // Tiêu đề lớn
  leftContent: string; // Nội dung cột trái
  rightContent: string; // Nội dung cột phải
}

const SectionCol: React.FC<SectionColProps> = ({ title, leftContent, rightContent }) => {
  return (
    <section className={styles.section}>
      {/* Tiêu đề lớn */}
      <h1 className={styles.header}>{title}</h1>

      {/* Nội dung 2 cột */}
      <div className={styles.columns}>
        {/* Cột bên trái */}
        <div className={styles.column}>
          <p>{leftContent}</p>
        </div>

        {/* Cột bên phải */}
        <div className={styles.column}>
          <p>{rightContent}</p>
        </div>
      </div>
    </section>
  );
};

export default SectionCol;
