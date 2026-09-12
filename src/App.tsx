import { useState, useEffect, useRef, Children } from "react";
import {
  Linkedin, ExternalLink, Github, ArrowLeft, ArrowRight, MapPin, Mail, Star,
  ChevronRight, BookOpen, Code2, Heart, Award, Zap, Gamepad2, GraduationCap,
  Briefcase, Layers, Instagram, Phone, FileDown, Contrast,
} from "lucide-react";
import myPhoto from "./assets/me2.png";
import logo from "./assets/logo.png";
import vitMeritScholarship from "./assets/vit-merit-scholarship.jpg";
import harvardCs50Certificate from "./assets/harvard-cs50-certificate.jpg";
import harvardCybersecurityCertificate from "./assets/harvard-cybersecurity-certificate.jpg";
import starpupilaward from "./assets/star-pupil-award.jpg";
import courseraBusinessAnalysisCertificate from "./assets/coursera-business-analysis-certificate.jpg";
import commonwealthbank from "./assets/commonwealth-bank-certificate.jpg";
import standardchartered from "./assets/standard-chartered-certificate.jpg";
import wellsfargo from "./assets/wells-fargo-certificate.jpg";
import awssolutionsarchitect from "./assets/aws-solutions-architecture.jpg";
import aipendo from "./assets/aipendo.jpg";
// ─── Fonts ──────────────────────────────────────────────────────────────────
const FONT = "'Plus Jakarta Sans', sans-serif";
const MONO = "'DM Mono', monospace";

// ─── Color mode ─────────────────────────────────────────────────────────────
// A single pastel, consistent palette is used everywhere. "Professional mode"
// doesn't swap colors — it drops a grayscale filter over the whole page, so
// every pixel genuinely becomes black & white, structure and hierarchy intact.
type Mode = "actual" | "pro";
interface Pal {
  page: string; card: string; cardFg: string; muted: string;
  dark: string; darkFg: string; accent: string; accentFg: string;
  border: string; folder: string[];
}
const PASTEL: Pal = {
  page: "#15130f",
  card: "#FFFFFF",
  cardFg: "#332C22",
  muted: "#9C9182",
  dark: "#3F372B",
  darkFg: "#FBF7EF",
  accent: "#E9C08A",
  accentFg: "#332C22",
  border: "rgba(51,44,34,0.09)",
  folder: ["#F0DDA6", "#BFDCC3", "#AFCFE0", "#EFC4C4", "#D2C2E3", "#E3D0B4", "#B7E0D1"],
};

// ─── Data ───────────────────────────────────────────────────────────────────
const about = {
  name: "Swetha Adaikkammai",
  role: "Student | Aspiring Data / Business Analyst & Product Designer | ML Enthusiast | Community Builder",
  headline: "Creating things that matter, at the intersection of business, design & tech.",
  bio: "Passionate Student, aspiring Data / Business Analyst, Product Designer, ML Enthusiast and a Community Builder with a keen interest in solving real-world problems through innovation, user-centric design, and strategic thinking. I enjoy building meaningful projects, creating impactful experiences, and contributing to communities that drive positive change.",
  location: "Bangalore, India",
  email: "swethaadaikks@gmail.com",
  linkedin: "https://www.linkedin.com/in/swetha-adaikkammai-aba99428a",
  phone: "+91 7010734009",
  instagram: "swethaa.29",
  resume: "https://drive.google.com/file/d/1UPTOqdEw34cjtA6oE4tif0TrLgg4aS1V/view?usp=sharing",
  stat1val: "4+", stat1label: "Projects",
  stat2val: "5+", stat2label: "Months of Working Experience",
  stat3val: "3+", stat3label: "Years of Coding",
};
const FOCUS_WORDS = ["Data Analysis", "Business Intelligence", "Product Development", "Machine Learning", "Community Development", "Risk Assessment", "Process Optimization", "Strategic Thinking"];

const EDUCATION = [
  { id: 1, institution: "Vellore Institute of Technology", degree: "Integrated M.Tech Software Engineering", year: "2023 – 2028", score: "9.42 / 10", details: "Relevant coursework: Machine Learning, AI, Data Structures, Algorithms, Web Development, Database Systems, Requirement Analysis" },
  { id: 2, institution: "Christ Junior College", degree: "Higher Secondary: Science (PCM + CS)", year: "2021 – 2023", score: "95.4%", details: "Active in Projects and Cultural Committees." },
  { id: 3, institution: "Christ School ICSE", degree: "High School", year: "2011 – 2021", score: "98.2%", details: "School Level Second Rank Holder, Star Pupil of the Batch Award Recipient." },
];

const WORK_EXPERIENCE = [
  { id: 1, title: "Toyota Kirloskar Motor Pvt. Ltd", tech: "Power BI · Power Apps · Python · Jupyter · HTML · CSS · JavaScript", description: "Collaborated with stakeholders to analyze business requirements, derive data-driven insights, and develop Power Apps solutions that streamlined workflows and improved productivity.", link: "https://drive.google.com/file/d/1RppIGxtVAnBZ9v0QtSGPyy6R1Xp4YvNe/view?usp=sharing", year: "2026", tag: "Business Analytics" },
  { id: 2, title: "DARIS", tech: "Figma · PRD", description: "Contributed to IIHS website redevelopment with UI/UX and responsive design improvements, and worked with luxury furniture brand The August Company on social media creatives and website design.", link: "https://drive.google.com/file/d/1HDTJzccPqEhlQj0R02OvJNeFjVOMd0_F/view?usp=sharing", year: "2026", tag: "UI/UX · Product Design" },
];

const SKILLS = [
  { id: 1, category: "Data & Analytics", skills: ["Python", "Jupyter", "SQL", "PostgreSQL", "MySQL", "MongoDB", "Power BI", "Tableau", "Excel"] },
  { id: 2, category: "Machine Learning & AI", skills: ["Pandas", "NumPy", "Scikit-learn", "PyTorch", "TensorFlow", "Reinforcement Learning", "LLM", "RAG", "NLP"] },
  { id: 3, category: "Design & Product", skills: ["Figma", "Product Analysis", "PRD Writing", "UI/UX", "Wireframing"] },
  { id: 4, category: "Business & Risk", skills: ["Risk Assessment", "Financial Modeling", "Business Communication", "PowerPoint"] },
  { id: 5, category: "Core CS", skills: ["Java", "C/C++", "OOPs", "DBMS", "Networking"] },
  { id: 6, category: "Web", skills: ["HTML", "CSS", "JavaScript", "React"] },
  { id: 7, category: "Tools & Platforms", skills: ["Git", "GitHub", "Power Apps", "Docker", "Kubernetes"] },
];

const PROJECTS = [
  { id: 1, title: "Uplift Modeling for Targeted Marketing", tech: "Python · Scikit-learn · CausalML · Pandas", description: "Built an uplift model to identify persuadable customers, directing marketing spend toward users who convert because of the campaign rather than those who'd convert anyway — maximizing incremental revenue.", link: "https://github.com", year: "2026", tag: "Marketing Analytics · Causal Inference" },
  { id: 2, title: "Price Elasticity Estimation Under Confounding", tech: "Python · Statsmodels · Instrumental Variables", description: "Estimated price elasticity of demand while correcting for confounding factors using instrumental variable and causal inference techniques, avoiding biased elasticity estimates from naive regression.", link: "https://github.com", year: "2026", tag: "Econometrics · Pricing Strategy" },
  { id: 3, title: "Regime-Dependent Correlation Breakdown Detector", tech: "Python · Pandas · Rolling Correlation · Regime-Switching Models", description: "Detects periods where asset correlations spike during market stress, exposing the 'diversification illusion' — portfolios that look diversified in calm markets but collapse together in a crisis.", link: "https://github.com", year: "2026", tag: "Quantitative Finance · Risk Management" },
  { id: 4, title: "Prediction Market for Corporate Events", tech: "Python · Financial Ratios · Governance Data · Classification Models", description: "Built a model estimating the probability of specific corporate events — dividend cuts, credit downgrades, CEO departures — using financial ratios and governance data.", link: "https://github.com", year: "2026", tag: "Corporate Finance · Predictive Modeling" },
  { id: 5, title: "High-Frequency Competitor Price Matching Engine", tech: "Python · Deep Q-Networks · Reinforcement Learning · Simulation", description: "Developed a dynamic pricing agent using DQN, with state space covering inventory, time-to-expiration, and competitor prices, trained to maximize gross margin instead of just matching competitor moves.", link: "https://github.com", year: "2026", tag: "Reinforcement Learning · Dynamic Pricing" },
  { id: 6, title: "Graph Analytics for Financial Fraud & AML", tech: "Python · NetworkX · Neo4j · PyTorch Geometric", description: "Modeled financial transactions as a directed graph to catch multi-hop money laundering networks and mule accounts using PageRank, Louvain community detection, and GNNs — patterns row-by-row SQL misses.", link: "https://github.com", year: "2026", tag: "Graph Analytics · Financial Forensics" },
  { id: 7, title: "Motor Company Sales War Room with a What-If Simulator", tech: "Power BI · Python · Scenario Simulation", description: "Interactive sales war room with a what-if simulator for a motor company — enabling stakeholders to model business outcomes across pricing, volume, and channel mix levers.", link: "https://github.com", year: "2026", tag: "Business Analytics · Simulation" },
  { id: 8, title: "NYC Airbnb Analytics", tech: "Jupyter · Python · MySQL · Power BI", description: "An interactive dashboard web application that solves a real business problem. Gives business insights and improvements for success.", link: "https://github.com", year: "2026", tag: "Business Analytics" },
  { id: 9, title: "Zepto PRD and Freshness Badge Indicator", tech: "Figma · PRD", description: "Product requirements document and UI/UX design for Zepto's freshness badge indicator feature — communicating produce quality to shoppers at a glance.", link: "https://github.com", year: "2026", tag: "UI/UX · Product Design" },
];
const PROJECT_COLORS = ["#E9C08A", "#AFCFE0", "#BFDCC3", "#EFC4C4", "#D2C2E3", "#E3D0B4", "#B7E0D1", "#DAC7E8", "#EDCBA6"];

