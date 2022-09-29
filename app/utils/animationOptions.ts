import { MotionProps } from "framer-motion";

const animationOptions: MotionProps = {
  layout: true,
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { type: "spring", duration: 0.8 },
};

export default animationOptions;
