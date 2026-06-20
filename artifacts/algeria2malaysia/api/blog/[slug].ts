import type { VercelRequest, VercelResponse } from "@vercel/node";

const BASE = "https://algeria2malaysia.com";

const ARTICLES: Record<string, { title: string; description: string; image: string }> = {
  "study-in-malaysia-algerian-students": {
    title: "الدراسة في ماليزيا للجزائريين 2026 — الدليل الشامل",
    description: "الجامعات، الفيزا، التكاليف، وكل ما تحتاجه للدراسة في ماليزيا.",
    image: `${BASE}/opengraph.jpg`,
  },
  "ielts-malaysia-preparation": {
    title: "تحضير IELTS في ماليزيا — أفضل 5 معاهد للجزائريين 2026",
    description: "دليل شامل لأفضل معاهد IELTS في كوالالمبور مع خطة دراسة 8 أسابيع.",
    image: `${BASE}/opengraph.jpg`,
  },
  "cost-living-kuala-lumpur-students": {
    title: "تكلفة المعيشة في كوالالمبور للطالب الجزائري 2026",
    description: "ميزانية شهرية تفصيلية: السكن، الأكل، المواصلات. كيف تعيش بـ 1,500 RM.",
    image: `${BASE}/opengraph.jpg`,
  },
  "student-visa-malaysia-algeria": {
    title: "كيف تحصل على فيزا الطالب لماليزيا من الجزائر — 2026",
    description: "خطوات فيزا الطالب الماليزية: الوثائق، المدة، الأخطاء الشائعة.",
    image: `${BASE}/opengraph.jpg`,
  },
  "albukhary-scholarship-malaysia-algerian-2026": {
    title: "منحة جامعة البخاري ماليزيا 2026 — ممولة بالكامل للجزائريين",
    description: "منحة البخاري الدولية ماليزيا: رسوم + سكن مجاني + راتب شهري 450 RM. الشروط والتخصصات والتقديم خطوة بخطوة للطلاب الجزائريين.",
    image: `${BASE}/albukhary-banner.jpg`,
  },
  "summer-camp-malaysia-children": {
    title: "سامر كامب ماليزيا للأطفال والشباب 2026 — كل التفاصيل",
    description: "برامج الصيف في ماليزيا للأطفال: أسعار، مواعيد، وكيف تحجز.",
    image: `${BASE}/opengraph.jpg`,
  },
};

const DEFAULT = {
  title: "مقالات Algeria2Malaysia — الدراسة في ماليزيا",
  description: "أحدث المقالات والأدلة للطلاب الجزائريين الراغبين في الدراسة في ماليزيا.",
  image: `${BASE}/opengraph.jpg`,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = req.query.slug as string;
  const meta = ARTICLES[slug] ?? DEFAULT;
  const url = `${BASE}/blog/${slug}`;

  // Fetch the actual SPA index.html and inject article OG tags into it.
  // This serves real users the full SPA while giving bots proper OG metadata.
  let html: string;
  try {
    const r = await fetch(`${BASE}/`, { headers: { "User-Agent": "Algeria2Malaysia-OG-Bot/1.0" } });
    html = await r.text();
  } catch {
    res.setHeader("Location", "/");
    return res.status(302).end();
  }

  const esc = (s: string) => s.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const t = esc(meta.title);
  const d = esc(meta.description);

  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${d}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/i, `$1${t}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/i, `$1${d}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/i, `$1${esc(url)}$2`)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/i, `$1${esc(meta.image)}$2`)
    .replace(/(<meta\s+property="og:type"\s+content=")[^"]*(")/i, `$1article$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/i, `$1${t}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/i, `$1${d}$2`)
    .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/i, `$1${esc(meta.image)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${esc(url)}$2`);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(html);
}
