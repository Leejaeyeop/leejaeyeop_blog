import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const SkipButton = () => (
  <motion.button
    initial={{ opacity: 1 }}
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
  >
    <Link href="/about">{"SKIP >>"}</Link>
  </motion.button>
);

export default SkipButton;
