"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { shouldUseWhiteText } from "@/lib/color-convert";

interface ColorPsychology {
  name: string;
  hex: string;
  emotions: string[];
  associations: string[];
  brands: string[];
  bestFor: string[];
  avoid: string;
  trivia: string;
}

const COLORS: ColorPsychology[] = [
  {
    name: "Red",
    hex: "#EF4444",
    emotions: ["Passion", "Energy", "Urgency", "Excitement", "Power"],
    associations: ["Love", "Danger", "Speed", "Fire", "Courage"],
    brands: ["Coca-Cola", "YouTube", "Netflix", "Target", "CNN"],
    bestFor: ["Food & restaurants", "Sales & clearance", "CTAs & buttons", "Entertainment", "Sports"],
    avoid: "Overuse creates anxiety. Avoid for calm, relaxing brands (spas, meditation).",
    trivia: "Red increases heart rate and appetite. That's why 75% of fast food logos use red.",
  },
  {
    name: "Orange",
    hex: "#F97316",
    emotions: ["Warmth", "Enthusiasm", "Creativity", "Fun", "Confidence"],
    associations: ["Adventure", "Youth", "Affordability", "Harvest", "Energy"],
    brands: ["Amazon", "Fanta", "Nickelodeon", "SoundCloud", "Etsy"],
    bestFor: ["E-commerce", "Youth brands", "Food & beverage", "Creative agencies", "Call-to-action buttons"],
    avoid: "Can feel cheap if overused. Avoid for luxury or premium positioning.",
    trivia: "Orange is the most divisive color — people either love or hate it. No one is neutral.",
  },
  {
    name: "Yellow",
    hex: "#EAB308",
    emotions: ["Happiness", "Optimism", "Clarity", "Warmth", "Attention"],
    associations: ["Sunshine", "Caution", "Intelligence", "Gold", "Energy"],
    brands: ["McDonald's", "Snapchat", "IKEA", "National Geographic", "DHL"],
    bestFor: ["Attracting window shoppers", "Warning signs", "Children's products", "Confidence & optimism themes", "Highlight & accent"],
    avoid: "Hard to read on white. Overuse causes eye fatigue. Use sparingly as accent.",
    trivia: "Yellow is the first color the human eye notices. That's why taxis and warning signs use it.",
  },
  {
    name: "Green",
    hex: "#22C55E",
    emotions: ["Growth", "Harmony", "Freshness", "Safety", "Stability"],
    associations: ["Nature", "Money", "Health", "Peace", "Renewal"],
    brands: ["Spotify", "Starbucks", "WhatsApp", "Whole Foods", "Android"],
    bestFor: ["Health & wellness", "Finance & banking", "Environment & sustainability", "Organic products", "Confirmation & success states"],
    avoid: "Avoid neon green for serious brands. Dark green can feel old-fashioned.",
    trivia: "The human eye can distinguish more shades of green than any other color — an evolutionary advantage.",
  },
  {
    name: "Blue",
    hex: "#3B82F6",
    emotions: ["Trust", "Security", "Calm", "Professionalism", "Reliability"],
    associations: ["Sky", "Ocean", "Technology", "Authority", "Intelligence"],
    brands: ["Facebook", "Twitter", "LinkedIn", "Samsung", "PayPal"],
    bestFor: ["Tech & SaaS", "Finance & insurance", "Healthcare", "Corporate branding", "Social media"],
    avoid: "Can feel cold or corporate. Avoid for food brands (blue suppresses appetite).",
    trivia: "Blue is the world's favorite color (40% of people). It's also the #1 color in tech logos.",
  },
  {
    name: "Purple",
    hex: "#8B5CF6",
    emotions: ["Luxury", "Creativity", "Mystery", "Wisdom", "Royalty"],
    associations: ["Royalty", "Magic", "Spirituality", "Premium quality", "Innovation"],
    brands: ["Twitch", "Cadbury", "Hallmark", "Yahoo", "FedEx"],
    bestFor: ["Luxury products", "Beauty & cosmetics", "Creative services", "Spiritual & wellness", "Premium tiers"],
    avoid: "Too much purple feels heavy. Not great for budget brands or agriculture.",
    trivia: "Purple dye was once worth more than gold — only royalty could afford it. Tyrian purple cost $30K/pound.",
  },
  {
    name: "Pink",
    hex: "#EC4899",
    emotions: ["Playfulness", "Romance", "Compassion", "Youthfulness", "Tenderness"],
    associations: ["Love", "Femininity", "Sweetness", "Warmth", "Fun"],
    brands: ["Barbie", "T-Mobile", "Lyft", "Dribbble", "Cosmopolitan"],
    bestFor: ["Beauty & fashion", "Dating & romance", "Youth & gen-z brands", "Sweet foods & desserts", "Feminine products"],
    avoid: "Can alienate male audiences if used exclusively. Hot pink can overwhelm.",
    trivia: "Pink wasn't considered feminine until the 1940s. Before that, it was marketed as a strong boy's color.",
  },
  {
    name: "Black",
    hex: "#171717",
    emotions: ["Sophistication", "Power", "Elegance", "Authority", "Mystery"],
    associations: ["Luxury", "Formality", "Strength", "Death", "Night"],
    brands: ["Nike", "Apple", "Chanel", "Adidas", "Prada"],
    bestFor: ["Luxury & high-end", "Fashion & editorial", "Tech products", "Minimalist design", "Photography"],
    avoid: "Can feel oppressive in large amounts. Add white space to breathe.",
    trivia: "Luxury brands use black because it signals exclusivity. Apple's product pages are 80%+ black.",
  },
  {
    name: "White",
    hex: "#F5F5F5",
    emotions: ["Purity", "Simplicity", "Cleanliness", "Space", "Peace"],
    associations: ["Minimalism", "New beginnings", "Innocence", "Light", "Perfection"],
    brands: ["Apple", "Google", "Tesla", "Zara", "The North Face"],
    bestFor: ["Minimalist design", "Healthcare & medical", "Wedding industry", "Premium tech", "White space in UI"],
    avoid: "Too much white feels empty and clinical. Balance with color accents.",
    trivia: "In Western culture, white means purity. In Eastern culture, it symbolizes mourning and death.",
  },
];

