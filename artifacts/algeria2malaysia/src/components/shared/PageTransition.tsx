import { motion } from "framer-motion";

const variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -6 },
};

export default function PageTransition({ children, pageKey }: { children: React.ReactNode; pageKey: string }) {
  return (
    <motion.div
      key={pageKey}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{ minHeight: "inherit" }}
    >
      {children}
    </motion.div>
  );
}
