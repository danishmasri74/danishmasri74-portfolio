"use client";

import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, useRef, useId, useEffect } from "react";
import { Button } from "./button";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    image?: string;
    content?: React.ReactNode | (() => React.ReactNode);
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [active, setActive] = useState<(typeof items)[number] | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  useOutsideClick(containerRef, () => setHoveredIndex(null));
  useOutsideClick(cardRef, () => setActive(null));

  // Handle ESC key and scroll lock
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = active ? "hidden" : "";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <>
      {/* Background dim */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Expanded card overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 grid place-items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.05, duration: 0.3 }}
          >
            <motion.div
              ref={cardRef}
              layoutId={`card-${active.title}-${id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-[500px] max-h-[90%] overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-3xl flex flex-col shadow-lg"
            >
              {active.image && (
                <motion.img
                  layoutId={`image-${active.title}-${id}`}
                  src={active.image}
                  alt={active.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4 overflow-auto">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="font-bold text-neutral-700 dark:text-neutral-200"
                >
                  {active.title}
                </motion.h3>

                <motion.p
                  layoutId={`description-${active.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {active.description}
                </motion.p>

                {active.link && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.15, duration: 0.25 }}
                  >
                    <Button asChild className="mt-4">
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    </Button>
                  </motion.div>
                )}

                {active.content && (
                  <motion.div
                    className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of cards */}
      <div
        ref={containerRef}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4",
          className
        )}
      >
        {items.map((item, idx) => (
          <motion.div
            key={`${item.link}-${idx}`}
            className="relative group block p-2 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActive(item)}
            layoutId={`card-${item.title}-${id}`}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {item.image && (
              <motion.img
                layoutId={`image-${item.title}-${id}`}
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-2xl"
              />
            )}
            <div className="p-4">
              <motion.h4
                layoutId={`title-${item.title}-${id}`}
                className="text-zinc-100 font-bold tracking-wide mt-4"
              >
                {item.title}
              </motion.h4>
              <motion.p
                layoutId={`description-${item.description}-${id}`}
                className="mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm"
              >
                {item.description}
              </motion.p>
            </div>

            {/* Hover overlay */}
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.1 },
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </>
  );
};
