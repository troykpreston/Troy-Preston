import media from "@/content/media.generated.json";
import { withBase } from "@/lib/base-path";
/**
 * Global site identity. Everything personal lives here.
 * Source: _assets/Resume.docx (software-engineering sections).
 * Fields set to `null` are hidden or rendered as a quiet placeholder.
 */
export const linkedin = "https://www.linkedin.com/in/troy-k-preston-0b9b05114/";

export const site = {
  name: "Troy K. Preston",
  /** Shown in the header wordmark. */
  wordmark: "Troy Preston",
  role: "Senior AI Engineer",
  url: "https://troykpreston.github.io/Troy-Preston",
  description:
    "Troy K. Preston — Senior AI Engineer with 6+ years building production software: computer vision and identity verification, AI workflow platforms, and scalable web, mobile and cloud-native applications.",

  /** Hero headline. Each string is one line of the masked reveal; wrap words in *asterisks* for the italic serif accent. */
  headline: ["I turn *complex systems*", "into elegant,", "reliable software."],

  /** Short paragraph beside the hero headline. */
  intro:
    "Senior AI Engineer with 6+ years building production software — computer vision and identity verification, AI workflow platforms, and the web, mobile and cloud systems around them.",

  /** The statement that lights up word by word as you scroll. */
  statement:
    "Six-plus years building scalable web, mobile and cloud-native software across SaaS, enterprise and telecommunications — modernising legacy systems, designing microservice architectures, and mentoring the teams that run them.",

  location: "Richmond, Virginia" as string | null,
  timezone: "America/New_York" as string | null, // enables the live clock
  availability: "Open to select engagements" as string | null,

  email: "keithpreston2026@gmail.com",
  phone: "(804) 304-1890" as string | null,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/troy-k-preston-0b9b05114/" as string | null },
    { label: "GitHub", href: null as string | null },
  ],

  /** Professional background — software engineering roles, most recent first. */
  experience: [
    {
      period: "2026 — Present",
      role: "Senior AI Engineer (Contract)",
      company: "Confidential client (NDA)",
      note: null,
    },
    {
      period: "2023 — 2026",
      role: "Senior Software Engineer",
      company: "PartnerStack",
      note: "Scalable SaaS platform features in React, TypeScript and Java; led modernisation for performance, maintainability and deployment efficiency.",
    },
    {
      period: "2022 — 2023",
      role: "Senior Software Engineer",
      company: "3Pillar Global",
      note: "Enterprise microservices and SPAs for high-traffic client platforms; part of a monolith-to-microservices migration.",
    },
    {
      period: "2022",
      role: "Intermediate Technical Developer",
      company: "Jonah Group",
      note: "Full-stack enterprise applications in Angular, Spring Boot and PostgreSQL; ADA/WCAG accessibility and synthetic monitoring.",
    },
    {
      period: "2020 — 2022",
      role: "Technical Developer",
      company: "Jonah Group",
      note: "Web and mobile apps in React, Flutter and Spring Boot; PDF reporting systems and ORM work that cut reporting times by up to 10×.",
    },
    {
      period: "2017 — 2018",
      role: "Software Developer Co-op",
      company: "Ericsson",
      note: "Enterprise mobile software for telecom deployment systems; automated Java testing and iOS features in Objective-C.",
    },
  ] as { period: string | null; role: string | null; company: string | null; note: string | null }[],

  education: [
    { period: "2014 — 2019", degree: "BSc, Computer Science and Physics", school: "Western University" },
  ],

  /** Grouped technical skills. */
  skills: [
    { group: "AI & CV", items: ["PyTorch", "ONNX Runtime", "OpenCV", "Face recognition", "Liveness detection", "OCR"] },
    { group: "Languages", items: ["JavaScript", "TypeScript", "Java", "Python", "SQL", "HTML5", "CSS3"] },
    { group: "Frontend", items: ["React", "Angular", "Redux", "Next.js", "Flutter", "Tailwind CSS"] },
    { group: "Backend", items: ["Spring Boot", "Node.js", "Express.js", "REST APIs", "Microservices"] },
    { group: "Cloud & DevOps", items: ["AWS", "Firebase", "Docker", "Jenkins", "GitHub Actions", "CI/CD"] },
    { group: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Firestore"] },
    { group: "Testing", items: ["JUnit", "Jest", "Cypress", "Selenium", "Playwright"] },
  ],

  /** Short biography paragraphs for the About section. */
  bio: [
    "I specialise in full-stack development with TypeScript, React, Angular, Java, Spring Boot and Python on AWS and Firebase — modernising legacy systems, optimising performance, designing microservice architectures and mentoring engineering teams. I care about reliable, user-focused software, with a strong emphasis on scalability, automation, accessibility and clean engineering practice.",
  ] as string[],

  /** Portrait — _assets/Profile.png, resolved through the asset manifest (filenames are fingerprinted). */
  portrait: ((src) => (src ? withBase(src) : null))(media.__brand.find((m) => m.file === "Profile.png")?.src) as string | null,
};

/** Areas of practice. `evidence` links to project slugs so every claim points at real work. */
export const capabilities = [
  {
    title: "AI engineering",
    body: "Agent orchestration, model pipelines, evaluation and the infrastructure that keeps them honest.",
    evidence: ["aether", "id-verify"],
  },
  {
    title: "Full-stack product engineering",
    body: "Web platforms, dashboards and the APIs behind them — from data model to the last pixel.",
    evidence: ["fund-clarity", "telebook", "tavola"],
  },
  {
    title: "Identity & access",
    body: "Biometric verification, document authenticity, appointments and physical access control.",
    evidence: ["id-verify", "telebook"],
  },
  {
    title: "Enterprise data & automation",
    body: "Financial reporting, data ingestion and research automation for organisations that run on data.",
    evidence: ["fund-clarity", "bd-clarity"],
  },
  {
    title: "Mobile applications",
    body: "Mobile experiences and SDKs for iOS and Android, built alongside the web platforms they serve.",
    evidence: ["id-verify", "telebook", "tavola"],
  },
  {
    title: "System integrations",
    body: "Webhooks, SDKs, messaging and third-party services stitched into one dependable whole.",
    evidence: ["aether", "bd-clarity", "fund-clarity"],
  },
];
