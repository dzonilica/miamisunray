import { motion, useReducedMotion } from "motion/react";

const EASE = [0.165, 0.84, 0.44, 1];

export default function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 30,
  once = true,
  as = "div",
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.95,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </Tag>
  );
}
