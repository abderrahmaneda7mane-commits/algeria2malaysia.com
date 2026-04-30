export type Page =
  | "home" | "apply" | "thank-you" | "universities" | "uni-apply"
  | "upm" | "apu" | "taylors" | "mmu" | "unikl" | "lincoln"
  | "utp" | "utm" | "utem" | "ucsi" | "cityu-courses" | "sunway"
  | "search" | "compare" | "consultation"
  | "stratford-institute" | "bigben-institute" | "erican-institute"
  | "sheffield-institute" | "bright-institute"
  | "institutes" | "blog";

export interface PageState {
  type?: "institute" | "university";
  scrollTo?: string;
  university?: string;
}

interface NavStore {
  page: Page;
  state: PageState;
  listeners: Array<() => void>;
}

export const PAGE_TO_URL: Record<Page, string> = {
  home:                  "/",
  universities:          "/universities",
  institutes:            "/institutes",
  blog:                  "/blog",
  upm:                   "/study-upm-malaysia",
  apu:                   "/study-apu-malaysia",
  taylors:               "/study-taylors-malaysia",
  mmu:                   "/study-mmu-malaysia",
  unikl:                 "/study-unikl-malaysia",
  lincoln:               "/study-lincoln-malaysia",
  utp:                   "/study-utp-malaysia",
  utm:                   "/study-utm-malaysia",
  utem:                  "/study-utem-malaysia",
  ucsi:                  "/study-ucsi-malaysia",
  "cityu-courses":       "/study-cityu-malaysia",
  sunway:                "/study-sunway-malaysia",
  "stratford-institute": "/english-course-stratford-kl",
  "bigben-institute":    "/english-course-bigben-kl",
  "erican-institute":    "/english-course-erican-kl",
  "sheffield-institute": "/english-course-sheffield-kl",
  "bright-institute":    "/english-course-bright-kl",
  apply:                 "/apply",
  "thank-you":           "/thank-you",
  consultation:          "/consultation",
  search:                "/search",
  compare:               "/compare-universities",
  "uni-apply":           "/apply-university",
};

const URL_TO_PAGE: Record<string, Page> = Object.fromEntries(
  (Object.entries(PAGE_TO_URL) as [Page, string][]).map(([page, url]) => [url, page])
);

function getPageFromUrl(): Page {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return URL_TO_PAGE[path] ?? "home";
}

const store: NavStore = {
  page: getPageFromUrl(),
  state: {},
  listeners: [],
};

export function navigate(page: Page, state: PageState = {}) {
  store.page = page;
  store.state = state;
  const url = PAGE_TO_URL[page] ?? "/";
  window.history.pushState({ page, state }, "", url);
  if (!state.scrollTo) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  store.listeners.forEach((fn) => fn());
}

export function getNavState() {
  return { page: store.page, state: store.state };
}

export function subscribeNav(fn: () => void) {
  store.listeners.push(fn);
  return () => {
    const idx = store.listeners.indexOf(fn);
    if (idx > -1) store.listeners.splice(idx, 1);
  };
}

export function handlePopState() {
  store.page = getPageFromUrl();
  store.state = {};
  store.listeners.forEach((fn) => fn());
}

export function useNavigate() {
  return { go: navigate };
}
