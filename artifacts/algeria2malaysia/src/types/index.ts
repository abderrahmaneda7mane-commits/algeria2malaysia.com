// ── Navigation ──────────────────────────────────────────────
export type Page =
  | "home" | "apply" | "thank-you" | "universities" | "uni-apply"
  | "upm" | "apu" | "taylors" | "mmu" | "unikl" | "lincoln"
  | "utp" | "utm" | "utem" | "ucsi" | "cityu-courses" | "sunway"
  | "search" | "compare" | "consultation"
  | "stratford-institute" | "bigben-institute" | "erican-institute"
  | "sheffield-institute" | "bright-institute" | "cambright-institute"
  | "institutes" | "blog";

export interface PageState {
  type?: "institute" | "university";
  scrollTo?: string;
  university?: string;
}

// ── Institutes ───────────────────────────────────────────────
export type Goal = "ielts" | "general" | "pathway";
export type RoomType = "studio" | "master" | "medium" | "small";

export interface InstituteProgram {
  name: string;
  duration: string;
  price: number;
  specialOffer?: number;
}

export interface Institute {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  goals: Goal[];
  minBudget: number;
  maxBudget: number;
  color: string;
  programs: InstituteProgram[];
  intakes: string[];
  address: string;
}

// ── Courses ──────────────────────────────────────────────────
export interface Course {
  id: number;
  university_id: string;
  name: string;
  duration_years: number;
  price_rm: number;
}
