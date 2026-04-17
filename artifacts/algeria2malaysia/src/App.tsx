import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import ThankYouPage from "./pages/ThankYouPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import UniApplyPage from "./pages/UniApplyPage";
import UPMCoursesPage from "./pages/UPMCoursesPage";
import APUCoursesPage from "./pages/APUCoursesPage";
import TaylorsCoursesPage from "./pages/TaylorsCoursesPage";
import MMUCoursesPage from "./pages/MMUCoursesPage";
import UniKLCoursesPage from "./pages/UniKLCoursesPage";
import LincolnCoursesPage from "./pages/LincolnCoursesPage";
import UTPCoursesPage from "./pages/UTPCoursesPage";
import UTMCoursesPage from "./pages/UTMCoursesPage";
import UTeMCoursesPage from "./pages/UTeMCoursesPage";
import UCSICoursesPage from "./pages/UCSICoursesPage";
import CityUCoursesPage from "./pages/CityUCoursesPage";
import SunwayCoursesPage from "./pages/SunwayCoursesPage";
import GlobalSearchPage from "./pages/GlobalSearchPage";
import CompareUniversitiesPage from "./pages/CompareUniversitiesPage";
import ConsultationPage from "./pages/ConsultationPage";
import StratfordPage from "./pages/StratfordPage";
import BigBenPage from "./pages/BigBenPage";
import { getNavState, subscribeNav } from "./hooks/useNavigate";

function FormReturnPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-green-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xl">📌</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-base mb-1">ملاحظة مهمة</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              بعد الانتهاء من تعبئة الفورم، سيتم إرسال طلبك مباشرة إلى الجامعة، وسيتم التواصل معك قريبًا.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none flex-shrink-0 mt-0.5"
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-bold text-sm transition-all"
        >
          حسناً، شكراً
        </button>
      </div>
    </div>
  );
}

function App() {
  const [nav, setNav] = useState(getNavState);
  const [showFormPopup, setShowFormPopup] = useState(false);

  useEffect(() => {
    return subscribeNav(() => setNav(getNavState()));
  }, []);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "visible" && sessionStorage.getItem("formOpened") === "1") {
        sessionStorage.removeItem("formOpened");
        setShowFormPopup(true);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const { page, state } = nav;

  const showNavbar = page === "home" || page === "universities" || page === "upm" || page === "apu" || page === "taylors" || page === "mmu" || page === "unikl" || page === "lincoln" || page === "utp" || page === "utm" || page === "utem" || page === "ucsi" || page === "cityu-courses" || page === "sunway" || page === "search" || page === "compare" || page === "consultation" || page === "stratford-institute" || page === "bigben-institute";

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {showNavbar && <Navbar />}
      {page === "home" && <HomePage />}
      {page === "universities" && <UniversitiesPage />}
      {page === "apply" && <ApplyPage initialType={state.type} />}
      {page === "thank-you" && <ThankYouPage />}
      {page === "uni-apply" && <UniApplyPage />}
      {page === "upm" && <UPMCoursesPage />}
      {page === "apu" && <APUCoursesPage />}
      {page === "taylors" && <TaylorsCoursesPage />}
      {page === "mmu" && <MMUCoursesPage />}
      {page === "unikl" && <UniKLCoursesPage />}
      {page === "lincoln" && <LincolnCoursesPage />}
      {page === "utp" && <UTPCoursesPage />}
      {page === "utm" && <UTMCoursesPage />}
      {page === "utem" && <UTeMCoursesPage />}
      {page === "ucsi" && <UCSICoursesPage />}
      {page === "cityu-courses" && <CityUCoursesPage />}
      {page === "sunway" && <SunwayCoursesPage />}
      {page === "search" && <GlobalSearchPage />}
      {page === "compare" && <CompareUniversitiesPage />}
      {page === "consultation" && <ConsultationPage />}
      {page === "stratford-institute" && <StratfordPage />}
      {page === "bigben-institute" && <BigBenPage />}
      {showFormPopup && <FormReturnPopup onClose={() => setShowFormPopup(false)} />}
    </div>
  );
}

export default App;
