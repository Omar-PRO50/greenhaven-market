"use client";

import { motion } from "framer-motion";
import { Children, RefObject } from "react";

export default function StaggeredList({
  ref,
  children,
  classNameParent,
  classNameChildren,
}: {
  ref?: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  classNameParent: string;
  classNameChildren: string;
}) {
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } }, // Stagger animation
      }}
      className={classNameParent}
    >
      {Children.map(children, (child, i) => (
        <motion.div
          className={classNameChildren}
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 }, // Start hidden & slightly below
            visible: { opacity: 1, y: 0 }, // Animate upwards & appear
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function StaggeredListInView({
  ref,
  children,
  classNameParent,
  classNameChildren,
}: {
  ref?: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  classNameParent: string;
  classNameChildren: string;
}) {
  return (
    <motion.div className={classNameParent} ref={ref}>
      {Children.map(children, (child, i) => (
        <motion.div
          className={classNameChildren}
          key={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // 👈 Each child animates when it enters the viewport
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