const VOLUNTEERING = [
  { id: 1, org: "YFS — Youth For Seva", role: "Programme Volunteer", period: "2024 – Present", description: "Participated in 10+ online community outreach events including literacy drives, cleanliness campaigns, and health awareness programs reaching 500+ beneficiaries." },
  { id: 2, org: "Connect For", role: "Teaching and Study Material Preparation Volunteer", period: "2025 – Present", description: "Mentored underprivileged students. Made audiobooks for blind children." },
];

const EXTRAS = [
  { id: 1, title: "Vice Chairperson", org: "VIT Dance Club", period: "2025 – Present", description: "Led a team of 300 to participate in nationwide fests, organize workshops and events. Grew membership by 30%." },
  { id: 2, title: "Senior Core", org: "Pixelate", period: "2024 – 2025", description: "Learned and managed design activities for the club." },
  { id: 3, title: "Design Coordinator", org: "Gravitas-2025, VIT Vellore", period: "2025", description: "Social media and merch designs for college tech fest Gravitas'25." },
];

// `image` is optional — import a real photo/scan of the award or certificate
// and pass it here (e.g. `image: starPupilPhoto` after `import starPupilPhoto
// from "./assets/star-pupil.jpg"`). Leave it unset/null to keep the numbered
// placeholder tile.
const ACHIEVEMENTS = [
  { id: 1, num: "01", tag: "Award", title: "Star Pupil of the Batch", org: "Christ School, ICSE", description: "Awarded for outstanding academic and extracurricular performance across the graduating batch.", link: null as string | null, image: starpupilaward as string | null },
  { id: 2, num: "02", tag: "Certificate", title: "Merit Scholarship Holder", org: "Vellore Institute of Technology", description: "Awarded for consistently maintaining a top 6 CGPA (9.42) ranking in my batch through every semester to date.", link: "https://drive.google.com/file/d/1GBknM4d2qpZbCHBVaQjMAxzzUrmcNCPb/view?usp=sharing", image: vitMeritScholarship as string | null },
  { id: 3, num: "03", tag: "Certificate", title: "Introduction to Computer Science", org: "Harvard", description: "Completed Harvard's CS50 course, building a foundation in algorithms, data structures, and problem-solving across C, Python, SQL, and web development.", link: "https://drive.google.com/file/d/1GfMIjuwxPXD_bPt_nUF9An8uVX8d5cXP/view?usp=sharing", image: harvardCs50Certificate as string | null },
  { id: 4, num: "04", tag: "Certificate", title: "CyberSecurity", org: "Harvard", description: "Completed Harvard's CyberSecurity course, gaining foundational knowledge in cybersecurity principles and practices.", link: "https://drive.google.com/file/d/14hN8GaGFF0OEf0CSZ4zL7JYzbHMuZB5M/view?usp=sharing", image: harvardCybersecurityCertificate as string | null },
  { id: 5, num: "05", tag: "Certificate", title: "Business Analysis & Process Management", org: "Coursera", description: "Completed a comprehensive course on business analysis and process management.", link: "https://drive.google.com/file/d/1kURTYlWs9es02VHJ9FZ6R35O4TJ4P8p7/view?usp=sharing", image: courseraBusinessAnalysisCertificate as string | null },
  { id: 6, num: "06", tag: "Certificate", title: "Introduction to Data Science", org: "Commonwealth Bank", description: "Completed a intensive data analysis job simulation in a Commonwealth Bank environment.", link: "https://drive.google.com/file/d/1c5JVZr9r1fFxmzdTysHywDkqsmJ9nHEE/view?usp=sharing", image: commonwealthbank as string | null },
  { id: 7, num: "07", tag: "Certificate", title: "Credit Analysis", org: "Standard Chartered", description: "Completed a comprehensive job simulation on credit data analytics and its applications in fintech.", link: "https://drive.google.com/file/d/1VLIvh4AUCnMBsAHmNiRY0WQHKZPXniE4/view?usp=sharing", image: standardchartered as string | null },
  { id: 8, num: "08", tag: "Certificate", title: "Software Engineering", org: "Wells Fargo", description: "Completed a comprehensive course on software engineering principles and practices.", link: "https://drive.google.com/file/d/1_y93YZGDNKXAtKtChk81T7pQA2AHkwTV/view?usp=sharing", image: wellsfargo as string | null },
  { id: 9, num: "09", tag: "Certificate", title: "AWS Solutions Architect", org: "Amazon Web Services", description: "Completed a comprehensive course on AWS solutions architecture principles and practices.", link: "https://drive.google.com/file/d/1IiVlxJqvqYkOVvdhedr0EMszkc9tvZg3/view?usp=sharing", image: awssolutionsarchitect as string | null },
  { id: 10, num: "10", tag: "Certificate", title: "AI for Product Management", org: "Google Cloud", description: "Completed a comprehensive course on AI and its use in product management.", link: "https://drive.google.com/file/d/1seZS4ieupYSGwVlyloea_67Jj3NJTVc3/view?usp=sharing", image: aipendo as string | null },
];



const PLAYGROUND = [
  { id: 1, title: "Momentum — Daily Progress Tracker", category: "Productivity", description: "A gamified daily logging app for building habits — write journal entries, attach progress photos, run dedicated focus timers, and keep your streak alive. Turns consistency into a game.", link: "https://github.com" },
  { id: 2, title: "Quote of the Day Generator", category: "Creative Coding", description: "Fetches and displays a fresh quote daily with a generative gradient background, unique to the date. No two days look the same.", link: "https://github.com" },
  { id: 3, title: "Color Palette Extractor", category: "Creative Coding", description: "Upload an image, extract its dominant color palette using k-means clustering in-browser, and export as CSS variables or a Tailwind config.", link: "https://swethaadaikkammai.github.io/palatte-web/" },
  { id: 4, title: "Pixel Art Generator", category: "Creative Coding", description: "Converts images into pixel art grids in the browser. A fun experiment in Canvas APIs.", link: "https://github.com" },
];

// Shared page-width container so every section, the nav pill, and every
// card line up on exactly the same edges.
const CONTAINER = "max-w-7xl mx-auto px-5 lg:px-10";

// ─── Motion system ──────────────────────────────────────────────────────────
// One centralized config + a handful of primitives, reused everywhere instead
// of one-off transitions scattered across every section.
const MOTION = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  fast: "180ms",
  normal: "350ms",
  slow: "650ms",
  reveal: "750ms",
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// Fires once when an element first enters the viewport.
function useInView<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

