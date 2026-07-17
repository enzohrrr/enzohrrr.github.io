/**
 * Single source of truth for site-wide, non-project data.
 *
 * Everything here is plain data so it can be edited without touching components.
 * Components import `siteConfig` and render from it — never hardcode these values
 * inline. Project content lives separately under `content/projects/*.mdx`.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** Icon key, resolved in the SocialLinks component. */
  icon: "github" | "linkedin" | "mail";
};

export type NavItem = {
  label: string;
  href: string;
};

export type ExpertiseArea = {
  title: string;
  description: string;
  /** lucide-react icon name. */
  icon: string;
};

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  detail: string;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://enzohrrr.github.io";

export const siteConfig = {
  url: siteUrl,
  name: "Enzo Herrera",
  role: "Game Programmer",
  /** Short tagline used in hero + meta description. */
  tagline:
    "Game programmer specialized in C++, Unreal Engine, multiplayer, and modular gameplay frameworks.",
  /** Longer one-liner for the home hero subtitle. */
  intro:
    "I build multiplayer systems and reusable gameplay frameworks in C++ on Unreal Engine.",
  email: "herrera.enzo26@gmail.com",
  location: "France",
  /** Profile photo (in /public). */
  photo: "/images/enzo-herrera.jpg",

  /** Primary navigation, consumed by Header + MobileNav. */
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  social: [
    {
      label: "GitHub",
      href: "https://github.com/enzohrrr",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/enzo-herrera-gp/",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:herrera.enzo26@gmail.com",
      icon: "mail",
    },
  ] satisfies SocialLink[],

  /** Headline areas of expertise, shown on Home + About. */
  expertise: [
    {
      title: "C++ & Gameplay Programming",
      description:
        "Gameplay systems, UI, and component-based architecture in C++ and Blueprints.",
      icon: "Cpu",
    },
    {
      title: "Unreal Engine",
      description: "Plugins, tools, and gameplay systems on Unreal Engine 4 and 5.",
      icon: "Gamepad2",
    },
    {
      title: "Multiplayer & Networking",
      description:
        "Server-authoritative design, replication, and client-server architecture.",
      icon: "Network",
    },
    {
      title: "Frameworks & Architecture",
      description:
        "Modular frameworks built on fragment composition, gameplay tags, and GAS.",
      icon: "Boxes",
    },
  ] satisfies ExpertiseArea[],

  /** Grouped skill list, rendered on the About page. */
  skills: [
    {
      group: "Engines",
      items: ["Unreal Engine 4 & 5", "Unity"],
    },
    {
      group: "Programming",
      items: [
        "C++",
        "C#",
        "Blueprints",
        "Gameplay Systems",
        "UI Programming",
        "Online Programming",
      ],
    },
    {
      group: "Networking",
      items: [
        "Replication",
        "Session Management",
        "Client-Server Architecture",
        "Lag Compensation",
        "Gameplay Synchronization",
        "Steam & EOS",
      ],
    },
    {
      group: "Practices",
      items: [
        "Clean Architecture",
        "Data-Oriented Design",
        "Object Oriented Programming",
        "Composition over Inheritance",
        "Component-Based Design",
      ],
    },
    {
      group: "Tools & Workflow",
      items: ["Git / GitHub", "Plastic SCM", "Jira", "HacknPlan"],
    },
    {
      group: "Versatility",
      items: ["Game Design", "3D Modeling", "UI & UX"],
    },
  ],

  /** Professional experience, newest first (About page timeline). */
  experience: [
    {
      period: "2025 – Present",
      title: "Game Programmer",
      org: "Legion: We Are Many",
      detail:
        "Building the Mirage Game Framework (MGF), a modular server-authoritative gameplay framework for UE5, plus indie games that showcase its scalability.",
    },
    {
      period: "2023 – 2024",
      title: "Online Programming Intern",
      org: "GENEZ",
      detail:
        "Multiplayer networking and online programming with Mirror & FizzySteamworks.",
    },
    {
      period: "2019",
      title: "Observation Internship",
      org: "6tematik",
      detail: "First hands-on exposure to a software development studio.",
    },
  ] satisfies TimelineEntry[],

  /** Education, newest first (About page timeline). */
  education: [
    {
      period: "2025",
      title: "Bachelor's Degree in Technical Game Design",
      org: "ICAN Lyon",
      detail: "",
    },
    {
      period: "2021",
      title: "General Baccalaureate",
      org: "Computer Science, Mathematics & English focus",
      detail: "",
    },
  ] satisfies TimelineEntry[],

  /** Tech keywords scrolled in the home marquee. */
  techStrip: [
    "Unreal Engine 5",
    "C++",
    "Gameplay Ability System",
    "Replication",
    "Multiplayer",
    "Niagara",
    "Blueprints",
    "Gameplay Tags",
    "Server-Authoritative",
    "FastArray",
  ],

  /** Headline numbers, shown as animated count-up stats on the home page. */
  stats: [
    { value: 11, suffix: "", label: "Framework modules" },
    { value: 10, suffix: "", label: "Gameplay systems" },
    { value: 100, suffix: "%", label: "Server-authoritative" },
    { value: 5, suffix: ".7", label: "Unreal Engine" },
  ],

  /** Favorite games, shown as a key-visual grid on the About page (in order). */
  favoriteGames: [
    { title: "Dark Souls III", image: "/images/about/dark-souls-3.jpg" },
    { title: "Elden Ring", image: "/images/about/elden-ring.jpg" },
    {
      title: "Clair Obscur: Expedition 33",
      image: "/images/about/clair-obscur.jpg",
    },
    {
      title: "Dark Souls: Remastered",
      image: "/images/about/dark-souls-remastered.jpg",
    },
    {
      title: "Elden Ring Nightreign",
      image: "/images/about/elden-ring-nightreign.jpg",
    },
    {
      title: "The Witcher 3: Wild Hunt",
      image: "/images/about/the-witcher-3.jpg",
    },
    { title: "Devil May Cry 5", image: "/images/about/devil-may-cry-5.jpg" },
    {
      title: "Granblue Fantasy: Relink",
      image: "/images/about/granblue-relink.jpg",
    },
    {
      title: "Monster Hunter World: Iceborne",
      image: "/images/about/monster-hunter-world.jpg",
    },
    {
      title: "Monster Hunter Wilds",
      image: "/images/about/monster-hunter-wilds.jpg",
    },
    { title: "Hollow Knight", image: "/images/about/hollow-knight.jpg" },
    {
      title: "Heroes of Might and Magic III",
      image: "/images/about/heroes-might-magic.jpg",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
