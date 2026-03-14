import {
  C,
  ClubsSection,
  ClosingSection,
  DegreeSection,
  HeroSection,
  MemoriesSection,
  StoryPageStyles,
  StoryWave,
  type ClubItem,
  type ClosingAction,
  type DegreeCallout,
  type DegreeHighlightCard,
  type HeroAction,
  type HeroStat,
  type MemoriesSlide,
  type MemoriesSupportCard,
} from "../components/story-sections";

const heroBackground = `linear-gradient(150deg, ${C.sky} 0%, ${C.seafoam} 55%, ${C.sand} 100%)`;
const heroOverlap = 128;
const memoriesPlaceholderImage = "/assets/New/placeholder.png";

const heroActions: HeroAction[] = [
  { label: "Read My Story", href: "#degree", variant: "primary" },
  { label: "View Memories", href: "#memories", variant: "secondary" },
];

const heroStats: HeroStat[] = [
  { value: "A.S.-T", label: "Computer Science" },
  { value: "2 Years", label: "of courses" },
  { value: "UC / CSU", label: "transfer eligible" },
];

const degreeCards: DegreeHighlightCard[] = [
  {
    title: "Core CS Foundations",
    body: "Data structures, algorithms, computer architecture, and discrete mathematics, C++, Java — were the foundation of my technical education.",
    color: C.blue,
    delay: 0,
  },
  {
    title: "Applied Mathematics",
    body: "Calculus through Linear Algebra gave me a deeper intuition for computation, modeling, and the mechanics behind modern software systems.",
    color: C.teal,
    delay: 80,
  },
  {
    title: "Transfer Pathway",
    body: "The A.S.-T guarantees priority admission consideration to CSU campuses.",
    color: C.gold,
    delay: 160,
  },
  {
    title: "Campus Environment",
    body: "MiraCosta's Oceanside campus provided a focused and resource-rich setting — faculty office hours, peer tutoring, and dedicated study spaces that supported serious academic work.",
    color: "#9b6b9b",
    delay: 240,
  },
];

const degreeCallout: DegreeCallout = {
  eyebrow: "Conferred — Spring 2026",
  title: "Associate of Science for Transfer",
  meta: "Computer Science · MiraCosta College · Oceanside, CA",
};

const memorySlides: MemoriesSlide[] = [
  {
    placeholderLabel: "Graduation Ceremony",
    caption: "Commencement · May 22nd 2026",
    sub: "FrontWave Arena - Oceanside",
    imageSrc: memoriesPlaceholderImage,
    imageAlt: "Graduation ceremony placeholder",
  },
  {
    placeholderLabel: "With Close Friends",
    caption: "Family",
    sub: "FrontWave Arena - Oceanside",
    imageSrc: memoriesPlaceholderImage,
    imageAlt: "Family placeholder",
  },
  {
    placeholderLabel: "Cap & Gown",
    caption: "Friends",
    sub: "FrontWave Arena - Oceanside",
    imageSrc: memoriesPlaceholderImage,
    imageAlt: "Friends placeholder",
  },
  {
    placeholderLabel: "Family Celebration",
    caption: "Final day on campus",
    sub: "MiraCosta College - Oceanside",
    imageSrc: memoriesPlaceholderImage,
    imageAlt: "Campus celebration placeholder",
  },
];

const supportCard: MemoriesSupportCard = {
  title: "Family & Support System",
  body: "To my friends who joined me in late-night study sessions, . I am extremely grateful for the investment my family makes in education.",
};

