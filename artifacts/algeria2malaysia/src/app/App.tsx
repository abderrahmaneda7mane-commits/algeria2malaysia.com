import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Providers from "./providers";
import Router, { PAGES_WITH_NAVBAR, PAGES_WITH_FOOTER } from "./router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FormReturnPopup from "@/components/shared/FormReturnPopup";
import PageTransition from "@/components/shared/PageTransition";
import { getNavState, subscribeNav, handlePopState } from "@/hooks/useNavigate";

export default function App() {
  const [nav, setNav] = useState(getNavState);
  const [showFormPopup, setShowFormPopup] = useState(false);

  useEffect(() => subscribeNav(() => setNav(getNavState())), []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
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

  return (
    <Providers>
      <div className="min-h-screen bg-white flex flex-col">
        {PAGES_WITH_NAVBAR.has(page) && <Navbar />}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <PageTransition pageKey={page}>
              <Router page={page} state={state} />
            </PageTransition>
          </AnimatePresence>
        </main>
        {PAGES_WITH_FOOTER.has(page) && <Footer />}
        {showFormPopup && <FormReturnPopup onClose={() => setShowFormPopup(false)} />}
      </div>
    </Providers>
  );
}
