"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const updateHeight = () => {
      setSvgHeight(contentRef.current?.offsetHeight || 0);
    };
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Motion values for gradient stops
  const start = useSpring(useTransform(scrollYProgress, [0, 1], [-0.2, 0.8]), {
    stiffness: 50,
    damping: 20,
  });
  const mid = useSpring(useTransform(scrollYProgress, [0, 1], [0.1, 1]), {
    stiffness: 50,
    damping: 20,
  });
  const end = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1.2]), {
    stiffness: 50,
    damping: 20,
  });

  // We'll store offsets in state so SVG updates reliably
  const [offsets, setOffsets] = useState({ start: 0, mid: 0.1, end: 0.3 });

  useEffect(() => {
    const unsub1 = start.on("change", (v) =>
      setOffsets((prev) => ({ ...prev, start: v }))
    );
    const unsub2 = mid.on("change", (v) =>
      setOffsets((prev) => ({ ...prev, mid: v }))
    );
    const unsub3 = end.on("change", (v) =>
      setOffsets((prev) => ({ ...prev, end: v }))
    );
    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, [start, mid, end]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-5xl", className)}
    >
      <div className="absolute top-3 left-0">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          {/* Static faint beam */}
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
          />
          {/* Animated gradient beam */}
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#beamGradient)"
            strokeWidth="1.25"
          />
          <defs>
            <linearGradient
              id="beamGradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1="0"
              y2={svgHeight}
            >
              <stop
                stopColor="#18CCFC"
                stopOpacity="0"
                offset={`${offsets.start}`}
              />
              <stop
                stopColor="#18CCFC"
                offset={`${offsets.mid}`}
              />
              <stop
                offset={`${offsets.end}`}
                stopColor="#6344F5"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
