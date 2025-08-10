"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Timeline } from "@/components/ui/timeline";
import { Github, Mail } from "lucide-react";
import { Cover } from "@/components/ui/cover";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiElectron,
  SiTauri,
  SiSupabase,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiUnity,
  SiUnrealengine,
  SiVscodium,
} from "react-icons/si";
import { BiLogoBlender } from "react-icons/bi";
import { VscVscode } from "react-icons/vsc";
import {
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaCuttlefish,
} from "react-icons/fa";

// PROJECTS
const projects = [
  {
    title: "Clipboard Manager for Windows",
    href: "#",
    desc: "Advanced clipboard history + search tool for power users. Built with Electron & better-sqlite3.",
    tech: ["Electron", "SQLite"],
  },
  {
    title: "Note Taking Website",
    href: "#",
    desc: "A lightweight rich-text editor with secure login and cloud sync.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Unity / Unreal Projects",
    href: "#",
    desc: "Large-scale ARPGs, horror, metroidvania, and survival RPGs built in Unity, UE4, and UE5 since 2019.",
    tech: ["Unity", "UE4", "UE5"],
  },
];

// TIMELINE
const timelineData = [
  { title: "2019", content: <p>Started programming with Unity (C#).</p> },
  { title: "2020", content: <p>Moved to Unreal Engine 4.</p> },
  {
    title: "2023",
    content: <p>UE5 experiments & performance-focused projects.</p>,
  },
  {
    title: "2024",
    content: <p>Switched to Electron, Tauri, React, Next.js, and Tailwind.</p>,
  },
];

// ICON MAP
const iconMap: Record<string, React.ElementType> = {
  TS: FaJs,
  JS: FaJs,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  Python: FaPython,
  "C++": FaCuttlefish,
  React: SiReact,
  "Next.js": SiNextdotjs,
  TailwindCSS: SiTailwindcss,
  Vite: SiVite,
  Electron: SiElectron,
  Tauri: SiTauri,
  Supabase: SiSupabase,
  "better-sqlite3": SiPostgresql,
  MongoDB: SiMongodb,
  Postgres: SiPostgresql,
  Prisma: SiPrisma,
  "JSON/txt": SiVite,
  Unity: SiUnity,
  "Unreal Engine 4": SiUnrealengine,
  "Unreal Engine 5": SiUnrealengine,
  "VS Code": VscVscode,
  "Visual Studio 2022": VscVscode,
  "Sublime Text": SiVscodium,
  "Blender": BiLogoBlender,
};

// STACKS
const stacks = [
  { title: "Languages", items: ["TS", "JS", "HTML", "CSS", "Python", "C++"] },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Next.js", "TailwindCSS", "Vite", "Electron", "Tauri"],
  },
  {
    title: "Databases & Storage",
    items: [
      "Supabase",
      "better-sqlite3",
      "MongoDB",
      "Postgres",
      "Prisma",
      "JSON/txt",
    ],
  },
  {
    title: "Game Engines",
    items: ["Unity", "Unreal Engine 4", "Unreal Engine 5", "Blender"],
  },
  {
    title: "Tools & IDEs",
    items: ["VS Code", "Visual Studio 2022", "Sublime Text"],
  },
];

export default function Page() {
  return (
    <main className="bg-background px-4 sm:px-6 py-8 sm:py-12 flex justify-center">
      <div className="relative w-full max-w-5xl min-h-screen flex flex-col">
        {/* Background Grid */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]"
          )}
        />
        {/* Radial Fade */}
        <div className="absolute inset-0 bg-background pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-16 sm:gap-20 py-10 sm:py-14">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 sm:space-y-4 px-2"
          >
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              👋 Hey, I’m <Cover>Danish</Cover>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              I’m a{" "}
              <span className="font-medium">software engineering student</span>{" "}
              who can’t stop tinkering with code. From clipboard managers to
              worlds in Unity, Unreal Engine, Electron, and Tauri.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              If it involves building something cool, I’m probably already on
              it.
            </p>
          </motion.header>

          {/* About Me */}
          <section className="px-2 max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-center">
              <Cover>About Me</Cover>
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p>
                My coding journey started in <strong>2019</strong> with Unity —
                making interactive experiments and learning engine internals.
              </p>
              <p>
                In <strong>2020</strong>, I hopped into Unreal Engine 4, then
                UE5 in 2023, chasing performance and visuals.
              </p>
              <p>
                By 2024, I moved into desktop & web apps — building with
                Electron, Tauri, React, and Next.js.
              </p>
              <p>
                I’m equally happy over-engineering with Supabase + Prisma… or
                going quick & dirty with JSON files.
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="px-2">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              <Cover>My Timeline</Cover>
            </h2>
            <div className="max-w-2xl mx-auto">
              <Timeline data={timelineData} />
            </div>
          </section>

          {/* Projects */}
          <section className="px-2">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              <Cover>Projects</Cover>
            </h2>
            <HoverEffect
              className="max-w-4xl mx-auto"
              items={projects.map((p) => ({
                title: p.title,
                description: p.desc,
                link: p.href,
              }))}
            />
          </section>

          {/* Tech Stack */}
          <section className="px-2">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              <Cover>Tech Stack</Cover>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
              {stacks.map((stack) => (
                <motion.div
                  key={stack.title}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-card/60 backdrop-blur-md rounded-lg p-4 sm:p-5 shadow-sm border border-border hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                    {stack.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {stack.items.map((item) => {
                      const Icon = iconMap[item];
                      return (
                        <li
                          key={item}
                          className="flex items-center gap-2 px-3 py-1 text-xs sm:text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors"
                        >
                          {Icon && <Icon size={16} />}
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto flex flex-col gap-4 sm:gap-5 justify-center text-xs sm:text-sm text-muted-foreground px-2 text-center border-t border-border pt-6">
            <p className="max-w-xl mx-auto leading-relaxed">
              My little corner of the internet to stash cool stuff I’ve built.
              Wanna talk code, games, or cool side projects?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
              <a
                href="mailto:danishmasri74@gmail.com"
                className="hover:text-foreground transition-colors flex items-center gap-2 justify-center"
              >
                <Mail size={14} /> Email
              </a>
              <a
                href="https://github.com/danishmasri74"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-2 justify-center"
              >
                <Github size={14} /> GitHub
              </a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
