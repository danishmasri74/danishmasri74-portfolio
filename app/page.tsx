"use client";

import React, { useRef, useState, MouseEvent } from "react";
import Image from "next/image";

interface SiteConfig {
  name: string;
  description: string;
  socials: {
    github: string;
    linkedin: string;
    mail: string;
  };
}

interface Project {
  title: string;
  href: string;
  desc: string;
  img: string;
}

interface Experience {
  year: string;
  detail: string;
}

const siteConfig: SiteConfig = {
  name: "Danish Masri",
  description: "I don't talk much.",
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://www.linkedin.com/in/yourusername",
    mail: "mailto:you@example.com",
  },
};

const placeholderImg = "https://via.placeholder.com/800x400?text=No+Image";

const projects: Project[] = [
  {
    title: "Project One",
    href: "#",
    desc: "A short description of this project.",
    img: "",
  },
  {
    title: "Project Two",
    href: "#",
    desc: "Another project description.",
    img: "",
  },
  { title: "Project Three", href: "#", desc: "Yet another one.", img: "" },
];

const experiences: Experience[] = [
  { year: "2019", detail: "Started developing games using Unity." },
  { year: "2020", detail: "Developed games using Unreal Engine 4 (UE4)." },
  { year: "2023", detail: "Worked with Unreal Engine 5 (UE5)." },
  {
    year: "After 2023",
    detail: "Built several websites and Electron projects.",
  },
];

export default function Page() {
  const rightRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<string>("projects");

  const scrollToSection = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();

    const container = rightRef.current;
    if (!container) return;

    const target = container.querySelector<HTMLElement>("#" + id);
    if (target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const offset = targetRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: offset, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: "about", label: "ABOUT" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "projects", label: "PROJECTS" },
  ];

  return (
    <main className="h-screen overflow-hidden bg-white text-slate-800 antialiased">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 h-full">
        {/* Left column */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="text-3xl font-bold">{siteConfig.name}</h1>
            <p className="mt-4 text-slate-600">{siteConfig.description}</p>

            {/* Nav buttons */}
            <div className="mt-10 flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`flex items-center gap-3 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span
                    className={`h-px flex-1 max-w-[20px] transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-slate-900 w-8"
                        : "bg-slate-400 w-5"
                    }`}
                  ></span>
                  <span
                    className={
                      activeSection === item.id ? "font-bold" : "font-normal"
                    }
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <nav className="mt-8 flex gap-4 text-sm text-slate-500">
            <a
              href={siteConfig.socials.github}
              className="hover:text-slate-800"
            >
              GitHub
            </a>
            <a
              href={siteConfig.socials.linkedin}
              className="hover:text-slate-800"
            >
              LinkedIn
            </a>
            <a href={siteConfig.socials.mail} className="hover:text-slate-800">
              Email
            </a>
          </nav>
        </div>

        {/* Right column with scroll */}
        <div
          ref={rightRef}
          className="space-y-12 pb-8 pr-4 h-full overflow-y-auto"
        >
          {/* About */}
          <section id="about">
            <h2 className="text-xl font-semibold mb-3">About Me</h2>
            <p className="text-slate-600">
              I’m a developer with a passion for creating interactive
              experiences, from games to web applications. I value simplicity
              and functionality in my work.
            </p>
          </section>

          {/* Experience */}
          <section id="experience">
            <h2 className="text-xl font-semibold mb-3">Experience</h2>
            <ul className="border-l border-slate-300 pl-4 space-y-5">
              {experiences.map((exp) => (
                <li key={exp.year}>
                  <div className="text-sm font-medium text-slate-800">
                    {exp.year}
                  </div>
                  <p className="text-slate-600 text-sm">{exp.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section id="projects">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="flex flex-col gap-4">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={p.img || placeholderImg}
                    alt={p.title}
                    width={800}
                    height={400}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-slate-600">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
