import React from "react";
import { Phone, MessageSquare, MessageCircle } from "lucide-react"; // Example icons

const ContactBar: React.FC = () => {
  return (
    // rounded-lg shadow-lg z-50
    <div className="fixed bottom-5 right-5 flex flex-col space-y-5 md:space-y-10">
      {/* Messenger */}
      <a
        href="https://www.facebook.com/profile.php?id=61569547720275"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2"
      >
        {/* <MessageSquare className="w-6 h-6" /> */}
        <div className="relative">
            {/* Glowing ring */}
            <span className="animate-ping absolute h-full w-full rounded-full bg-[#BD93F9] opacity-100"></span>
            <span className="animate-pulse absolute h-full w-full rounded-full bg-[#BD93F9]"></span>
            {/* Icon */}
            <img className={`relative w-5 h-5 md:w-10 md:h-10 animate-swing`} src="/ICON/icon_messenger_color.png" alt="Messenger icon"/>
            
        </div>
        {/* <span>Messenger</span> */}
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/0942190022"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2"
      >
        <div className="relative">
            {/* Glowing ring */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full border bg-[#8BE9FD] opacity-100"></span>
            <span className="animate-pulse absolute h-full w-full rounded-full bg-[#8BE9FD]"></span>

            {/* Icon */}
            <img className={`relative w-5 h-5 md:w-10 md:h-10 animate-swing`} src="/ICON/icon_zalo_color.png" alt="Zalo icon"/>
        </div>
      </a>

      {/* Phone */}
      <a
        href="tel:+0942190022"
        className="flex items-center space-x-2"
      >
        <div className="relative">
            {/* Glowing ring */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB86C] opacity-100"></span>
            <span className="animate-pulse absolute h-full w-full rounded-full bg-[#FFB86C]"></span>
            {/* Icon */}
            <img className={`relative w-5 h-5 md:w-10 md:h-10 animate-swing`} src="/ICON/icon_phone_color.png" alt="Phone icon"/>
        </div>
        {/* <Phone className="w-12 h-12" /> */}
        {/* <span>+1 234 567 890</span> */}
      </a>
    </div>
  );
};

export default ContactBar;
