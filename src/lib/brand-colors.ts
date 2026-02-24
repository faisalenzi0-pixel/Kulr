// Brand Color Database
// Each brand page = an indexed URL targeting "[brand] colors hex"

export interface BrandColor {
  name: string;
  hex: string;
  usage: string; // e.g. "Primary", "Secondary", "Accent"
}

export interface Brand {
  slug: string;
  name: string;
  industry: string;
  colors: BrandColor[];
  story: string; // Why they chose those colors
  founded: string;
  website: string;
}

export const INDUSTRIES = [
  "All",
  "Tech",
  "Social Media",
  "Food & Beverage",
  "Fashion & Retail",
  "Gaming",
  "Automotive",
  "Entertainment",
  "Finance",
] as const;

export const BRANDS: Brand[] = [
  // ─── Tech ──────────────────────────────────────────
  {
    slug: "apple",
    name: "Apple",
    industry: "Tech",
    colors: [
      { name: "Black", hex: "#000000", usage: "Primary" },
      { name: "Silver", hex: "#A2AAAD", usage: "Secondary" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Blue", hex: "#0071E3", usage: "Link/CTA" },
      { name: "Green", hex: "#4CD964", usage: "Success" },
    ],
    story: "Apple's minimalist palette reflects its design philosophy: simplicity, elegance, and premium quality. The shift from rainbow to monochrome in 1998 signaled the brand's evolution toward sophistication. Black conveys luxury, while the signature blue is reserved for interactive elements.",
    founded: "1976",
    website: "apple.com",
  },
  {
    slug: "google",
    name: "Google",
    industry: "Tech",
    colors: [
      { name: "Blue", hex: "#4285F4", usage: "Primary" },
      { name: "Red", hex: "#EA4335", usage: "Secondary" },
      { name: "Yellow", hex: "#FBBC05", usage: "Accent" },
      { name: "Green", hex: "#34A853", usage: "Accent" },
      { name: "Gray", hex: "#5F6368", usage: "Text" },
    ],
    story: "Google's four-color palette (blue, red, yellow, green) was designed to feel playful and approachable. The colors follow a pattern — but break it intentionally (the 'l' in green instead of following the RGB sequence) to show Google doesn't follow rules.",
    founded: "1998",
    website: "google.com",
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    industry: "Tech",
    colors: [
      { name: "Red", hex: "#F25022", usage: "Primary" },
      { name: "Green", hex: "#7FBA00", usage: "Primary" },
      { name: "Blue", hex: "#00A4EF", usage: "Primary" },
      { name: "Yellow", hex: "#FFB900", usage: "Primary" },
      { name: "Gray", hex: "#737373", usage: "Text" },
    ],
    story: "Microsoft's four-square logo represents the diversity of their product ecosystem — Windows (blue), Office (red), Xbox (green), and the broader platform (yellow). The 2012 redesign flattened the colors for a modern, clean aesthetic aligned with Windows 8's Metro design language.",
    founded: "1975",
    website: "microsoft.com",
  },
  {
    slug: "amazon",
    name: "Amazon",
    industry: "Tech",
    colors: [
      { name: "Black", hex: "#000000", usage: "Primary" },
      { name: "Orange", hex: "#FF9900", usage: "Accent" },
      { name: "Blue", hex: "#146EB4", usage: "Link" },
      { name: "Light Gray", hex: "#F3F3F3", usage: "Background" },
      { name: "Dark Blue", hex: "#232F3E", usage: "Footer" },
    ],
    story: "Amazon's orange arrow (the 'smile' from A to Z) represents the happiness of delivery and the fact they sell everything from A to Z. The orange is warm and inviting — signaling affordability and customer focus. The dark blue footer conveys trust.",
    founded: "1994",
    website: "amazon.com",
  },
  {
    slug: "meta",
    name: "Meta",
    industry: "Tech",
    colors: [
      { name: "Meta Blue", hex: "#0668E1", usage: "Primary" },
      { name: "Facebook Blue", hex: "#1877F2", usage: "Facebook" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Gray", hex: "#65676B", usage: "Text" },
      { name: "Light Gray", hex: "#F0F2F5", usage: "Surface" },
    ],
    story: "Meta's blue was inherited from Facebook, which Mark Zuckerberg chose because he's red-green colorblind — blue is the color he sees best. The rebranding to Meta introduced a slightly different blue and an infinity-loop logo to represent the metaverse.",
    founded: "2004",
    website: "meta.com",
  },
  {
    slug: "github",
    name: "GitHub",
    industry: "Tech",
    colors: [
      { name: "Black", hex: "#24292E", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Blue", hex: "#0366D6", usage: "Link" },
      { name: "Green", hex: "#2EA44F", usage: "CTA/Success" },
      { name: "Gray", hex: "#586069", usage: "Text" },
    ],
    story: "GitHub's dark palette reflects its developer audience — familiar with dark terminals and code editors. The signature green button ('Create', 'Merge') signals positive action, while the minimal palette keeps focus on code, not chrome.",
    founded: "2008",
    website: "github.com",
  },
  {
    slug: "slack",
    name: "Slack",
    industry: "Tech",
    colors: [
      { name: "Aubergine", hex: "#4A154B", usage: "Primary" },
      { name: "Blue", hex: "#36C5F0", usage: "Accent" },
      { name: "Green", hex: "#2EB67D", usage: "Accent" },
      { name: "Red", hex: "#E01E5A", usage: "Accent" },
      { name: "Yellow", hex: "#ECB22E", usage: "Accent" },
    ],
    story: "Slack's four-color accent palette atop the deep aubergine creates a sense of organized fun — professional but not corporate. The 2019 rebrand simplified the colors to be more accessible and consistently reproducible across all media.",
    founded: "2013",
    website: "slack.com",
  },

  // ─── Social Media ──────────────────────────────────
  {
    slug: "spotify",
    name: "Spotify",
    industry: "Social Media",
    colors: [
      { name: "Green", hex: "#1DB954", usage: "Primary" },
      { name: "Black", hex: "#191414", usage: "Background" },
      { name: "White", hex: "#FFFFFF", usage: "Text" },
      { name: "Dark Gray", hex: "#282828", usage: "Surface" },
      { name: "Light Gray", hex: "#B3B3B3", usage: "Secondary Text" },
    ],
    story: "Spotify's green stands out in a sea of blue tech logos. It represents growth, energy, and the freshness of discovering new music. The dark UI puts album art front and center — the colors don't compete with the content.",
    founded: "2006",
    website: "spotify.com",
  },
  {
    slug: "netflix",
    name: "Netflix",
    industry: "Entertainment",
    colors: [
      { name: "Red", hex: "#E50914", usage: "Primary" },
      { name: "Black", hex: "#141414", usage: "Background" },
      { name: "White", hex: "#FFFFFF", usage: "Text" },
      { name: "Dark Gray", hex: "#221F1F", usage: "Surface" },
      { name: "Gray", hex: "#808080", usage: "Secondary" },
    ],
    story: "Netflix's red is cinematic — evoking the red curtain of a movie theater. Against the black background, it creates a premium, immersive viewing experience. The minimal palette ensures content thumbnails are the visual focus.",
    founded: "1997",
    website: "netflix.com",
  },
  {
    slug: "twitter",
    name: "X (Twitter)",
    industry: "Social Media",
    colors: [
      { name: "Black", hex: "#000000", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Blue", hex: "#1D9BF0", usage: "Legacy Blue" },
      { name: "Dark Gray", hex: "#0F1419", usage: "Text" },
      { name: "Gray", hex: "#536471", usage: "Secondary" },
    ],
    story: "The original Twitter blue represented open communication, like a clear sky. After the rebrand to X, the palette shifted to stark black and white — signaling a new era. The legacy blue persists in verified badges and links.",
    founded: "2006",
    website: "x.com",
  },
  {
    slug: "instagram",
    name: "Instagram",
    industry: "Social Media",
    colors: [
      { name: "Gradient Start", hex: "#833AB4", usage: "Primary" },
      { name: "Gradient Mid", hex: "#FD1D1D", usage: "Primary" },
      { name: "Gradient End", hex: "#FCAF45", usage: "Primary" },
      { name: "Dark", hex: "#262626", usage: "Text" },
      { name: "Blue", hex: "#0095F6", usage: "Link/CTA" },
    ],
    story: "Instagram's purple-red-orange gradient represents the sunset — the golden hour that photographers chase. The gradient also nods to the diversity of content on the platform. The blue CTA buttons draw from parent company Meta's palette.",
    founded: "2010",
    website: "instagram.com",
  },
  {
    slug: "tiktok",
    name: "TikTok",
    industry: "Social Media",
    colors: [
      { name: "Black", hex: "#010101", usage: "Primary" },
      { name: "Cyan", hex: "#25F4EE", usage: "Accent" },
      { name: "Red", hex: "#FE2C55", usage: "Accent" },
      { name: "White", hex: "#FFFFFF", usage: "Text" },
      { name: "Gray", hex: "#161823", usage: "Background" },
    ],
    story: "TikTok's cyan and red create a 3D anaglyph effect — reminiscent of retro 3D glasses. This duality represents the app's ability to merge reality with creative expression. The dark background keeps focus on video content.",
    founded: "2016",
    website: "tiktok.com",
  },
  {
    slug: "youtube",
    name: "YouTube",
    industry: "Social Media",
    colors: [
      { name: "Red", hex: "#FF0000", usage: "Primary" },
      { name: "Black", hex: "#282828", usage: "Background" },
      { name: "White", hex: "#FFFFFF", usage: "Text/Background" },
      { name: "Dark", hex: "#0F0F0F", usage: "Dark Mode" },
      { name: "Gray", hex: "#AAAAAA", usage: "Secondary" },
    ],
    story: "YouTube's red play button is one of the most recognized icons on the internet. The red conveys energy, passion, and entertainment. Like Netflix, the dark UI puts video thumbnails first — the platform is about the content, not the chrome.",
    founded: "2005",
    website: "youtube.com",
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    industry: "Social Media",
    colors: [
      { name: "Blue", hex: "#0A66C2", usage: "Primary" },
      { name: "Black", hex: "#000000", usage: "Text" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Light Blue", hex: "#70B5F9", usage: "Accent" },
      { name: "Gray", hex: "#86888A", usage: "Secondary" },
    ],
    story: "LinkedIn's blue represents trust, professionalism, and reliability — essential qualities for a professional network. It's a deeper, more serious blue than Facebook or Twitter, positioning LinkedIn as the grown-up in the social media room.",
    founded: "2003",
    website: "linkedin.com",
  },
  {
    slug: "discord",
    name: "Discord",
    industry: "Social Media",
    colors: [
      { name: "Blurple", hex: "#5865F2", usage: "Primary" },
      { name: "Green", hex: "#57F287", usage: "Online/Success" },
      { name: "Yellow", hex: "#FEE75C", usage: "Warning/Idle" },
      { name: "Red", hex: "#ED4245", usage: "Error/DND" },
      { name: "Dark", hex: "#2C2F33", usage: "Background" },
    ],
    story: "Discord coined 'blurple' — a blue-purple that feels both technical and playful. The color system directly maps to status: green (online), yellow (idle), red (do not disturb). The 2021 rebrand made the blurple slightly more saturated and vibrant.",
    founded: "2015",
    website: "discord.com",
  },
  {
    slug: "snapchat",
    name: "Snapchat",
    industry: "Social Media",
    colors: [
      { name: "Yellow", hex: "#FFFC00", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Ghost" },
      { name: "Black", hex: "#000000", usage: "Text" },
      { name: "Purple", hex: "#9B5DE5", usage: "Discover" },
      { name: "Cyan", hex: "#00C4CC", usage: "Accent" },
    ],
    story: "Snapchat's bright yellow was chosen to stand out on phone screens and app stores — no other major app uses yellow as its primary. Bobby Murphy said they wanted something 'fun' that 'no one else was using.' It worked — the yellow is instantly recognizable.",
    founded: "2011",
    website: "snapchat.com",
  },
  {
    slug: "twitch",
    name: "Twitch",
    industry: "Entertainment",
    colors: [
      { name: "Purple", hex: "#9146FF", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Text/Background" },
      { name: "Dark", hex: "#0E0E10", usage: "Background" },
      { name: "Light Purple", hex: "#BF94FF", usage: "Accent" },
      { name: "Gray", hex: "#1F1F23", usage: "Surface" },
    ],
    story: "Twitch's purple signals creativity and individuality — perfect for a platform built on unique content creators. Purple is rare in tech (most go blue), which helps Twitch stand out. The dark UI reduces eye strain during long viewing sessions.",
    founded: "2011",
    website: "twitch.tv",
  },

  // ─── Food & Beverage ───────────────────────────────
  {
    slug: "coca-cola",
    name: "Coca-Cola",
    industry: "Food & Beverage",
    colors: [
      { name: "Red", hex: "#F40009", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Text/Logo" },
      { name: "Black", hex: "#000000", usage: "Accent" },
      { name: "Dark Red", hex: "#C8102E", usage: "Darker Variant" },
    ],
    story: "Coca-Cola's red is arguably the most famous brand color in the world. Originally, the barrels were painted red to distinguish them from alcohol during shipping. The color has come to represent happiness, sharing, and the American dream.",
    founded: "1886",
    website: "coca-cola.com",
  },
  {
    slug: "mcdonalds",
    name: "McDonald's",
    industry: "Food & Beverage",
    colors: [
      { name: "Yellow", hex: "#FFC72C", usage: "Primary (Golden Arches)" },
      { name: "Red", hex: "#DA291C", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Black", hex: "#27251F", usage: "Text" },
      { name: "Green", hex: "#264F36", usage: "European Rebrand" },
    ],
    story: "Red stimulates appetite and urgency. Yellow (the golden arches) signals happiness and warmth. Together, they're the most effective food color combination ever created. In Europe, McDonald's shifted to green backgrounds to project a healthier, eco-friendly image.",
    founded: "1955",
    website: "mcdonalds.com",
  },
  {
    slug: "starbucks",
    name: "Starbucks",
    industry: "Food & Beverage",
    colors: [
      { name: "Green", hex: "#00704A", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Logo/Background" },
      { name: "Black", hex: "#000000", usage: "Text" },
      { name: "Warm Gray", hex: "#D4E9E2", usage: "Light Accent" },
      { name: "Gold", hex: "#CBA258", usage: "Premium/Reserve" },
    ],
    story: "Starbucks green represents growth, freshness, and the connection to nature — the coffee plant itself. The siren logo in white on green creates an iconic, instantly recognizable mark. The gold is reserved for Starbucks Reserve and premium products.",
    founded: "1971",
    website: "starbucks.com",
  },

  // ─── Fashion & Retail ──────────────────────────────
  {
    slug: "nike",
    name: "Nike",
    industry: "Fashion & Retail",
    colors: [
      { name: "Black", hex: "#111111", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Background/Logo" },
      { name: "Nike Orange", hex: "#FA5400", usage: "Accent" },
      { name: "Volt", hex: "#C5FF00", usage: "Performance" },
      { name: "Gray", hex: "#7E7E7E", usage: "Secondary" },
    ],
    story: "Nike's power comes from black and white simplicity — letting the swoosh speak for itself. The 'Volt' green-yellow (used in performance products) was engineered to be the most visible color on a running track. Nike Orange adds energy for marketing campaigns.",
    founded: "1964",
    website: "nike.com",
  },
  {
    slug: "adidas",
    name: "Adidas",
    industry: "Fashion & Retail",
    colors: [
      { name: "Black", hex: "#000000", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Logo/Background" },
      { name: "Blue", hex: "#0066B2", usage: "Originals" },
      { name: "Red", hex: "#EF3340", usage: "Performance" },
      { name: "Green", hex: "#00A651", usage: "Sustainability" },
    ],
    story: "Adidas uses black as its foundation — the three stripes are iconic in any color. Blue represents Adidas Originals (heritage), while the performance line uses red for energy. The green signals their commitment to sustainability with recycled materials.",
    founded: "1949",
    website: "adidas.com",
  },
  {
    slug: "ikea",
    name: "IKEA",
    industry: "Fashion & Retail",
    colors: [
      { name: "Blue", hex: "#0058A3", usage: "Primary" },
      { name: "Yellow", hex: "#FFDA1A", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Black", hex: "#111111", usage: "Text" },
      { name: "Red", hex: "#CC0008", usage: "Sale/Accent" },
    ],
    story: "IKEA's blue and yellow come directly from the Swedish flag — founder Ingvar Kamprad wanted the brand to be unmistakably Swedish. Blue conveys trust and reliability, yellow conveys warmth and optimism. Together they signal: affordable quality from Sweden.",
    founded: "1943",
    website: "ikea.com",
  },

  // ─── Gaming ────────────────────────────────────────
  {
    slug: "nintendo",
    name: "Nintendo",
    industry: "Gaming",
    colors: [
      { name: "Red", hex: "#E60012", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Logo/Background" },
      { name: "Gray", hex: "#8F8F8F", usage: "Hardware" },
      { name: "Neon Blue", hex: "#00C3E3", usage: "Switch (Left)" },
      { name: "Neon Red", hex: "#FF3C28", usage: "Switch (Right)" },
    ],
    story: "Nintendo's red represents the joy, energy, and fun at the heart of gaming. The Switch's neon blue and red Joy-Cons were designed to feel playful and invite multiplayer — two colors, two controllers, two players. Nintendo proves gaming doesn't need to be dark and edgy.",
    founded: "1889",
    website: "nintendo.com",
  },
  {
    slug: "playstation",
    name: "PlayStation",
    industry: "Gaming",
    colors: [
      { name: "Blue", hex: "#003791", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Logo" },
      { name: "Black", hex: "#000000", usage: "Hardware" },
      { name: "Blue Light", hex: "#00439C", usage: "PS5 Light" },
      { name: "Purple", hex: "#6B37FF", usage: "PS Plus" },
    ],
    story: "PlayStation's blue represents depth and immersion — diving into game worlds. The PS5's striking white-and-black hardware broke from the all-black tradition, but the blue light bar kept the brand identity. The purple for PS Plus signals premium and exclusivity.",
    founded: "1994",
    website: "playstation.com",
  },
  {
    slug: "xbox",
    name: "Xbox",
    industry: "Gaming",
    colors: [
      { name: "Green", hex: "#107C10", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Black", hex: "#000000", usage: "Hardware" },
      { name: "Light Green", hex: "#84C447", usage: "Accent" },
      { name: "Gray", hex: "#767676", usage: "Secondary" },
    ],
    story: "Xbox green was chosen to stand apart from PlayStation's blue. Green represents power, energy, and the 'go' signal — jump in and play. The original Xbox's green X became one of gaming's most iconic symbols, and Microsoft has kept the green consistent across 20+ years.",
    founded: "2001",
    website: "xbox.com",
  },
  {
    slug: "steam",
    name: "Steam",
    industry: "Gaming",
    colors: [
      { name: "Dark Blue", hex: "#171A21", usage: "Background" },
      { name: "Blue", hex: "#1B2838", usage: "Surface" },
      { name: "Light Blue", hex: "#66C0F4", usage: "Accent" },
      { name: "Green", hex: "#4C6B22", usage: "Sale/Discount" },
      { name: "White", hex: "#C7D5E0", usage: "Text" },
    ],
    story: "Steam's dark blue palette creates a storefront that lets game artwork pop. The signature light blue accent is used sparingly for links and highlights. Green exclusively signals discounts and sales — Pavlovian conditioning for Steam Sale excitement.",
    founded: "2003",
    website: "store.steampowered.com",
  },

  // ─── Automotive ────────────────────────────────────
  {
    slug: "tesla",
    name: "Tesla",
    industry: "Automotive",
    colors: [
      { name: "Red", hex: "#CC0000", usage: "Primary" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Black", hex: "#000000", usage: "Text" },
      { name: "Silver", hex: "#5C5C5C", usage: "Metallic Accent" },
      { name: "Blue", hex: "#3457D5", usage: "UI Accent" },
    ],
    story: "Tesla's red represents the passion and disruption Elon Musk brought to the auto industry. The minimal black-and-white palette of their website mirrors the clean, tech-forward design of their cars. Tesla proves an electric car brand can feel exciting, not boring.",
    founded: "2003",
    website: "tesla.com",
  },
  {
    slug: "ferrari",
    name: "Ferrari",
    industry: "Automotive",
    colors: [
      { name: "Rosso Corsa", hex: "#FF2800", usage: "Primary" },
      { name: "Yellow", hex: "#FFD700", usage: "Shield" },
      { name: "Black", hex: "#000000", usage: "Text/Accent" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Green", hex: "#008C45", usage: "Italian Flag" },
    ],
    story: "Ferrari's Rosso Corsa (racing red) dates back to early 1900s Grand Prix racing when Italian cars were mandated red. The prancing horse on a yellow shield comes from a WWI fighter ace. Together, these colors are synonymous with speed, luxury, and Italian passion.",
    founded: "1947",
    website: "ferrari.com",
  },

  // ─── Finance ───────────────────────────────────────
  {
    slug: "stripe",
    name: "Stripe",
    industry: "Finance",
    colors: [
      { name: "Purple", hex: "#635BFF", usage: "Primary" },
      { name: "Cyan", hex: "#00D4AA", usage: "Accent" },
      { name: "Blue", hex: "#0A2540", usage: "Dark Background" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Gray", hex: "#425466", usage: "Text" },
    ],
    story: "Stripe's purple breaks from the blue-dominated fintech space. It signals innovation and a developer-first approach. The gradient meshes and vivid color combinations in their marketing set a new standard for fintech design — proving financial tools don't have to look boring.",
    founded: "2010",
    website: "stripe.com",
  },
  {
    slug: "paypal",
    name: "PayPal",
    industry: "Finance",
    colors: [
      { name: "Dark Blue", hex: "#003087", usage: "Primary" },
      { name: "Blue", hex: "#009CDE", usage: "Secondary" },
      { name: "Light Blue", hex: "#012169", usage: "Accent" },
      { name: "White", hex: "#FFFFFF", usage: "Background" },
      { name: "Gray", hex: "#6C7378", usage: "Text" },
    ],
    story: "PayPal's dual-blue palette projects trust and security — essential for a company handling billions in transactions. The overlapping 'P' letters in different blues suggest connection and partnership. Blue has been PayPal's color since its founding, reinforcing reliability.",
    founded: "1998",
    website: "paypal.com",
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function getBrandsByIndustry(industry: string): Brand[] {
  if (industry === "All") return BRANDS;
  return BRANDS.filter((b) => b.industry === industry);
}