// Reveals children once, when scrolled into view: opacity + translateY (+ a
// touch of blur). `delay` is used to stagger a group of these.
function Reveal({
  children, delay = 0, y = 26, className = "", style = {},
}: {
  children: React.ReactNode; delay?: number; y?: number; className?: string; style?: React.CSSProperties;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const shown = inView || reduced;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        filter: shown ? "blur(0px)" : "blur(4px)",
        transition: reduced
          ? `opacity ${MOTION.normal} ${MOTION.ease}`
          : `opacity ${MOTION.reveal} ${MOTION.ease} ${delay}ms, transform ${MOTION.reveal} ${MOTION.ease} ${delay}ms, filter ${MOTION.reveal} ${MOTION.ease} ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Wraps a list of children, staggering each one's Reveal delay — used so
// rows / cards feel manually placed rather than appearing all at once.
function StaggerReveal({
  children, stagger = 90, y = 24, startDelay = 0, className = "",
}: {
  children: React.ReactNode; stagger?: number; y?: number; startDelay?: number; className?: string;
}) {
  const items = Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal key={i} delay={startDelay + i * stagger} y={y}>{child}</Reveal>
      ))}
    </div>
  );
}

// Normalized cursor position (-0.5..0.5) within a container element — the
// basis for every subtle parallax / tilt interaction on the site.
function useContainerPointer<T extends HTMLElement>(disabled = false) {
  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setPos({ x, y }));
    };
    const onLeave = () => setPos({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [disabled]);
  return { ref, pos };
}

// Thin top-of-page scroll progress, 0 → 1.
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return progress;
}

// Whether the page has scrolled past a threshold — drives the nav's
// compress-on-scroll behaviour.
function useScrolled(threshold = 28) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// Which section is currently centred in the viewport — drives the sliding
// active pill in the nav.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }); },
      { rootMargin: "-42% 0px -50% 0px", threshold: [0, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

// Thin accent progress bar fixed to the top of the viewport.
function ScrollProgressBar({ p, progress }: { p: Pal; progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          background: p.accent,
          transition: "width 120ms linear",
          boxShadow: progress > 0.02 ? `0 0 8px ${p.accent}88` : "none",
        }}
      />
    </div>
  );
}

// Shared tactile CTA interaction: lifts on hover, deepens shadow, settles
// back down on click. Icons inside should use `.cta-arrow` to nudge on hover.
function AnimatedCTA({
  href, onClick, children, bg, fg, className = "", external = true, as, style = {},
}: {
  href?: string; onClick?: () => void; children: React.ReactNode; bg: string; fg: string;
  className?: string; external?: boolean; as?: "button"; style?: React.CSSProperties;
}) {
  const Tag: any = as === "button" || !href ? "button" : "a";
  return (
    <Tag
      href={href}
      onClick={onClick}
      target={href && external ? "_blank" : undefined}
      rel={href && external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-2 font-semibold rounded-full active:translate-y-0 active:scale-[0.98] hover:-translate-y-[2px] hover:shadow-[0_10px_22px_-8px_rgba(51,44,34,0.45)] ${className}`}
      style={{ background: bg, color: fg, transitionProperty: "transform, box-shadow", transitionDuration: MOTION.normal, transitionTimingFunction: MOTION.ease, ...style }}
    >
      {children}
    </Tag>
  );
}

