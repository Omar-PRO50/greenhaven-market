"use client";

import { motion } from "framer-motion";
import { Children } from "react";

export default function StaggeredList({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <motion.div className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // 👈 Each child animates when it enters the viewport
          variants={{
            hidden: { opacity: 0, y: 20 }, // Start hidden & slightly below
            visible: { opacity: 1, y: 0 }, // Animate upwards & appear
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.05 }} // 👈 Staggered effect per child
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
