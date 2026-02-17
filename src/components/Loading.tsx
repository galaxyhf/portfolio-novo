"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingProps {
  isLoading: boolean;
  duration?: number;
}

export default function Loading({ isLoading }: LoadingProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-bg-primary z-50 flex items-center justify-center"
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.h1
              className="font-syne text-2xl font-bold text-text-primary mb-3 tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              CS
            </motion.h1>

            {/* Animated line */}
            <motion.div
              className="relative h-0.5 w-16 mx-auto overflow-hidden rounded-full bg-bg-card/40"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-accent to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