// Underline that draws in on hover instead of a static text-decoration.
function UnderlineLink({
  href, children, color, className = "", external = true, style = {},
}: { href: string; children: React.ReactNode; color: string; className?: string; external?: boolean; style?: React.CSSProperties }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group relative inline-flex items-center gap-1.5 w-fit ${className}`}
      style={{ color, ...style }}
    >
      {children}
      <span
        className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100"
        style={{ background: color, transition: `transform ${MOTION.normal} ${MOTION.ease}` }}
      />
    </a>
  );
}

// Rests at a resting tilt angle, straightens + lifts on hover — the pinboard
// physics used for Experience cards.
function PinboardCard({
  angle, children, className = "", style = {},
}: { angle: number; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group ${className}`}
      style={{
        transform: hover ? "rotate(0deg) translateY(-6px)" : `rotate(${angle}deg) translateY(0px)`,
        transition: `transform ${MOTION.slow} ${MOTION.ease}, box-shadow ${MOTION.slow} ${MOTION.ease}`,
        boxShadow: hover ? "0 24px 44px -14px rgba(51,44,34,0.38)" : "0 10px 26px rgba(51,44,34,0.10)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Smooth height/opacity open-close using the grid-template-rows trick, so no
// JS measurement of scrollHeight is needed. Used by the skill folders.
function FolderReveal({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: `grid-template-rows ${MOTION.slow} ${MOTION.ease}` }}>
      <div style={{ overflow: "hidden", opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(-6px)", transition: `opacity ${MOTION.normal} ${MOTION.ease} ${open ? "120ms" : "0ms"}, transform ${MOTION.normal} ${MOTION.ease} ${open ? "120ms" : "0ms"}` }}>
        {children}
      </div>
    </div>
  );
}

// ─── Shared bits ────────────────────────────────────────────────────────────

function Card({ children, p, className = "", style = {} }: { children: React.ReactNode; p: Pal; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(51,44,34,0.18)] transition-colors duration-300 ${className}`}
      style={{ background: p.card, color: p.cardFg, border: `1px solid ${p.border}`, ...style }}
    >
      {children}
    </div>
  );
}

function Pill({ children, p, tone = "muted" }: { children: React.ReactNode; p: Pal; tone?: "muted" | "dark" | "card" | "accent" }) {
  const styles: Record<string, React.CSSProperties> = {
    muted: { background: `${p.cardFg}0f`, color: p.muted },
    dark: { background: p.dark, color: p.darkFg },
    card: { background: p.card, color: p.cardFg },
    accent: { background: p.accent, color: p.accentFg },
  };
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase"
      style={{ fontFamily: MONO, ...styles[tone] }}
    >
      {children}
    </span>
  );
}

function SectionHeader({ p, label, title, sub }: { p: Pal; label: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10">
      <Pill p={p}>{label}</Pill>
      <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-3 leading-tight tracking-tight">{title}</h2>
      {sub && <p style={{ color: p.muted }} className="text-base leading-relaxed max-w-xl">{sub}</p>}
    </div>
  );
}

// ─── Professional-mode switch: small, sits just left of the LinkedIn button ─
function ModeSwitch({ mode, setMode, p, dark = false }: { mode: Mode; setMode: (m: Mode) => void; p: Pal; dark?: boolean }) {
  const isPro = mode === "pro";
  const iconColor = dark ? "#FFFFFF" : p.cardFg;
  const trackOff = dark ? "rgba(255,255,255,0.18)" : `${p.cardFg}22`;
  const trackOn = dark ? p.accent : p.dark;
  return (
    <button
      onClick={() => setMode(isPro ? "actual" : "pro")}
      className="flex items-center gap-1.5 pl-1 group"
      aria-label="Toggle professional (black & white) mode"
      title={isPro ? "Professional mode: on" : "Professional mode: off"}
    >
      <Contrast size={13} style={{ color: iconColor, opacity: isPro ? 1 : 0.5 }} />
      <span
        className="relative w-8 h-[18px] rounded-full transition-colors duration-300 flex items-center px-0.5"
        style={{ background: isPro ? trackOn : trackOff }}
      >
        <span
          className="w-3.5 h-3.5 rounded-full transition-transform duration-300"
          style={{ background: "#fff", transform: isPro ? "translateX(14px)" : "translateX(0)" }}
        />
      </span>
    </button>
  );
}

// ─── Animated, count-up stat ────────────────────────────────────────────────
function StatCounter({ value, label, p }: { value: string; label: string; p: Pal }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [settled, setSettled] = useState(false);
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    let started = false;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const duration = 1200;
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              setDisplay(Math.floor(progress * target));
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplay(target);
                setSettled(true);
                window.setTimeout(() => setSettled(false), 260);
              }
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <p
        className="text-3xl font-bold tracking-tight tabular-nums inline-block"
        style={{ transform: settled ? "scale(1.08)" : "scale(1)", transition: `transform 260ms ${MOTION.ease}` }}
      >
        {display}{suffix}
      </p>
      <p style={{ color: p.muted }} className="text-xs mt-0.5">{label}</p>
    </div>
  );
}

// ─── Flipping "currently focusing on" line ─────────────────────────────────
function FocusFlip({ words, p }: { words: string[]; p: Pal }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exit" | "enter">("visible");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2800);
      return () => clearInterval(id);
    }
    const cycle = setInterval(() => {
      setPhase("exit");
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % words.length);
        setPhase("enter");
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase("visible")));
      }, 420);
    }, 2800);
    return () => clearInterval(cycle);
  }, [words.length, reduced]);

  const wordStyle: React.CSSProperties =
    phase === "exit"
      ? { opacity: 0, transform: "translateY(-8px)", transition: `opacity 420ms ${MOTION.ease}, transform 420ms ${MOTION.ease}` }
      : phase === "enter"
      ? { opacity: 0, transform: "translateY(8px)", transition: "none" }
      : { opacity: 1, transform: "translateY(0)", transition: `opacity 420ms ${MOTION.ease}, transform 420ms ${MOTION.ease}` };

  return (
    <div className="mt-6 mb-8">
      <div className="flex items-baseline gap-2 flex-nowrap">
        <span style={{ fontFamily: MONO, color: p.muted }} className="text-[12px] tracking-wider uppercase font-medium flex-shrink-0">Currently focusing on</span>
        <span className="relative inline-block overflow-hidden flex-shrink-0" style={{ width: 210, height: 24 }}>
          <span
            className="absolute left-0 bottom-0 font-bold text-base whitespace-nowrap leading-none"
            style={{ color: p.cardFg, ...(reduced ? {} : wordStyle) }}
          >
            {words[idx]}
          </span>
        </span>
      </div>
    </div>
  );
}

// ─── Binder: every education entry shown at once, ring-bound ──────────────
function Binder({ p }: { p: Pal }) {
  const [openRow, setOpenRow] = useState<number | null>(null);
  return (
    <section id="education">
      <Card p={p} className="p-8 lg:p-12">
        <Reveal>
          <SectionHeader
            p={p}
            label="Education"
            title={<><GraduationCap className="inline mr-2 mb-1 opacity-30" size={32} />Education</>}
            sub="Academic excellence in software engineering, with focus on data analytics, business systems, and strategic thinking."
          />
        </Reveal>

        {/* Binder shell */}
        <Reveal delay={120}>
        <div className="rounded-2xl overflow-hidden flex" style={{ border: `1px solid ${p.border}`, background: `${p.cardFg}03` }}>
          {/* Ring spine */}
          <div className="hidden sm:flex flex-shrink-0 w-9 flex-col items-center justify-around py-8" style={{ background: `${p.cardFg}06`, borderRight: `1px solid ${p.border}` }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-4 h-4 rounded-full border-2" style={{ borderColor: p.border, background: p.card }} />
            ))}
          </div>

          {/* All three schools, stacked as open pages */}
          <div className="flex-1 flex flex-col divide-y" style={{ borderColor: p.border }}>
            {EDUCATION.map((edu, i) => {
              const isOpen = openRow === i;
              return (
              <Reveal key={edu.id} delay={i * 110} y={16}>
                <button
                  onClick={() => setOpenRow(isOpen ? null : i)}
                  className="w-full text-left p-7 group focus:outline-none"
                  style={{
                    background: "transparent",
                    transform: "translateY(0)",
                    transition: `background ${MOTION.normal} ${MOTION.ease}, box-shadow ${MOTION.normal} ${MOTION.ease}`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 24px -12px rgba(51,44,34,0.25)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="flex items-start gap-6 flex-wrap sm:flex-nowrap">
                    {/* Folder tab label */}
                    <div className="flex-shrink-0 w-16 h-14 relative">
                      <div
                        className="absolute top-0 left-0 w-8 h-2.5 rounded-t-md"
                        style={{ background: p.folder[i % p.folder.length], transform: isOpen ? "translateY(-2px)" : "translateY(0)", transition: `transform ${MOTION.normal} ${MOTION.ease}` }}
                      />
                      <div className="absolute top-2 left-0 right-0 bottom-0 rounded-b-md rounded-tr-md flex items-center justify-center" style={{ background: `${p.folder[i % p.folder.length]}cc` }}>
                        <BookOpen size={20} style={{ color: p.cardFg, opacity: 0.4 }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <span style={{ fontFamily: MONO, color: p.muted }} className="text-[10px] tracking-widest uppercase">{String(i + 1).padStart(2, "0")}</span>
                          <h3 className="font-bold text-lg leading-tight mt-0.5">{edu.institution}</h3>
                          <p style={{ color: p.muted }} className="text-sm mt-0.5">{edu.degree}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Pill p={p} tone="accent">{edu.score}</Pill>
                          <Pill p={p}>{edu.year}</Pill>
                        </div>
                      </div>
                      <FolderReveal open={isOpen}>
                        <p style={{ color: p.muted }} className="text-sm mt-3 leading-relaxed pb-1">{edu.details}</p>
                      </FolderReveal>
                      {!isOpen && (
                        <p style={{ color: p.muted, fontFamily: MONO }} className="text-[10px] mt-3 uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-opacity" >
                          Click to expand
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              </Reveal>
            );})}
          </div>
        </div>
        </Reveal>
      </Card>
    </section>
  );
}

// ─── Work: a pastel pinboard of roles ──────────────────────────────────────
function WorkExperience({ p }: { p: Pal }) {
  const board = "linear-gradient(135deg, #F6EEF2 0%, #F1E9EE 100%)";
  return (
    <section id="workexperience">
      <Card p={p} className="p-8 lg:p-12">
        <Reveal>
          <SectionHeader
            p={p}
            label="Experience"
            title={<><Briefcase className="inline mr-2 mb-1 opacity-30" size={32} />Work Experience</>}
            sub="Real-world experience translating business needs into data-driven solutions and strategic recommendations."
          />
        </Reveal>
        <div className="rounded-2xl p-6 sm:p-10 relative overflow-hidden" style={{ background: board }}>
          {/* soft grid texture */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `linear-gradient(${p.cardFg} 1px, transparent 1px), linear-gradient(90deg, ${p.cardFg} 1px, transparent 1px)`,
            backgroundSize: "26px 26px",
          }} />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8">
            {WORK_EXPERIENCE.map((e, i) => {
              const cardColor = p.folder[i % p.folder.length];
              const angle = i % 2 === 0 ? -1.1 : 1.1;
              return (
                <Reveal key={e.id} delay={140 + i * 130} y={20}>
                  <PinboardCard angle={angle} className="relative rounded-[1.75rem] p-7" style={{ background: cardColor, color: p.cardFg }}>
                    {/* pin */}
                    <span
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-md group-hover:-translate-y-0.5"
                      style={{ background: "#D79A9A", transition: `transform ${MOTION.normal} ${MOTION.ease}` }}
                    />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black opacity-25" style={{ fontFamily: MONO }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontFamily: MONO }} className="text-[10px] tracking-widest uppercase opacity-60">{e.year}</span>
                    </div>
                    <h3 className="font-bold text-xl leading-tight">{e.title}</h3>
                    <span className="inline-block text-[10px] tracking-widest uppercase mt-3 px-3 py-1.5 rounded-full" style={{ fontFamily: MONO, background: p.dark, color: cardColor }}>{e.tag}</span>
                    <p style={{ fontFamily: MONO }} className="text-xs mt-4 opacity-70">{e.tech}</p>
                    <p className="text-sm mt-3 leading-relaxed opacity-80">{e.description}</p>
                    <UnderlineLink href={e.link} color={p.cardFg} style={{ fontFamily: MONO }} className="text-xs font-bold uppercase tracking-wide mt-5">
                      <Award size={12} /> View Certificate
                    </UnderlineLink>
                  </PinboardCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Card>
    </section>
  );
}

// ─── Skill folders ──────────────────────────────────────────────────────────
function SkillFolders({ p }: { p: Pal }) {
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="skills">
      <Card p={p} className="p-8 lg:p-12">
        <Reveal>
          <SectionHeader
            p={p}
            label="Skills"
            title={<><Layers className="inline mr-2 mb-1 opacity-30" size={32} />Skill Set</>}
            sub="Business analysis, data analytics, and visualization tools. Power BI, Python, SQL, and strategic frameworks."
          />
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {SKILLS.map((cat, i) => {
            const isOpen = open === i;
            const isHover = hover === i;
            const fColor = p.folder[i % p.folder.length];
            return (
              <Reveal key={cat.id} delay={i * 70} y={18} style={{ gridColumn: isOpen ? "span 2" : undefined }} className="flex flex-col">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className="text-left focus:outline-none"
                  style={{
                    transformOrigin: "bottom center",
                    transform: isHover ? "translateY(-4px) rotate(1deg)" : "translateY(0) rotate(0deg)",
                    transition: `transform ${MOTION.normal} ${MOTION.ease}`,
                  }}
                >
                  <div className="relative">
                    <div
                      className="w-2/5 h-3 rounded-t-md"
                      style={{ background: `${fColor}aa`, transform: isHover ? "translateY(-2px)" : "translateY(0)", transition: `transform ${MOTION.normal} ${MOTION.ease}` }}
                    />
                    <div
                      className="relative rounded-b-md rounded-tr-md p-4 min-h-[104px] flex flex-col justify-between"
                      style={{
                        background: `${fColor}55`,
                        boxShadow: isOpen ? `0 12px 30px ${fColor}66` : isHover ? `0 10px 22px ${fColor}44` : "0 2px 10px rgba(51,44,34,0.10)",
                        transition: `box-shadow ${MOTION.normal} ${MOTION.ease}`,
                      }}
                    >
                      <span className="absolute top-2 right-3 text-3xl font-black opacity-15" style={{ fontFamily: MONO }}>{String(i + 1).padStart(2, "0")}</span>
                      {!isOpen && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {cat.skills.slice(0, 3).map((s, si) => (
                            <span
                              key={s}
                              className="w-8 h-5 rounded-sm opacity-40"
                              style={{ background: p.cardFg, transform: isHover ? `translateY(${-1 - si}px)` : "translateY(0)", transition: `transform ${MOTION.normal} ${MOTION.ease}` }}
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex items-end justify-between gap-2">
                        <span className="font-bold text-sm leading-tight">{cat.category}</span>
                        <span className="text-lg transition-transform" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transitionDuration: MOTION.normal, transitionTimingFunction: MOTION.ease }}>▾</span>
                      </div>
                    </div>
                  </div>
                </button>
                <FolderReveal open={isOpen}>
                  <div className="mt-2 p-4 rounded-b-md rounded-tr-md" style={{ background: `${p.cardFg}06`, border: `1px solid ${p.border}` }}>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((item, si) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 text-xs font-semibold uppercase rounded-full"
                          style={{
                            fontFamily: MONO, background: `${fColor}33`, border: `1px solid ${fColor}`, color: p.cardFg,
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? "translateY(0)" : "translateY(6px)",
                            transition: `opacity ${MOTION.normal} ${MOTION.ease} ${isOpen ? 140 + si * 30 : 0}ms, transform ${MOTION.normal} ${MOTION.ease} ${isOpen ? 140 + si * 30 : 0}ms`,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </FolderReveal>
              </Reveal>
            );
          })}
        </div>
      </Card>
    </section>
  );
}

// ─── Project carousel — the site's hero interaction ────────────────────────
// Every project card stays mounted and is positioned purely from its offset
// to the active index, so switching slides is a genuine CSS transform
// transition rather than a content swap.
function shortestOffset(index: number, cur: number, n: number) {
  let off = index - cur;
  if (off > n / 2) off -= n;
  if (off < -n / 2) off += n;
  return off;
}

function ProjectCarousel({ p }: { p: Pal }) {
  const [cur, setCur] = useState(0);
  const n = PROJECTS.length;
  const reduced = usePrefersReducedMotion();
  const goTo = (i: number) => setCur(((i % n) + n) % n);
  const prevProj = () => goTo(cur - 1);
  const nextProj = () => goTo(cur + 1);
  const proj = PROJECTS[cur];
  const cardColor = PROJECT_COLORS[cur % PROJECT_COLORS.length];

  // Section-scoped keyboard nav — only listens while the carousel is in view.
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageInView, setStageInView] = useState(false);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setStageInView(entry.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!stageInView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevProj();
      if (e.key === "ArrowRight") nextProj();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageInView, cur]);

  // Drag / swipe.
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragStart = useRef(0);
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragX(e.clientX - dragStart.current);
  };
  const endDrag = () => {
    if (dragging) {
      if (dragX > 70) prevProj();
      else if (dragX < -70) nextProj();
    }
    setDragging(false);
    setDragX(0);
  };

  // Subtle cursor tilt on the active card only.
  const { ref: tiltRef, pos: tiltPos } = useContainerPointer<HTMLDivElement>(reduced || dragging);

  return (
    <section id="projects">
      <Card p={p} className="p-8 lg:p-12">
        <Reveal>
          <SectionHeader
            p={p}
            label="Projects"
            title={<><Code2 className="inline mr-2 mb-1 opacity-30" size={32} />Projects</>}
            sub="Data-driven projects spanning business analytics, predictive modeling, and strategic optimization. Drag, swipe, or use the arrow keys."
          />
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div
            ref={stageRef}
            className="relative flex items-center justify-center h-[320px] select-none"
            style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {PROJECTS.map((proj_, i) => {
              const offset = shortestOffset(i, cur, n);
              if (Math.abs(offset) > 2) return null;
              const isActive = offset === 0;
              const color = PROJECT_COLORS[i % PROJECT_COLORS.length];
              let x = 0, rotDeg = 0, scale = 0.7, opacity = 0, z = 0, yOff = 30;
              if (offset === 0) { x = 0; rotDeg = reduced ? 0 : tiltPos.x * 6; scale = 1; opacity = 1; z = 5; yOff = 0; }
              else if (offset === -1) { x = -38; rotDeg = -8; scale = 0.85; opacity = 1; z = 2; yOff = 20; }
              else if (offset === 1) { x = 38; rotDeg = 8; scale = 0.85; opacity = 1; z = 2; yOff = 20; }
              else if (offset === -2) { x = -68; rotDeg = -15; scale = 0.72; opacity = 0; z = 1; yOff = 28; }
              else { x = 68; rotDeg = 15; scale = 0.72; opacity = 0; z = 1; yOff = 28; }
              const dragPx = isActive ? dragX : dragX * 0.12;
              const transform = `translate(-50%, -50%) translate(${x}%, ${yOff}px) translateX(${dragPx}px) rotate(${rotDeg}deg) scale(${scale})`;
              const isSlot = Math.abs(offset) === 1;

              return (
                <div
                  key={proj_.id}
                  ref={isActive ? tiltRef : undefined}
                  onClick={() => { if (!isActive && Math.abs(offset) === 1) goTo(i); }}
                  className="absolute left-1/2 top-1/2 rounded-xl overflow-hidden"
                  style={{
                    width: isActive ? 235 : 210,
                    height: isActive ? 280 : 250,
                    transform,
                    opacity,
                    zIndex: z,
                    pointerEvents: Math.abs(offset) <= 1 ? "auto" : "none",
                    cursor: isSlot ? "pointer" : dragging ? "grabbing" : "grab",
                    transition: dragging
                      ? "none"
                      : `transform ${MOTION.slow} ${MOTION.ease}, opacity ${MOTION.slow} ${MOTION.ease}`,
                    background: isActive ? `linear-gradient(135deg, ${color}dd 0%, ${color}99 100%)` : `${color}55`,
                    border: `1px solid ${isActive ? color : p.border}`,
                    boxShadow: isActive ? "0 30px 60px -18px rgba(51,44,34,0.45)" : "none",
                  }}
                >
                  {isActive ? (
                    <div className="flex flex-col h-full">
                      <div className="flex items-end gap-0.5 px-5 pt-5 h-14">
                        {[12, 20, 8, 28, 16, 24, 10, 20, 14, 18, 8, 22].map((h, hi) => (
                          <div key={hi} className="flex-1 rounded-sm opacity-30" style={{ height: h, background: p.cardFg }} />
                        ))}
                      </div>
                      <div className="flex-1 p-5 flex flex-col justify-end gap-2">
                        <span className="text-xs uppercase tracking-widest opacity-70" style={{ fontFamily: MONO, color: p.cardFg }}>{proj_.tag.split(" ·")[0]}</span>
                        <p className="font-bold leading-tight text-lg" style={{ color: p.cardFg }}>{proj_.title}</p>
                        <span className="text-xs opacity-60" style={{ fontFamily: MONO, color: p.cardFg }}>{proj_.year}</span>
                      </div>
                      <div className="mx-5 mb-3 h-1 rounded-full opacity-30" style={{ background: p.cardFg }}>
                        <div className="h-full rounded-full opacity-70" style={{ width: `${((cur + 1) / n) * 100}%`, background: p.cardFg, transition: `width ${MOTION.slow} ${MOTION.ease}` }} />
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 flex flex-col gap-2">
                      <span className="text-[10px] opacity-70 uppercase tracking-widest" style={{ fontFamily: MONO }}>{proj_.tag.split(" ·")[0]}</span>
                      <span className="font-bold leading-tight text-sm">{proj_.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs px-2.5 py-1 rounded-full uppercase tracking-widest" style={{ fontFamily: MONO, background: `${cardColor}44`, color: p.cardFg }}>{proj.tag}</span>
              <span style={{ fontFamily: MONO, color: p.muted }} className="text-xs">{proj.year}</span>
            </div>
            <h3 className="font-bold leading-tight text-2xl lg:text-3xl">{proj.title}</h3>
            <p style={{ color: p.muted, fontFamily: MONO }} className="text-xs">{proj.tech}</p>
            <p style={{ color: p.muted }} className="text-sm leading-relaxed">{proj.description}</p>
            <AnimatedCTA href={proj.link} bg={cardColor} fg={p.cardFg} className="text-xs tracking-widest uppercase mt-1 w-fit" style={{ fontFamily: MONO, padding: "6px 12px" } as React.CSSProperties}>
              <Github size={12} /> View Code
            </AnimatedCTA>
            <div className="flex items-center gap-4 pt-3" style={{ borderTop: `1px solid ${p.border}` }}>
              <button onClick={prevProj} className="p-2 rounded-full transition-transform hover:-translate-y-0.5 hover:opacity-70" style={{ border: `1px solid ${p.border}`, transitionDuration: MOTION.fast }}><ArrowLeft size={14} /></button>
              <span style={{ fontFamily: MONO, color: p.muted }} className="text-xs">{cur + 1} / {n}</span>
              <button onClick={nextProj} className="p-2 rounded-full transition-transform hover:-translate-y-0.5 hover:opacity-70" style={{ border: `1px solid ${p.border}`, transitionDuration: MOTION.fast }}><ArrowRight size={14} /></button>
              <div className="flex gap-1.5 ml-2">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i} onClick={() => goTo(i)} className="rounded-full"
                    style={{ width: i === cur ? 16 : 6, height: 6, background: i === cur ? p.accent : p.border, transition: `all ${MOTION.normal} ${MOTION.ease}` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

// ─── Achievements & Certificates: checkerboard editorial grid ─────────────
// Shows every achievement at once (media + text cell each), generalized to
// any count — no longer hardcoded to exactly 4, so nothing gets dropped.
function AchievementsGrid({ p }: { p: Pal }) {
  const [hoverMedia, setHoverMedia] = useState<number | null>(null);
  const [hoverText, setHoverText] = useState<number | null>(null);

  const MediaCell = (item: typeof ACHIEVEMENTS[number], colorIdx: number, delay: number) => {
    const isHover = hoverMedia === item.id;
    const fColor = p.folder[colorIdx % p.folder.length];
    return (
      <Reveal key={`m-${item.id}`} delay={delay} y={16}>
        <div
          onMouseEnter={() => setHoverMedia(item.id)}
          onMouseLeave={() => setHoverMedia(null)}
          className="relative flex items-center justify-center min-h-[260px] h-full overflow-hidden p-3"
          style={{ background: item.image ? p.card : `${fColor}${isHover ? "88" : "66"}`, border: `1px solid ${p.border}`, transition: `background ${MOTION.normal} ${MOTION.ease}` }}
        >
          {item.image ? (
            // Real photo/scan of the award or certificate. object-contain
            // (not object-cover) so both portrait and landscape certificates
            // show in full — letterboxed rather than cropped — regardless
            // of their original orientation/aspect ratio.
            <img
              src={item.image}
              alt={item.title}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-md"
              style={{ transform: isHover ? "scale(1.04)" : "scale(1)", transition: `transform ${MOTION.slow} ${MOTION.ease}`, boxShadow: "0 6px 18px rgba(51,44,34,0.12)" }}
            />
          ) : (
            // Placeholder — swap in a real image via the `image` field on
            // this achievement's data entry.
            <div
              className="absolute inset-3 rounded-xl flex flex-col items-center justify-center gap-2"
              style={{ border: `2px dashed ${p.cardFg}33` }}
            >
              <span
                style={{ fontFamily: MONO, color: p.cardFg, transform: isHover ? "translateY(-3px)" : "translateY(0)", transition: `transform ${MOTION.normal} ${MOTION.ease}` }}
                className="text-6xl font-black opacity-20 select-none"
              >
                {item.num}
              </span>
              <Award size={26} className="absolute" style={{ color: p.cardFg, opacity: isHover ? 0.65 : 0.4, transition: `opacity ${MOTION.normal} ${MOTION.ease}` }} />
              <span
                style={{ fontFamily: MONO, color: p.cardFg }}
                className="absolute bottom-3 text-[9px] tracking-widest uppercase opacity-40"
              >
                Add image
              </span>
            </div>
          )}
        </div>
      </Reveal>
    );
  };

  const TextCell = (item: typeof ACHIEVEMENTS[number], delay: number) => {
    const isHover = hoverText === item.id;
    return (
      <Reveal key={`t-${item.id}`} delay={delay} y={16}>
        <div
          onMouseEnter={() => setHoverText(item.id)}
          onMouseLeave={() => setHoverText(null)}
          className="min-h-[260px] h-full p-6 flex flex-col justify-center"
          style={{ background: p.card, border: `1px solid ${p.border}` }}
        >
          <span style={{ fontFamily: MONO, color: p.muted }} className="text-2xl font-black mb-2">{item.num}</span>
          <h3 className="font-bold text-base leading-snug" style={{ transform: isHover ? "translateX(2px)" : "translateX(0)", transition: `transform ${MOTION.normal} ${MOTION.ease}` }}>{item.title}</h3>
          <p style={{ color: p.muted }} className="text-xs font-medium mt-1">{item.org}</p>
          <p style={{ color: p.muted }} className="text-xs mt-2 leading-relaxed">{item.description}</p>
          {item.link && (
            <UnderlineLink href={item.link} color={p.cardFg} style={{ fontFamily: MONO }} className="text-[10px] font-bold uppercase tracking-wide mt-3">
              <ExternalLink size={11} style={{ transform: isHover ? "translateX(2px)" : "translateX(0)", transition: `transform ${MOTION.normal} ${MOTION.ease}` }} /> View Certificate
            </UnderlineLink>
          )}
        </div>
      </Reveal>
    );
  };

  // Build the checkerboard for however many achievements there are: even
  // items go media-first, odd items go text-first — same alternating rhythm
  // as before, just driven by a loop instead of 4 hardcoded variables so a
  // 5th (or 6th, 7th...) entry is never silently dropped.
  const cells = ACHIEVEMENTS.flatMap((item, i) => {
    const media = MediaCell(item, i, i * 110);
    const text = TextCell(item, i * 110 + 90);
    return i % 2 === 0 ? [media, text] : [text, media];
  });

  return (
    <section id="achievements">
      <Card p={p} className="p-8 lg:p-12">
        <Reveal>
          <SectionHeader
            p={p}
            label="Recognition"
            title={<><Award className="inline mr-2 mb-1 opacity-30" size={32} />Achievements &amp; Certificates</>}
            sub="Moments that were recognized along the way — awards, ranks, and certificates earned through the work itself."
          />
        </Reveal>
        <div className="rounded-2xl overflow-hidden grid grid-cols-2 lg:grid-cols-4" style={{ border: `1px solid ${p.border}` }}>
          {cells}
        </div>
      </Card>
    </section>
  );
}

// ─── Doodles: small silhouette line-art figures for Playground ────────────
function DoodleFigure({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 160 130" className="w-full h-28" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}
function HabitDoodle({ accent, ink, paper }: { accent: string; ink: string; paper: string }) {
  return (
    <DoodleFigure>
      <ellipse cx="46" cy="100" rx="26" ry="8" fill={ink} opacity="0.08" />
      <path d="M30 100 Q30 62 50 58 Q70 62 70 100 Z" fill={ink} />
      <circle cx="50" cy="42" r="15" fill={ink} />
      <circle cx="45" cy="40" r="2.2" fill={paper} />
      <circle cx="55" cy="40" r="2.2" fill={paper} />
      <path d="M44 72 Q30 78 26 92" stroke={ink} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="10" y="78" width="24" height="30" rx="3" fill={paper} stroke={ink} strokeWidth="2.5" />
      <rect x="17" y="74" width="10" height="6" rx="2" fill={ink} />
      <path d="M15 88 l4 4 l7 -8" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="99" x2="29" y2="99" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      <path d="M118 60 Q108 74 118 88 Q130 84 128 68 Q126 76 120 74 Q124 64 118 60 Z" fill={accent} />
    </DoodleFigure>
  );
}
function QuoteDoodle({ accent, ink, paper }: { accent: string; ink: string; paper: string }) {
  return (
    <DoodleFigure>
      <ellipse cx="52" cy="106" rx="28" ry="7" fill={ink} opacity="0.08" />
      <path d="M36 106 Q34 66 56 62 Q78 66 74 106 Z" fill={ink} />
      <circle cx="56" cy="46" r="16" fill={ink} />
      <circle cx="50" cy="44" r="2.2" fill={paper} />
      <circle cx="61" cy="44" r="2.2" fill={paper} />
      <path d="M50 76 Q88 60 108 40" stroke={ink} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M92 18 h44 a8 8 0 0 1 8 8 v16 a8 8 0 0 1 -8 8 h-20 l-10 10 v-10 h-14 a8 8 0 0 1 -8 -8 v-16 a8 8 0 0 1 8 -8 Z" fill={paper} stroke={ink} strokeWidth="2.5" />
      <text x="100" y="40" fontSize="22" fill={accent} fontFamily="Georgia, serif">"</text>
    </DoodleFigure>
  );
}
function PaletteDoodle({ accent, ink, paper }: { accent: string; ink: string; paper: string }) {
  return (
    <DoodleFigure>
      <ellipse cx="54" cy="106" rx="28" ry="7" fill={ink} opacity="0.08" />
      <path d="M38 106 Q36 66 58 62 Q80 66 76 106 Z" fill={ink} />
      <circle cx="58" cy="46" r="16" fill={ink} />
      <circle cx="52" cy="44" r="2.2" fill={paper} />
      <circle cx="63" cy="44" r="2.2" fill={paper} />
      <path d="M42 74 Q26 70 20 56" stroke={ink} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M90 34 a30 24 0 1 0 4 46 q-6 -2 -6 -8 a6 6 0 0 1 6 -6 h6 a14 14 0 0 0 14 -14 a30 24 0 0 0 -24 -18 Z" fill={paper} stroke={ink} strokeWidth="2.5" />
      <circle cx="80" cy="44" r="4" fill={accent} />
      <circle cx="96" cy="40" r="4" fill="#BFDCC3" />
      <circle cx="108" cy="52" r="4" fill="#AFCFE0" />
      <circle cx="84" cy="60" r="4" fill="#EFC4C4" />
    </DoodleFigure>
  );
}
function PixelDoodle({ accent, ink, paper }: { accent: string; ink: string; paper: string }) {
  return (
    <DoodleFigure>
      <ellipse cx="48" cy="106" rx="27" ry="7" fill={ink} opacity="0.08" />
      <path d="M32 106 Q30 66 52 62 Q74 66 70 106 Z" fill={ink} />
      <circle cx="52" cy="46" r="16" fill={ink} />
      <circle cx="46" cy="44" r="2.2" fill={paper} />
      <circle cx="57" cy="44" r="2.2" fill={paper} />
      <path d="M64 70 Q94 68 100 44" stroke={ink} strokeWidth="5" fill="none" strokeLinecap="round" />
      <g>
        {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (
          <rect key={`${r}-${c}`} x={90 + c * 12} y={22 + r * 12} width="10" height="10"
            fill={(r + c) % 3 === 0 ? accent : (r + c) % 3 === 1 ? ink : paper}
            stroke={ink} strokeWidth="1" />
        )))}
      </g>
    </DoodleFigure>
  );
}
const DOODLES: Record<number, (props: { accent: string; ink: string; paper: string }) => React.ReactNode> = {
  1: HabitDoodle, 2: QuoteDoodle, 3: PaletteDoodle, 4: PixelDoodle,
};

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState<Mode>("actual");
  const p = PASTEL;
  const isPro = mode === "pro";
  const reducedMotion = usePrefersReducedMotion();

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const nav = [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "workexperience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "volunteering", label: "Volunteering" },
    { id: "extracurriculars", label: "Extras" },
    { id: "achievements", label: "Achievements" },
    { id: "playground", label: "Playground" },
  ];

  // Cinematic-but-subtle page-load entrance: nav → hero frame → circles →
  // title → hero content, staggered.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const enter = (delayMs: number, y = 14): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : `translateY(${y}px)`,
    transition: reducedMotion
      ? "opacity 400ms ease"
      : `opacity 650ms ${MOTION.ease} ${delayMs}ms, transform 650ms ${MOTION.ease} ${delayMs}ms`,
  });

  // Scroll-linked chrome.
  const scrollProgress = useScrollProgress();
  const scrolled = useScrolled(28);
  const activeSection = useActiveSection(nav.map((n) => n.id));

  // Sliding active-section pill in the nav.
  const navRowRef = useRef<HTMLDivElement>(null);
  const navBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillRect, setPillRect] = useState<{ left: number; width: number } | null>(null);
  useEffect(() => {
    const update = () => {
      const btn = navBtnRefs.current[activeSection];
      const row = navRowRef.current;
      if (btn && row) {
        const b = btn.getBoundingClientRect();
        const r = row.getBoundingClientRect();
        setPillRect({ left: b.left - r.left, width: b.width });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeSection]);

  // Background gets an extremely slow drift tied to scroll — "living
  // atmosphere," not an animated background.
  const [bgShift, setBgShift] = useState(0);
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setBgShift(window.scrollY * 0.02));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [reducedMotion]);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: p.page, color: p.darkFg, fontFamily: FONT,
        filter: isPro ? "grayscale(1) contrast(1.05)" : "none",
        transition: "filter 0.45s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&family=Caveat:wght@700&display=swap');
        ::-webkit-scrollbar{width:0}*{scrollbar-width:none}
        @keyframes fadeInOut {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
        }
      `}</style>

      <ScrollProgressBar p={p} progress={scrollProgress} />

      {/* Backdrop — original dark, moody wash. Cards sit on top in pastel tones. */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(120,110,90,0.25), transparent 60%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(60,55,45,0.35), transparent 60%), linear-gradient(180deg, #1B1815 0%, #100E0B 100%)",
          transform: `translateY(${bgShift}px)`,
        }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* Nav */}
      <nav className="sticky top-4 z-50" style={enter(0, -10)}>
        <div className={CONTAINER}>
          <div
            className="w-full flex items-center justify-between gap-6 rounded-full backdrop-blur-md"
            style={{
              background: scrolled ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: scrolled ? "6px 12px" : "8px 12px",
              backdropFilter: scrolled ? "blur(18px)" : "blur(10px)",
              boxShadow: scrolled ? "0 12px 34px rgba(0,0,0,0.45)" : "0 8px 30px rgba(0,0,0,0.35)",
              transition: `background ${MOTION.normal} ${MOTION.ease}, padding ${MOTION.normal} ${MOTION.ease}, box-shadow ${MOTION.normal} ${MOTION.ease}`,
            }}
          >
            <button onClick={() => scrollTo("intro")} className="pl-5 flex items-center">
              <img src={logo} alt="Logo" className="h-7 w-auto scale-250" />
            </button>
            <div ref={navRowRef} className="hidden md:flex items-center gap-1 relative">
              {pillRect && (
                <div
                  className="absolute top-0 bottom-0 rounded-full pointer-events-none"
                  style={{ left: pillRect.left, width: pillRect.width, background: "rgba(255,255,255,0.12)", transition: `left ${MOTION.normal} ${MOTION.ease}, width ${MOTION.normal} ${MOTION.ease}` }}
                />
              )}
              {nav.map((n) => (
                <button
                  key={n.id}
                  ref={(el) => { navBtnRefs.current[n.id] = el; }}
                  onClick={() => scrollTo(n.id)}
                  className="relative text-sm px-3 py-1.5 rounded-full hover:-translate-y-px"
                  style={{ color: activeSection === n.id ? "#fff" : "rgba(255,255,255,0.6)", transitionProperty: "color, transform", transitionDuration: MOTION.fast, transitionTimingFunction: MOTION.ease }}
                >
                  {n.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 pr-1">
              <ModeSwitch mode={mode} setMode={setMode} p={p} dark />
              <AnimatedCTA href={about.linkedin} bg={p.card} fg={p.cardFg} className="text-xs px-4 py-2">
                <Linkedin size={12} /> LinkedIn
              </AnimatedCTA>
            </div>
          </div>
        </div>
      </nav>

      <div className={`${CONTAINER} py-8 space-y-5`}>

        {/* Portfolio intro banner — minimal editorial title page: name, degree,
            and year sit left of a bold divider; a big stacked wordmark
            anchors the bottom-right, with generous whitespace above it. */}
        <section id="intro">
          <div
            className="relative overflow-hidden rounded-[1.75rem] px-8 sm:px-16 lg:px-24 pt-20 pb-16 sm:pb-24 lg:pb-28 flex items-end justify-end min-h-[560px] lg:min-h-[760px] xl:min-h-[640px]"
            style={{ background: p.card, border: `1px solid ${p.border}`, boxShadow: "0 24px 60px rgba(0,0,0,0.28)", ...enter(150, 18) }}
          >
            {/* faint grid-paper texture — quiet, not a decoration that competes with the type */}
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: `linear-gradient(${p.cardFg} 1px, transparent 1px), linear-gradient(90deg, ${p.cardFg} 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }} />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 lg:gap-16">
              <div className="flex items-center gap-6 sm:gap-8" style={enter(400, 14)}>
                <div className="text-left sm:text-right">
                  <p className="font-bold text-base sm:text-lg tracking-tight" style={{ color: p.cardFg }}>{about.name}</p>
                  <p style={{ color: p.muted }} className="text-xs sm:text-sm mt-2 leading-relaxed max-w-[200px] sm:ml-auto">
                    Integrated Masters in Software Engineering, VIT Vellore
                  </p>
                  <p style={{ fontFamily: MONO, color: p.muted }} className="text-[10px] sm:text-xs mt-4 tracking-widest uppercase">2026</p>
                </div>
                <div className="hidden sm:block self-stretch w-[3px] rounded-full" style={{ background: p.cardFg }} />
              </div>

              <div className="leading-[0.82]" style={enter(550, 22)}>
                {["PORT", "FO", "LIO"].map((line) => (
                  <div
                    key={line}
                    className="font-black tracking-tight"
                    style={{ color: p.cardFg, fontSize: "clamp(60px, 10vw, 168px)" }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section id="about" style={enter(750, 20)}>
          <Card p={p} className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] min-h-[480px]">
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <Pill p={p}><Star size={8} className="mr-0.5" /> Personal Portfolio</Pill>
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 mt-6 tracking-tight">{about.headline}</h1>
                  <p style={{ color: p.muted }} className="text-base leading-relaxed max-w-lg">{about.bio}</p>

                  <FocusFlip words={FOCUS_WORDS} p={p} />

                  <div className="flex flex-wrap gap-3">
                    <AnimatedCTA href={about.linkedin} bg={p.dark} fg={p.darkFg} className="px-5 py-2.5 text-sm">
                      View LinkedIn <ArrowRight size={14} className="transition-transform group-hover:translate-x-[3px]" style={{ transitionDuration: MOTION.fast }} />
                    </AnimatedCTA>
                    <AnimatedCTA href={`https://mail.google.com/mail/?view=cm&fs=1&to=${about.email}`} bg={`${p.cardFg}0f`} fg={p.cardFg} className="px-5 py-2.5 text-sm">
                      <Mail size={13} /> Say Hello
                    </AnimatedCTA>
                    <AnimatedCTA href={about.resume} bg={p.accent} fg={p.accentFg} className="px-5 py-2.5 text-sm">
                      <FileDown size={13} /> View Resume
                    </AnimatedCTA>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-10 pt-8" style={{ borderTop: `1px solid ${p.border}` }}>
                  <StatCounter value={about.stat1val} label={about.stat1label} p={p} />
                  <StatCounter value={about.stat2val} label={about.stat2label} p={p} />
                  <StatCounter value={about.stat3val} label={about.stat3label} p={p} />
                </div>
              </div>
              <div className="hidden lg:block relative" style={{ background: "linear-gradient(135deg, #F0E4D8, #E4D6E8)" }}>
                <img src={myPhoto} alt="Portfolio hero" className="w-full h-full object-cover opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-8" style={{ background: "linear-gradient(180deg, transparent, rgba(51,44,34,0.55))" }}>
                  <p className="text-white font-bold text-xl leading-tight">{about.name}</p>
                  <p className="text-white/75 text-sm mt-0.5">{about.role}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-white/65 text-xs"><MapPin size={10} /><span>{about.location}</span></div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <Binder p={p} />
        <WorkExperience p={p} />
        <SkillFolders p={p} />
        <ProjectCarousel p={p} />

        {/* Volunteering + Extras — Minimalist numbered design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <section id="volunteering">
            <Card p={p} className="p-8 lg:p-12 h-full flex flex-col">
            <Reveal>
              <SectionHeader p={p} label="Volunteering" title={<><Heart className="inline mr-2 mb-1 opacity-30" size={26} />Community Impact</>} sub="Using skills to drive social change and empower underprivileged communities." />
            </Reveal>
            <div className="flex-1 space-y-8 mt-4">
              {VOLUNTEERING.map((vol, idx) => (
                <Reveal key={vol.id} delay={idx * 130} y={18}>
                  <div className="relative pl-20 group">
                    {/* Numbered circle */}
                    <div
                      className="absolute left-0 top-0 w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ background: `${p.cardFg}08`, border: `2px solid ${p.border}`, transitionDuration: MOTION.normal, transitionTimingFunction: MOTION.ease }}
                    >
                      <span style={{ fontFamily: MONO, color: p.muted }} className="text-xl font-black">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    {/* Content */}
                    <div className="pt-1">
                      <h4 className="font-bold text-base leading-snug">{vol.org}</h4>
                      <p style={{ color: p.muted }} className="text-xs font-medium mt-1">{vol.role}</p>
                      <Pill p={p} tone="muted" className="mt-2">{vol.period}</Pill>
                      <p style={{ color: p.muted }} className="text-sm mt-3 leading-relaxed">{vol.description}</p>
                    </div>
                    {/* Subtle line to next */}
                    {idx < VOLUNTEERING.length - 1 && (
                      <div className="absolute left-7 top-16 w-0.5 h-6 mt-2" style={{ background: `${p.border}` }} />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Card>
        </section>

        <section id="extracurriculars">
          <Card p={p} className="p-8 lg:p-12 h-full flex flex-col">
            <Reveal>
              <SectionHeader p={p} label="Extracurriculars" title={<><Zap className="inline mr-2 mb-1 opacity-30" size={26} />Leadership & Strategy</>} sub="Driving growth, organizing initiatives, and managing teams across diverse communities." />
            </Reveal>
            <div className="flex-1 space-y-8 mt-4">
              {EXTRAS.map((ext, idx) => (
                <Reveal key={ext.id} delay={idx * 110} y={18}>
                  <div className="relative pl-20 group">
                    {/* Numbered circle */}
                    <div
                      className="absolute left-0 top-0 w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ background: `${p.cardFg}08`, border: `2px solid ${p.border}`, transitionDuration: MOTION.normal, transitionTimingFunction: MOTION.ease }}
                    >
                      <span style={{ fontFamily: MONO, color: p.muted }} className="text-xl font-black">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    {/* Content */}
                    <div className="pt-1">
                      <h4 className="font-bold text-base leading-snug">{ext.title}</h4>
                      <p style={{ color: p.muted }} className="text-xs font-medium mt-1">{ext.org}</p>
                      <Pill p={p} tone="muted" className="mt-2">{ext.period}</Pill>
                      <p style={{ color: p.muted }} className="text-sm mt-3 leading-relaxed">{ext.description}</p>
                    </div>
                    {/* Subtle line to next */}
                    {idx < EXTRAS.length - 1 && (
                      <div className="absolute left-7 top-16 w-0.5 h-6 mt-2" style={{ background: `${p.border}` }} />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Card>
        </section>
      </div>

        <AchievementsGrid p={p} />

        {/* Playground — hand-drawn, storyboard-style */}
        <section id="playground">
          <Card p={p} className="p-8 lg:p-12">
            <Reveal>
              <SectionHeader p={p} label="Playground" title={<><Gamepad2 className="inline mr-2 mb-1 opacity-30" size={32} />Playground</>} sub="Side projects, experiments, and things I built because I was curious." />
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {PLAYGROUND.map((pg, idx) => {
                const Doodle = DOODLES[pg.id];
                const accent = p.folder[idx % p.folder.length];
                return (
                  <Reveal key={pg.id} delay={idx * 100} y={18}>
                    <div
                      className="relative flex flex-col items-center text-center px-5 py-6 group"
                      style={{ borderRight: idx < PLAYGROUND.length - 1 ? `1px dashed ${p.border}` : "none", transform: "rotate(0deg) translateY(0)", transition: `transform ${MOTION.normal} ${MOTION.ease}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(-1.5deg) translateY(-3px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "rotate(0deg) translateY(0)"; }}
                    >
                      <span className="absolute top-3 left-4 text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO, color: p.muted }}>{String(idx + 1).padStart(2, "0")}</span>
                      <div
                        className="w-full flex items-center justify-center mb-3 mt-4"
                        style={{ transition: `transform ${MOTION.normal} ${MOTION.ease}` }}
                      >
                        <div className="w-full transition-transform group-hover:scale-[1.06]" style={{ transitionDuration: MOTION.normal, transitionTimingFunction: MOTION.ease }}>
                          {Doodle ? <Doodle accent={accent} ink={p.cardFg} paper={p.card} /> : null}
                        </div>
                      </div>
                      <Pill p={p} tone="muted">{pg.category}</Pill>
                      <h3 className="font-bold text-sm mt-3 leading-tight">{pg.title}</h3>
                      <p style={{ color: p.muted }} className="text-xs leading-relaxed mt-2">{pg.description}</p>
                      <UnderlineLink href={pg.link} color={p.cardFg} className="mt-4 text-xs font-semibold">
                        <ExternalLink size={10} /> View Experiment <ChevronRight size={10} className="transition-transform group-hover:translate-x-0.5" style={{ transitionDuration: MOTION.fast }} />
                      </UnderlineLink>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Card>
        </section>

        {/* Footer */}
        <Card p={p} className="p-8 lg:p-12">
          <Reveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-bold text-2xl tracking-tight">{about.name}</p>
              <p style={{ color: p.muted }} className="text-sm mt-0.5">{about.role} · {about.location}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <AnimatedCTA href={about.resume} bg={p.accent} fg={p.accentFg} className="px-5 py-2.5 text-sm"><FileDown size={13} /> View Resume</AnimatedCTA>
              <AnimatedCTA href={about.linkedin} bg={p.dark} fg={p.darkFg} className="px-5 py-2.5 text-sm"><Linkedin size={13} /> LinkedIn</AnimatedCTA>
              <AnimatedCTA href={`mailto:${about.email}`} bg={`${p.cardFg}0f`} fg={p.cardFg} external={false} className="px-5 py-2.5 text-sm"><Mail size={13} /> Email Me</AnimatedCTA>
              <AnimatedCTA href={`tel:${about.phone.replace(/\s+/g, "")}`} bg={`${p.cardFg}0f`} fg={p.cardFg} external={false} className="px-5 py-2.5 text-sm"><Phone size={13} /> Call Me</AnimatedCTA>
              <AnimatedCTA href={`https://instagram.com/${about.instagram}`} bg={`${p.cardFg}0f`} fg={p.cardFg} className="px-5 py-2.5 text-sm"><Instagram size={13} /> Instagram</AnimatedCTA>
            </div>
          </div>
          </Reveal>
          <div className="mt-8 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-3" style={{ borderTop: `1px solid ${p.border}` }}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs" style={{ color: p.muted }}>
              <span className="flex items-center gap-1.5"><Mail size={12} /> {about.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={12} /> {about.phone}</span>
              <span className="flex items-center gap-1.5"><Instagram size={12} /> @{about.instagram}</span>
            </div>
            <p style={{ fontFamily: MONO, color: p.muted }} className="text-[10px] tracking-widest uppercase">Portfolio 2026</p>
          </div>
        </Card>
      </div>
    </div>
  );
}