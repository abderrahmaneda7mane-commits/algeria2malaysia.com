import { useEffect } from "react";

const BASE_DOMAIN = "https://algeria2malaysia.com";
const DEFAULT_IMAGE = `${BASE_DOMAIN}/opengraph.jpg`;

interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  keywords?: string;
  noindex?: boolean;
}

function setMeta(nameAttr: string, nameVal: string, content: string) {
  let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(nameAttr, nameVal);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSEO({ title, description, canonicalPath, ogImage, keywords, noindex }: SEOProps) {
  useEffect(() => {
    document.title = title;

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    const canonical = `${BASE_DOMAIN}${canonicalPath}`;
    setLink("canonical", canonical);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", ogImage ?? DEFAULT_IMAGE);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", "ar_DZ");
    setMeta("property", "og:site_name", "Algeria2Malaysia");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage ?? DEFAULT_IMAGE);
  }, [title, description, canonicalPath, ogImage, keywords, noindex]);
}
