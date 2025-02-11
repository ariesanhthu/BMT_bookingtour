// import { EmailTemplate } from '@/app/components/Email/booking-notification';
// import { Resend } from 'resend';
// import * as React from 'react';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST() {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Blue Moonlight <support.bluemoontravel.com.vn>',
//       to: ['aries.anhthu@gmail.com'],
//       subject: 'Hello world',
//       react: EmailTemplate({ firstName: 'Thu' })as React.ReactElement,
//     });
    
//     if (error) {
//         console.error("❌ Resend API Error:", error);
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }
import { EmailTemplate } from '@/app/components/Email/booking-notification';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("❌ RESEND_API_KEY is missing in .env.local");
    }

    console.log("📨 Sending email...");
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',      //'Blue Moonlight <dev@support.bluemoontravel.com.vn>', // Dùng email test
      to: ['anhthuxitin@outlook.com'],
      subject: 'Thông báo khách hàng đặt tour thành công!',
      react: EmailTemplate({ firstName: 'Thu' }) as React.ReactElement,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Email sent successfully:", data);
    return Response.json({ success: true, data });
  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

