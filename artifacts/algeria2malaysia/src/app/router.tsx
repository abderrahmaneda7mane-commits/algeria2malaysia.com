import type { Page, PageState } from "@/types";

import HomePage from "@/pages/home/HomePage";
import UniversitiesPage from "@/pages/universities/UniversitiesPage";
import CompareUniversitiesPage from "@/pages/universities/CompareUniversitiesPage";
import APUCoursesPage from "@/pages/universities/courses/APUCoursesPage";
import TaylorsCoursesPage from "@/pages/universities/courses/TaylorsCoursesPage";
import MMUCoursesPage from "@/pages/universities/courses/MMUCoursesPage";
import UniKLCoursesPage from "@/pages/universities/courses/UniKLCoursesPage";
import LincolnCoursesPage from "@/pages/universities/courses/LincolnCoursesPage";
import UTPCoursesPage from "@/pages/universities/courses/UTPCoursesPage";
import UTMCoursesPage from "@/pages/universities/courses/UTMCoursesPage";
import UTeMCoursesPage from "@/pages/universities/courses/UTeMCoursesPage";
import UCSICoursesPage from "@/pages/universities/courses/UCSICoursesPage";
import CityUCoursesPage from "@/pages/universities/courses/CityUCoursesPage";
import SunwayCoursesPage from "@/pages/universities/courses/SunwayCoursesPage";
import UPMCoursesPage from "@/pages/universities/courses/UPMCoursesPage";
import InstituteListPage from "@/pages/institutes/InstituteListPage";
import StratfordPage from "@/pages/institutes/detail/StratfordPage";
import BigBenPage from "@/pages/institutes/detail/BigBenPage";
import EricanPage from "@/pages/institutes/detail/EricanPage";
import SheffieldPage from "@/pages/institutes/detail/SheffieldPage";
import BrightPage from "@/pages/institutes/detail/BrightPage";
import CambrightPage from "@/pages/institutes/detail/CambrightPage";
import ApplyPage from "@/pages/apply/ApplyPage";
import UniApplyPage from "@/pages/apply/UniApplyPage";
import ThankYouPage from "@/pages/apply/ThankYouPage";
import GlobalSearchPage from "@/pages/search/GlobalSearchPage";
import ConsultationPage from "@/pages/consultation/ConsultationPage";
import BlogPage from "@/pages/blog/BlogPage";
import NotFound from "@/pages/not-found";

export const PAGES_WITH_NAVBAR = new Set<Page>([
  "home", "universities", "institutes", "blog",
  "upm", "apu", "taylors", "mmu", "unikl", "lincoln",
  "utp", "utm", "utem", "ucsi", "cityu-courses", "sunway",
  "search", "compare", "consultation",
  "stratford-institute", "bigben-institute", "erican-institute",
  "sheffield-institute", "bright-institute", "cambright-institute",
]);

export const PAGES_WITH_FOOTER = new Set<Page>([
  "home", "universities", "institutes", "blog",
  "upm", "apu", "taylors", "mmu", "unikl", "lincoln",
  "utp", "utm", "utem", "ucsi", "cityu-courses", "sunway",
  "search", "compare",
  "stratford-institute", "bigben-institute", "erican-institute",
  "sheffield-institute", "bright-institute", "cambright-institute",
]);

interface RouterProps {
  page: Page;
  state: PageState;
}

export default function Router({ page, state }: RouterProps) {
  switch (page) {
    case "home":                return <HomePage />;
    case "universities":        return <UniversitiesPage />;
    case "compare":             return <CompareUniversitiesPage />;
    case "apu":                 return <APUCoursesPage />;
    case "taylors":             return <TaylorsCoursesPage />;
    case "mmu":                 return <MMUCoursesPage />;
    case "unikl":               return <UniKLCoursesPage />;
    case "lincoln":             return <LincolnCoursesPage />;
    case "utp":                 return <UTPCoursesPage />;
    case "utm":                 return <UTMCoursesPage />;
    case "utem":                return <UTeMCoursesPage />;
    case "ucsi":                return <UCSICoursesPage />;
    case "cityu-courses":       return <CityUCoursesPage />;
    case "sunway":              return <SunwayCoursesPage />;
    case "upm":                 return <UPMCoursesPage />;
    case "institutes":          return <InstituteListPage />;
    case "stratford-institute": return <StratfordPage />;
    case "bigben-institute":    return <BigBenPage />;
    case "erican-institute":    return <EricanPage />;
    case "sheffield-institute": return <SheffieldPage />;
    case "bright-institute":    return <BrightPage />;
    case "cambright-institute": return <CambrightPage />;
    case "apply":               return <ApplyPage initialType={state.type} />;
    case "uni-apply":           return <UniApplyPage />;
    case "thank-you":           return <ThankYouPage />;
    case "search":              return <GlobalSearchPage />;
    case "consultation":        return <ConsultationPage />;
    case "blog":                return <BlogPage />;
    default:                    return <NotFound />;
  }
}
