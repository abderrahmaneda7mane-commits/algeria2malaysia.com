import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const data = req.body;

  if (!data?.fullName || !data?.email || !data?.phone) {
    res.status(400).json({ error: "بيانات ناقصة" });
    return;
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error("GMAIL_USER or GMAIL_APP_PASSWORD not set");
    res.status(500).json({ error: "إعدادات الإيميل غير مكتملة" });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: gmailUser, pass: gmailPass },
  });

  const html = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background: #16a34a; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px;">طلب استشارة جديد 🎓</h1>
        <p style="color: #bbf7d0; margin: 6px 0 0;">Algeria2Malaysia — استشارة مجانية 30 دقيقة</p>
      </div>
      <div style="padding: 24px; background: #f9fafb;">
        <h2 style="color: #15803d; font-size: 16px; margin: 0 0 16px; border-bottom: 2px solid #dcfce7; padding-bottom: 8px;">المعلومات الشخصية</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 40%;">الاسم الكامل</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.fullName}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">البريد الإلكتروني</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">رقم الهاتف (واتساب)</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.phone}</td></tr>
        </table>
        <h2 style="color: #15803d; font-size: 16px; margin: 20px 0 16px; border-bottom: 2px solid #dcfce7; padding-bottom: 8px;">المعلومات الأكاديمية</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 40%;">ماذا يريد أن يدرس؟</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.studyField || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">هل لديه تخصص معين؟</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.specialty || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">المستوى الدراسي الحالي</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.currentLevel || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">آخر شهادة حصل عليها</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.lastDegree || "—"}</td></tr>
        </table>
        <h2 style="color: #15803d; font-size: 16px; margin: 20px 0 16px; border-bottom: 2px solid #dcfce7; padding-bottom: 8px;">تفاصيل إضافية</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 40%;">الميزانية السنوية المتوقعة</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.budget || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">مستوى اللغة الإنجليزية</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.englishLevel || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">شهادة IELTS أو لغة</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.ielts || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">لماذا ماليزيا؟</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.whyMalaysia || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">الأهم بالنسبة له</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${data.priority || "—"}</td></tr>
        </table>
      </div>
      <div style="background: #f0fdf4; padding: 16px; text-align: center;">
        <p style="color: #15803d; font-size: 13px; margin: 0;">تم الاستلام من موقع Algeria2Malaysia • ${new Date().toLocaleString("ar-DZ")}</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Algeria2Malaysia" <${gmailUser}>`,
      to: gmailUser,
      replyTo: data.email,
      subject: `طلب استشارة جديد — ${data.fullName}`,
      html,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "فشل إرسال الإيميل" });
  }
});

export default router;
