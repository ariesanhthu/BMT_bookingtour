import { Item } from "@radix-ui/react-dropdown-menu";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Contact information */}
      <div className={styles.footer_column}>
        <p className={styles.costume_text}> <i>Đặt lịch ngay với chúng tôi</i> </p>
        {/*Link Mail*/}
        <p> 
          <a 
            className={styles.link}
            // href="mailto:bluemoonlight.travel@gmail.com"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=bluemoonlight.travel@gmail.com"
            target="_blank"
            rel="noopener noreferrer"> 
            <img className={styles.icon} src="/icon_mail.png" alt="Mail icon"/>
            bluemoonlight.travel@gmail.com 
          </a>
        </p>
        {/*Link facebook*/}
        <p> 
          <a
            className={styles.link}
            href="https://www.facebook.com/profile.php?id=61569547720275"
            target="_blank"
            rel="noopener noreferrer"> 
            <img className={styles.icon} src="/icon_fb.png" alt="Mail icon"/>
            Blue MoonLight Travel
          </a>
        </p>
        {/*Link Zalo*/}
        <p> 
          <a
            className={styles.link}
            href="https://zalo.me/0942190022"
            target="_blank"
            rel="noopener noreferrer">
            <img className={styles.icon} src="/icon_phone.png" alt="Mail icon"/>
            0942 190022
          </a>
        </p>
        {/*Link gg map*/}
        <p> 
          <a  
            className={styles.link}
            href="https://maps.app.goo.gl/GdHMkMAM9vXrKL789"
            target="_blank"
            rel="noopener noreferrer"> 
            <img className={styles.icon} src="/icon_map.png" alt="Mail icon"/>
            158 Bùi Quang Trinh, P. Phú Thứ, Q. Cái Răng, Tp. Cần Thơ
          </a>
        </p>

      </div>

      {/* QR information */}
      <div className={styles.footer_column}>
        <p>
          <img className={styles.image} width="200px" height="200px" src="/qr_zalo.png" alt="QR zalo"/>
        </p>
        <p className={styles.text}> <i> Quét để xem ưu đãi </i> </p>
      </div>
    </footer>
  );
};

export default Footer;