const clubs: ClubItem[] = [
  {
    icon: (
      <>
        <rect x="5" y="6" width="10" height="8" rx="1" fill={C.blue} fillOpacity={0.7} />
        <line x1="10" y1="14" x2="10" y2="16" stroke={C.blue} strokeWidth="1.2" />
        <line x1="7" y1="16" x2="13" y2="16" stroke={C.blue} strokeWidth="1.2" />
      </>
    ),
    name: "Film Club",
    role: "Member",
    color: C.blue,
    bg: `${C.sky}55`,
    desc: "A hands-on creative space for discussing film, sharing projects, and building portfolios — contributing ideas, giving feedback, and applying storytelling principles to future career goals.",
    delay: 0,
  },
  {
    icon: (
      <>
        <rect x="4" y="5" width="12" height="10" rx="1.5" fill={C.teal} fillOpacity={0.6} />
        <path d="M7 9l2 2 4-3" stroke={C.white} strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
    name: "CS for the Common Good",
    role: "Member",
    color: C.teal,
    bg: `${C.seafoam}55`,
    desc: "Examined how computer science intersects with ethics, accessibility, and real-world impact — reinforcing that software is a tool for meaningful change, not just technical output.",
    delay: 80,
  },
  {
    icon: (
      <>
        <circle cx="10" cy="8" r="3" fill="#9b6b9b" fillOpacity={0.7} />
        <path d="M4 16c0-3 2.7-5 6-5s6 2 6 5" fill="#9b6b9b" fillOpacity={0.4} />
      </>
    ),
    name: "LeetCode Club",
    role: "Member",
    color: "#9b6b9b",
    bg: "#f0e8f488",
    desc: "Sharpened algorithmic thinking and technical interview preparation through peer collaboration — breaking down complex problems and building confidence in both coding and communication.",
    delay: 160,
  },
  {
    icon: (
      <>
        <path d="M5 15l5-9 5 9" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="7" y1="12" x2="13" y2="12" stroke={C.gold} strokeWidth="1.3" />
      </>
    ),
    name: "Game Design Club",
    role: "Member",
    color: C.gold,
    bg: `${C.sand}88`,
    desc: "Combined design thinking and logic using Godot — contributing to game jams, design documents, and peer critiques in a collaborative environment that encouraged creative confidence.",
    delay: 240,
  },
];

const closingAction: ClosingAction = {
  label: "Continue to *Future College*",
  href: "/future-college",
};

export default function Miracosta() {
  return (
    <>
      <StoryPageStyles pageBackground={C.cream} mainPaddingTop="0" />
      <HeroSection
        bgColor={heroBackground}
        sectionStyle={{ marginTop: -heroOverlap }}
        containerStyle={{ paddingTop: 120 + heroOverlap }}
        badge="MiraCosta College · Class of 2026"
        title={
          <>
            <span className="grad-text">Two Years.</span>
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: C.blue, fontSize: "0.88em" }}>A foundation</em>
            <br />
            <span>built to last.</span>
          </>
        }
        description={
          <>
            A reflection on earning an <strong style={{ color: C.navy, fontWeight: 600 }}>Associate of Science in Computer Science for Transfer</strong> — the coursework, the community, and the people who shaped my college experience.
          </>
        }
        actions={heroActions}
        stats={heroStats}
      />
      <StoryWave fill={C.cream} />
      <DegreeSection
        eyebrow="The Degree"
        title={
          <>
            Associate of Science in
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: C.teal, fontSize: "0.82em" }}>
              Computer Science for Transfer
            </em>
          </>
        }
        cards={degreeCards}
        callout={degreeCallout}
      />
      <StoryWave fill={C.sand} flip />
      <MemoriesSection
        eyebrow="Memories"
        title={
          <>
            Graduation
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#9b6b9b", fontSize: "0.82em" }}>celebrating the end of a era.</em>
          </>
        }
        description={<>Two years of work celebrated in a single afternoon — surrounded by the people who made every late night and early morning worthwhile.</>}
        slides={memorySlides}
        supportCard={supportCard}
      />
      <StoryWave fill={C.cream} />
      <ClubsSection
        eyebrow="Clubs & Involvement"
        title={
          <>
            Beyond the classroom
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: C.blue, fontSize: "0.82em" }}>an educational community</em>
          </>
        }
        description={
          <>Student involvement was where academic ambition met real collaboration — clubs that sharpened technical skills and the ability to work, build, and lead alongside others.</>
        }
        clubs={clubs}
      />
      <StoryWave fill={C.navy} flip />
      <ClosingSection
        title={
          <>
            What comes next
            <br />
            <span style={{ color: C.gold, fontStyle: "italic" }}>is the whole point.</span>
          </>
        }
        body={
          <>
            The A.S.-T was just the first step. Earning it secured my admission to <strong style={{ color: C.gold }}>*Future College*</strong> — proof that the foundation built at MiraCosta was exactly the right one. The next chapter begins now.
          </>
        }
        action={closingAction}
        footer="MiraCosta College · Oceanside, California"
      />
    </>
  );
}