function ColorDetail({ color }: { color: ColorPsychology }) {
  const white = shouldUseWhiteText(color.hex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Hero swatch */}
      <div
        className="h-32 sm:h-40 rounded-2xl flex items-end p-6 border border-[var(--color-border)]"
        style={{ backgroundColor: color.hex }}
      >
        <div className={white ? "text-white" : "text-black"}>
          <h2 className="text-3xl sm:text-4xl font-bold">{color.name}</h2>
          <p className="font-mono text-sm opacity-60 mt-1">{color.hex}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Emotions */}
        <div className="surface rounded-2xl p-5 border border-[var(--color-border)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            Emotions & Feelings
          </h3>
          <div className="flex flex-wrap gap-2">
            {color.emotions.map((e) => (
              <span key={e} className="px-3 py-1 rounded-full text-xs font-medium bg-overlay-4 text-[var(--color-text-secondary)]">
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Associations */}
        <div className="surface rounded-2xl p-5 border border-[var(--color-border)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            Cultural Associations
          </h3>
          <div className="flex flex-wrap gap-2">
            {color.associations.map((a) => (
              <span key={a} className="px-3 py-1 rounded-full text-xs font-medium bg-overlay-4 text-[var(--color-text-secondary)]">
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="surface rounded-2xl p-5 border border-[var(--color-border)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            Famous Brands Using {color.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {color.brands.map((b) => (
              <span key={b} className="px-3 py-1 rounded-full text-xs font-semibold border border-[var(--color-border)] text-[var(--color-text)]">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Best for */}
        <div className="surface rounded-2xl p-5 border border-[var(--color-border)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            Best Used For
          </h3>
          <ul className="space-y-1.5">
            {color.bestFor.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color.hex }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Warning */}
      <div className="surface rounded-2xl p-5 border border-[var(--color-border)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          When to Avoid
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{color.avoid}</p>
      </div>

      {/* Trivia */}
      <div
        className="rounded-2xl p-5 border border-[var(--color-border)]"
        style={{ backgroundColor: color.hex + "0D" }}
      >
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          Did You Know?
        </h3>
        <p className="text-sm text-[var(--color-text)] leading-relaxed">{color.trivia}</p>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/generate"
          className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline"
        >
          Generate a {color.name.toLowerCase()} palette →
        </Link>
        <Link
          href="/explore"
          className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline"
        >
          Browse {color.name.toLowerCase()} palettes →
        </Link>
      </div>
    </motion.div>
  );
}

export default function PsychologyPage() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen px-4 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Color <span className="gradient-text">Psychology</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
            How colors make people feel — and how to use them in your designs.
            Click any color to explore its meaning, emotions, and real-world usage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* Color selector sidebar */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
            {COLORS.map((color, i) => (
              <button
                key={color.name}
                onClick={() => setSelected(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                  selected === i
                    ? "bg-overlay-6 text-[var(--color-text)] shadow-sm border border-[var(--color-border-strong)]"
                    : "text-[var(--color-text-secondary)] hover:bg-overlay-3 border border-transparent"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-md shrink-0 border border-[var(--color-border)]"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <ColorDetail key={selected} color={COLORS[selected]} />
          </AnimatePresence>
        </div>

        {/* SEO content */}
        <section className="mt-20 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Understanding Color Psychology in Design</h2>
          <div className="prose-sm text-[var(--color-text-secondary)] space-y-4 leading-relaxed">
            <p>
              Color psychology studies how colors influence human perception, emotion, and behavior.
              In design, choosing the right colors isn&apos;t just aesthetic — it directly impacts how
              users feel about your product, brand, or content.
            </p>
            <p>
              Research shows that <strong>90% of snap judgments about products</strong> can be based on color alone,
              and the right color can increase brand recognition by up to 80%. This makes color one of the
              most powerful tools in a designer&apos;s toolkit.
            </p>
            <p>
              The meanings of colors aren&apos;t universal — they vary across cultures, contexts, and personal
              experience. Red means luck and prosperity in China but danger in the West. White represents
              purity in Western cultures but mourning in parts of Asia. Always consider your audience
              when choosing colors.
            </p>
            <h3 className="text-lg font-bold text-[var(--color-text)] mt-6 mb-3">How to Apply Color Psychology</h3>
            <p>
              <strong>1. Start with your brand values.</strong> What emotions should your brand evoke?
              Trust (blue), energy (red), creativity (purple), growth (green)?
            </p>
            <p>
              <strong>2. Consider your audience.</strong> A children&apos;s app uses different colors than
              a law firm. Gen-Z audiences respond to vibrant, saturated colors. B2B audiences prefer
              muted, professional tones.
            </p>
            <p>
              <strong>3. Use the 60-30-10 rule.</strong> 60% dominant color (backgrounds), 30% secondary
              (content areas), 10% accent (CTAs, highlights). This creates visual hierarchy and balance.
            </p>
            <p>
              <strong>4. Test with real users.</strong> Color perception is subjective. A/B test different
              color schemes to see what actually performs better with your specific audience.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/brands" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                See brand color choices →
              </Link>
              <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Generate palettes →
              </Link>
              <Link href="/picker" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Pick colors visually →
              </Link>
              <Link href="/colors" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Browse named colors →
              </Link>
              <Link href="/contrast" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Check accessibility contrast →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
