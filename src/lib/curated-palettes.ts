import type { CuratedPalette } from "./types";

export const curatedPalettes: CuratedPalette[] = [
  // ─── Original 30 ──────────────────────────────────────────────────────────
  { id: "midnight-aurora", name: "Midnight Aurora", colors: ["#0D1B2A", "#1B2838", "#2D6A4F", "#40916C", "#95D5B2"], tags: ["nature", "dark", "cool"] },
  { id: "desert-storm", name: "Desert Storm", colors: ["#6B2D05", "#B84A0A", "#E07A1B", "#F2A93B", "#F9E2B8"], tags: ["warm", "earthy", "sunset"] },
  { id: "tokyo-neon", name: "Tokyo Neon", colors: ["#0A0A0F", "#1A1A2E", "#E94560", "#0F3460", "#533483"], tags: ["neon", "dark", "vibrant"] },
  { id: "ocean-breeze", name: "Ocean Breeze", colors: ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"], tags: ["ocean", "cool", "blue"] },
  { id: "sunset-blaze", name: "Sunset Blaze", colors: ["#FF6B35", "#F7C59F", "#EFEFD0", "#004E89", "#1A659E"], tags: ["sunset", "warm", "contrast"] },
  { id: "forest-floor", name: "Forest Floor", colors: ["#1B4332", "#2D6A4F", "#40916C", "#52B788", "#B7E4C7"], tags: ["nature", "green", "earthy"] },
  { id: "lavender-dream", name: "Lavender Dream", colors: ["#E8D5E0", "#C9A9C4", "#9B72AA", "#6A3D9A", "#4A1A6B"], tags: ["pastel", "purple", "soft"] },
  { id: "arctic-frost", name: "Arctic Frost", colors: ["#F0F4F8", "#D9E2EC", "#9FB3C8", "#627D98", "#334E68"], tags: ["cool", "minimal", "professional"] },
  { id: "cherry-blossom", name: "Cherry Blossom", colors: ["#FFB7C5", "#FF8FAB", "#FB6F92", "#E5566D", "#C7253E"], tags: ["pink", "warm", "romantic"] },
  { id: "cyber-punk", name: "Cyber Punk", colors: ["#0D0221", "#0F084B", "#26408B", "#A6F0C6", "#F72585"], tags: ["neon", "dark", "futuristic"] },
  { id: "autumn-harvest", name: "Autumn Harvest", colors: ["#582F0E", "#7F4F24", "#936639", "#A68A64", "#B6AD90"], tags: ["earthy", "warm", "vintage"] },
  { id: "bubblegum", name: "Bubblegum", colors: ["#FF99C8", "#FCF6BD", "#D0F4DE", "#A9DEF9", "#E4C1F9"], tags: ["pastel", "fun", "soft"] },
  { id: "midnight-jazz", name: "Midnight Jazz", colors: ["#10002B", "#240046", "#3C096C", "#5A189A", "#7B2CBF"], tags: ["purple", "dark", "moody"] },
  { id: "terracotta", name: "Terracotta", colors: ["#D4A373", "#CCD5AE", "#E9EDC9", "#FEFAE0", "#FAEDCD"], tags: ["earthy", "warm", "natural"] },
  { id: "nordic-light", name: "Nordic Light", colors: ["#F8F9FA", "#E9ECEF", "#DEE2E6", "#CED4DA", "#ADB5BD"], tags: ["minimal", "gray", "professional"] },
  { id: "coral-reef", name: "Coral Reef", colors: ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"], tags: ["nature", "vibrant", "warm"] },
  { id: "electric-violet", name: "Electric Violet", colors: ["#7400B8", "#6930C3", "#5E60CE", "#5390D9", "#4EA8DE"], tags: ["purple", "blue", "gradient"] },
  { id: "golden-hour", name: "Golden Hour", colors: ["#FF9E00", "#FF8500", "#FF6D00", "#FF5400", "#E63946"], tags: ["warm", "sunset", "vibrant"] },
  { id: "moss-garden", name: "Moss Garden", colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C", "#D80032"], tags: ["contrast", "modern", "bold"] },
  { id: "cotton-candy", name: "Cotton Candy", colors: ["#FEC5BB", "#FCD5CE", "#FAE1DD", "#F8EDEB", "#E8E8E4"], tags: ["pastel", "soft", "warm"] },
  { id: "deep-space", name: "Deep Space", colors: ["#000814", "#001D3D", "#003566", "#FFC300", "#FFD60A"], tags: ["dark", "contrast", "bold"] },
  { id: "sage-wisdom", name: "Sage & Wisdom", colors: ["#606C38", "#283618", "#FEFAE0", "#DDA15E", "#BC6C25"], tags: ["earthy", "natural", "organic"] },
  { id: "peach-sorbet", name: "Peach Sorbet", colors: ["#FFCDB2", "#FFB4A2", "#E5989B", "#B5838D", "#6D6875"], tags: ["pastel", "warm", "soft"] },
  { id: "northern-lights", name: "Northern Lights", colors: ["#0B090A", "#161A1D", "#660708", "#A4161A", "#BA181B"], tags: ["dark", "red", "moody"] },
  { id: "retro-wave", name: "Retro Wave", colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#D90429", "#EF233C"], tags: ["retro", "bold", "modern"] },
  { id: "emerald-city", name: "Emerald City", colors: ["#004B23", "#006400", "#007200", "#008000", "#38B000"], tags: ["green", "nature", "vibrant"] },
  { id: "volcanic-ash", name: "Volcanic Ash", colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#533483"], tags: ["dark", "moody", "contrast"] },
  { id: "tropical-sunset", name: "Tropical Sunset", colors: ["#F72585", "#B5179E", "#7209B7", "#560BAD", "#480CA8"], tags: ["vibrant", "gradient", "warm"] },
  { id: "whiskey-sour", name: "Whiskey Sour", colors: ["#3D0C02", "#6B200C", "#A0522D", "#CD853F", "#DEB887"], tags: ["warm", "earthy", "vintage"] },
  { id: "ice-cream", name: "Ice Cream", colors: ["#F4978E", "#F8AD9D", "#FBC4AB", "#FFDAB9", "#FFE5D9"], tags: ["pastel", "warm", "sweet"] },

  // ─── Professional / Corporate ─────────────────────────────────────────────
  { id: "executive-suite", name: "Executive Suite", colors: ["#0A1628", "#1B3A5C", "#3D6B99", "#7CA1C4", "#C8D9E6"], tags: ["professional", "corporate", "blue", "minimal"] },
  { id: "boardroom", name: "Boardroom", colors: ["#1A1A2E", "#2D2D44", "#4A4A68", "#8E8EA0", "#C4C4D0"], tags: ["professional", "corporate", "gray", "dark"] },
  { id: "trust-fund", name: "Trust Fund", colors: ["#003049", "#005F73", "#0A9396", "#94D2BD", "#E9D8A6"], tags: ["professional", "corporate", "teal", "gradient"] },
  { id: "pitch-deck", name: "Pitch Deck", colors: ["#2D3142", "#4F5D75", "#BFC0C0", "#EF8354", "#FFFFFF"], tags: ["professional", "modern", "startup", "contrast"] },
  { id: "law-firm", name: "Law Firm", colors: ["#1B1B1E", "#373740", "#6C6C80", "#B8B8C8", "#F0F0F5"], tags: ["professional", "corporate", "minimal", "gray"] },

  // ─── Neon / Cyberpunk ─────────────────────────────────────────────────────
  { id: "neon-nightlife", name: "Neon Nightlife", colors: ["#0D0D0D", "#FF00FF", "#00FFFF", "#FF0080", "#8000FF"], tags: ["neon", "cyberpunk", "dark", "vibrant"] },
  { id: "synthwave-grid", name: "Synthwave Grid", colors: ["#0F0326", "#2A0845", "#6818A5", "#E645CF", "#FFC857"], tags: ["neon", "cyberpunk", "retro", "gradient"] },
  { id: "digital-rain", name: "Digital Rain", colors: ["#0A0A0A", "#003300", "#00FF41", "#00CC33", "#001A00"], tags: ["neon", "cyberpunk", "green", "hacker"] },
  { id: "plasma-burst", name: "Plasma Burst", colors: ["#120026", "#4A0072", "#8E00E0", "#D900FF", "#FF59F7"], tags: ["neon", "cyberpunk", "purple", "vibrant"] },
  { id: "arcade-cabinet", name: "Arcade Cabinet", colors: ["#1A1A2E", "#E94560", "#0F3460", "#16C79A", "#FFDD00"], tags: ["neon", "retro", "fun", "vibrant"] },

  // ─── Nature: Forest ───────────────────────────────────────────────────────
  { id: "redwood-trail", name: "Redwood Trail", colors: ["#2C1810", "#4A3228", "#6B4423", "#8B7355", "#C4A882"], tags: ["nature", "forest", "earthy", "warm"] },
  { id: "pine-canopy", name: "Pine Canopy", colors: ["#0B3D0B", "#1A5C1A", "#2E7D32", "#4CAF50", "#A5D6A7"], tags: ["nature", "forest", "green", "fresh"] },
  { id: "mossy-stone", name: "Mossy Stone", colors: ["#3E4A3E", "#556B2F", "#6B8E23", "#9ACD32", "#DAE4BC"], tags: ["nature", "forest", "earthy", "organic"] },
  { id: "enchanted-grove", name: "Enchanted Grove", colors: ["#1A2F1A", "#2D5A27", "#3E8914", "#7EC850", "#D4EDDA"], tags: ["nature", "forest", "green", "fantasy"] },

  // ─── Nature: Ocean ────────────────────────────────────────────────────────
  { id: "deep-dive", name: "Deep Dive", colors: ["#000A14", "#001F3F", "#003D7A", "#0074D9", "#7FDBFF"], tags: ["nature", "ocean", "blue", "dark"] },
  { id: "coastal-fog", name: "Coastal Fog", colors: ["#94A3B8", "#B0BEC5", "#CFD8DC", "#E0E7ED", "#F1F5F9"], tags: ["nature", "ocean", "gray", "soft"] },
  { id: "tropical-lagoon", name: "Tropical Lagoon", colors: ["#004D61", "#00838F", "#00ACC1", "#4DD0E1", "#B2EBF2"], tags: ["nature", "ocean", "teal", "vibrant"] },
  { id: "tide-pool", name: "Tide Pool", colors: ["#1A3C40", "#2C6E6F", "#40A69F", "#6FD5CE", "#C0F0EC"], tags: ["nature", "ocean", "teal", "fresh"] },

  // ─── Nature: Mountain ─────────────────────────────────────────────────────
  { id: "alpine-dawn", name: "Alpine Dawn", colors: ["#2C3E50", "#5D6D7E", "#ABB7C5", "#F0C27F", "#FC5C65"], tags: ["nature", "mountain", "contrast", "warm"] },
  { id: "granite-peak", name: "Granite Peak", colors: ["#36363C", "#52525B", "#71717A", "#A1A1AA", "#D4D4D8"], tags: ["nature", "mountain", "gray", "minimal"] },
  { id: "snowcapped", name: "Snowcapped", colors: ["#1E3A5F", "#4A6FA5", "#8AAEE0", "#C5DCF0", "#F0F5FA"], tags: ["nature", "mountain", "blue", "winter"] },

  // ─── Food / Drink: Coffee ─────────────────────────────────────────────────
  { id: "espresso-shot", name: "Espresso Shot", colors: ["#1B0E04", "#3C1E08", "#6F4518", "#A67B5B", "#D4B896"], tags: ["food", "coffee", "warm", "earthy"] },
  { id: "latte-art", name: "Latte Art", colors: ["#4B3621", "#7B5B3A", "#C19A6B", "#E3CBA8", "#FAF0E6"], tags: ["food", "coffee", "warm", "soft"] },
  { id: "mocha-swirl", name: "Mocha Swirl", colors: ["#2C1608", "#5C3317", "#8B6242", "#C49A6C", "#F5E6D3"], tags: ["food", "coffee", "warm", "gradient"] },

  // ─── Food / Drink: Wine ───────────────────────────────────────────────────
  { id: "cabernet", name: "Cabernet", colors: ["#2B0012", "#5B0028", "#8B0A3A", "#B83B5E", "#F08A9E"], tags: ["food", "wine", "dark", "romantic"] },
  { id: "rose-garden", name: "Rose Garden", colors: ["#6B1D3A", "#A03060", "#D45087", "#F093B0", "#FFD6E4"], tags: ["food", "wine", "pink", "gradient"] },

  // ─── Food / Drink: Citrus ─────────────────────────────────────────────────
  { id: "citrus-squeeze", name: "Citrus Squeeze", colors: ["#E65100", "#F57C00", "#FFB300", "#FDD835", "#FFF9C4"], tags: ["food", "citrus", "warm", "vibrant"] },
  { id: "blood-orange", name: "Blood Orange", colors: ["#BF360C", "#E64A19", "#FF6E40", "#FFAB91", "#FBE9E7"], tags: ["food", "citrus", "warm", "bold"] },
  { id: "lime-fizz", name: "Lime Fizz", colors: ["#33691E", "#558B2F", "#8BC34A", "#C5E1A5", "#F1F8E9"], tags: ["food", "citrus", "green", "fresh"] },

  // ─── Seasons: Spring ──────────────────────────────────────────────────────
  { id: "spring-bloom", name: "Spring Bloom", colors: ["#F8BBD0", "#F48FB1", "#CE93D8", "#80CBC4", "#A5D6A7"], tags: ["season", "spring", "pastel", "fresh"] },
  { id: "cherry-orchard", name: "Cherry Orchard", colors: ["#FFF0F5", "#FFB8D0", "#FF69B4", "#C71585", "#8B0060"], tags: ["season", "spring", "pink", "gradient"] },
  { id: "morning-dew", name: "Morning Dew", colors: ["#E8F5E9", "#C8E6C9", "#81C784", "#66BB6A", "#43A047"], tags: ["season", "spring", "green", "fresh"] },

  // ─── Seasons: Summer ──────────────────────────────────────────────────────
  { id: "summer-haze", name: "Summer Haze", colors: ["#FF6F61", "#FFB347", "#FFE135", "#87CEEB", "#4ECDC4"], tags: ["season", "summer", "vibrant", "warm"] },
  { id: "poolside", name: "Poolside", colors: ["#0277BD", "#0288D1", "#4FC3F7", "#E1F5FE", "#FFFDE7"], tags: ["season", "summer", "blue", "fresh"] },
  { id: "tropical-punch", name: "Tropical Punch", colors: ["#D50000", "#FF6D00", "#FFAB00", "#00C853", "#00B8D4"], tags: ["season", "summer", "vibrant", "fun"] },

  // ─── Seasons: Fall ────────────────────────────────────────────────────────
  { id: "fall-foliage", name: "Fall Foliage", colors: ["#8B2500", "#CD6600", "#DAA520", "#8B7355", "#556B2F"], tags: ["season", "fall", "warm", "earthy"] },
  { id: "pumpkin-spice", name: "Pumpkin Spice", colors: ["#3E2723", "#5D4037", "#D84315", "#FF8A65", "#FFF3E0"], tags: ["season", "fall", "warm", "cozy"] },
  { id: "harvest-moon", name: "Harvest Moon", colors: ["#1A0A00", "#4E3524", "#B8860B", "#FFD700", "#FFFACD"], tags: ["season", "fall", "warm", "gold"] },

  // ─── Seasons: Winter ──────────────────────────────────────────────────────
  { id: "winter-frost", name: "Winter Frost", colors: ["#CFD8DC", "#B0BEC5", "#90A4AE", "#607D8B", "#37474F"], tags: ["season", "winter", "cool", "gray"] },
  { id: "ice-crystal", name: "Ice Crystal", colors: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#42A5F5", "#1565C0"], tags: ["season", "winter", "blue", "cool"] },
  { id: "holiday-cheer", name: "Holiday Cheer", colors: ["#1B5E20", "#2E7D32", "#C62828", "#D32F2F", "#FFD54F"], tags: ["season", "winter", "bold", "festive"] },

  // ─── Extra Creative ───────────────────────────────────────────────────────
  { id: "vaporwave", name: "Vaporwave", colors: ["#FF71CE", "#01CDFE", "#05FFA1", "#B967FF", "#FFFB96"], tags: ["retro", "neon", "fun", "aesthetic"] },
  { id: "bauhaus", name: "Bauhaus", colors: ["#1A1A1A", "#BE1E2D", "#F2C94C", "#2D9CDB", "#F2F2F2"], tags: ["modern", "bold", "design", "contrast"] },
  { id: "studio-ghibli", name: "Studio Ghibli", colors: ["#5B8C5A", "#8FBC8F", "#C5E0B4", "#F0EAD6", "#87CEEB"], tags: ["soft", "nature", "fantasy", "pastel"] },
  { id: "terracotta-sky", name: "Terracotta Sky", colors: ["#C06014", "#D98E73", "#F0C8A8", "#A8D0DB", "#5E97A8"], tags: ["earthy", "warm", "contrast", "nature"] },
  { id: "ink-wash", name: "Ink Wash", colors: ["#0A0A0A", "#2A2A2A", "#5A5A5A", "#9A9A9A", "#E0E0E0"], tags: ["minimal", "gray", "elegant", "monochrome"] },
  { id: "candy-shop", name: "Candy Shop", colors: ["#FF6B6B", "#FFA07A", "#FFD93D", "#6BCB77", "#4D96FF"], tags: ["fun", "vibrant", "playful", "sweet"] },
  { id: "dusty-rose", name: "Dusty Rose", colors: ["#B76E79", "#C4918A", "#D4B2A7", "#E8D5CC", "#F5EDE8"], tags: ["pink", "soft", "romantic", "warm"] },
  { id: "midnight-oil", name: "Midnight Oil", colors: ["#0D1117", "#161B22", "#21262D", "#30363D", "#484F58"], tags: ["dark", "minimal", "developer", "moody"] },

  // ─── Game UI ────────────────────────────────────────────────────────────────
  { id: "health-bar", name: "Health Bar", colors: ["#1A0000", "#8B0000", "#FF0000", "#FF4444", "#FF8888"], tags: ["game", "ui", "red", "dark"] },
  { id: "mana-pool", name: "Mana Pool", colors: ["#0A0028", "#1A0050", "#3300AA", "#6644FF", "#AA88FF"], tags: ["game", "ui", "purple", "fantasy"] },
  { id: "xp-grind", name: "XP Grind", colors: ["#0A1A00", "#1A3300", "#2D5500", "#55AA00", "#88FF00"], tags: ["game", "ui", "green", "vibrant"] },
  { id: "loot-legendary", name: "Loot Legendary", colors: ["#1A0A00", "#4D2600", "#995200", "#FF8C00", "#FFD700"], tags: ["game", "ui", "gold", "warm"] },
  { id: "dungeon-crawl", name: "Dungeon Crawl", colors: ["#0A0A14", "#14142A", "#1E1E3F", "#3A3A6E", "#6A5ACD"], tags: ["game", "fantasy", "dark", "moody"] },
  { id: "pixel-retro", name: "Pixel Retro", colors: ["#0F380F", "#306230", "#8BAC0F", "#9BBC0F", "#E0F8D0"], tags: ["game", "retro", "green", "pixel"] },
  { id: "space-invader", name: "Space Invader", colors: ["#000011", "#0D0D3B", "#1A1A6B", "#00FF88", "#FFFFFF"], tags: ["game", "retro", "neon", "dark"] },
  { id: "fire-emblem", name: "Fire Emblem", colors: ["#1C1427", "#2E1A47", "#C41E3A", "#FF4D6A", "#FFB6C1"], tags: ["game", "fantasy", "red", "bold"] },
  { id: "frozen-tundra", name: "Frozen Tundra", colors: ["#1A2332", "#2A3F54", "#5B9BD5", "#8ECAE6", "#E0F2FE"], tags: ["game", "fantasy", "blue", "cool"] },
  { id: "toxic-waste", name: "Toxic Waste", colors: ["#0D0D0D", "#1A2E05", "#2D5016", "#39FF14", "#7FFF00"], tags: ["game", "neon", "green", "dark"] },

  // ─── Illustration / Character Design ────────────────────────────────────────
  { id: "skin-tones-warm", name: "Warm Skin Tones", colors: ["#8D5524", "#C68642", "#E0AC69", "#F1C27D", "#FFDBAC"], tags: ["illustration", "character", "warm", "skin"] },
  { id: "skin-tones-cool", name: "Cool Skin Tones", colors: ["#6B4423", "#A0704E", "#C4956A", "#DBBB98", "#F0DCC8"], tags: ["illustration", "character", "cool", "skin"] },
  { id: "anime-hair", name: "Anime Hair", colors: ["#FF1493", "#9B30FF", "#00BFFF", "#FF6347", "#FFD700"], tags: ["illustration", "character", "vibrant", "anime"] },
  { id: "cel-shading", name: "Cel Shading", colors: ["#1A1A2E", "#2D2D5E", "#4A4AE0", "#7B7BFF", "#C8C8FF"], tags: ["illustration", "character", "blue", "anime"] },
  { id: "watercolor-wash", name: "Watercolor Wash", colors: ["#E8D4C0", "#D4B5A0", "#C49684", "#8EACBB", "#6B9DAB"], tags: ["illustration", "soft", "warm", "artistic"] },
  { id: "comic-book", name: "Comic Book", colors: ["#1A1A1A", "#FF0000", "#0000FF", "#FFFF00", "#FFFFFF"], tags: ["illustration", "bold", "vibrant", "contrast"] },
  { id: "fantasy-elf", name: "Fantasy Elf", colors: ["#2E4A3E", "#4A7C5E", "#7DB892", "#B8D4B8", "#EAF2E3"], tags: ["illustration", "character", "green", "fantasy"] },
  { id: "shadow-palette", name: "Shadow Palette", colors: ["#1A1423", "#2E2240", "#483660", "#6B5090", "#9A80C0"], tags: ["illustration", "character", "purple", "moody"] },
  { id: "sunset-warrior", name: "Sunset Warrior", colors: ["#2D1B0E", "#6B3A1F", "#D4722A", "#F0A050", "#FFD4A0"], tags: ["illustration", "character", "warm", "earthy"] },
  { id: "chibi-pastel", name: "Chibi Pastel", colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"], tags: ["illustration", "character", "pastel", "cute"] },

  // ─── E-commerce / Product ───────────────────────────────────────────────────
  { id: "luxury-noir", name: "Luxury Noir", colors: ["#0A0A0A", "#1A1A1A", "#C9A96E", "#D4AF37", "#F5E6C8"], tags: ["ecommerce", "luxury", "dark", "gold"] },
  { id: "clean-checkout", name: "Clean Checkout", colors: ["#FFFFFF", "#F5F5F5", "#333333", "#4CAF50", "#FF5722"], tags: ["ecommerce", "ui", "minimal", "modern"] },
  { id: "fashion-forward", name: "Fashion Forward", colors: ["#1A1A1A", "#F5F5F0", "#C8A97E", "#8B7355", "#E8D5C0"], tags: ["ecommerce", "fashion", "elegant", "warm"] },
  { id: "fresh-market", name: "Fresh Market", colors: ["#2E7D32", "#66BB6A", "#FFF8E1", "#FF8F00", "#D84315"], tags: ["ecommerce", "food", "fresh", "vibrant"] },
  { id: "tech-store", name: "Tech Store", colors: ["#0D1117", "#1E2A38", "#3B82F6", "#60A5FA", "#F0F6FF"], tags: ["ecommerce", "tech", "blue", "modern"] },
  { id: "beauty-blush", name: "Beauty Blush", colors: ["#FFF5F5", "#FED7D7", "#E8899E", "#C05780", "#6B2048"], tags: ["ecommerce", "beauty", "pink", "elegant"] },
  { id: "organic-shop", name: "Organic Shop", colors: ["#F9F6F0", "#E8E0D0", "#A8B89C", "#6B8F5E", "#3D5A2E"], tags: ["ecommerce", "organic", "green", "natural"] },
  { id: "flash-sale", name: "Flash Sale", colors: ["#1A1A2E", "#E94560", "#FFD700", "#FFFFFF", "#0F3460"], tags: ["ecommerce", "bold", "contrast", "vibrant"] },

  // ─── Brand Identity / SaaS ──────────────────────────────────────────────────
  { id: "saas-primary", name: "SaaS Primary", colors: ["#0F172A", "#1E293B", "#3B82F6", "#60A5FA", "#EFF6FF"], tags: ["brand", "saas", "blue", "professional"] },
  { id: "startup-energy", name: "Startup Energy", colors: ["#1A1A2E", "#6C63FF", "#FF6584", "#F8F8FF", "#2D3436"], tags: ["brand", "saas", "vibrant", "modern"] },
  { id: "fintech-trust", name: "Fintech Trust", colors: ["#0A2540", "#1B4570", "#00D4AA", "#00F0C8", "#F6F9FC"], tags: ["brand", "saas", "teal", "professional"] },
  { id: "health-tech", name: "Health Tech", colors: ["#0D1B2A", "#16A085", "#1ABC9C", "#E8F6F3", "#FFFFFF"], tags: ["brand", "saas", "green", "minimal"] },
  { id: "creative-agency", name: "Creative Agency", colors: ["#1A1A2E", "#FF6B6B", "#FFC93C", "#4ECDC4", "#F8F8F8"], tags: ["brand", "creative", "vibrant", "fun"] },
  { id: "devtools", name: "DevTools", colors: ["#0D1117", "#161B22", "#58A6FF", "#3FB950", "#F78166"], tags: ["brand", "developer", "dark", "modern"] },
  { id: "ai-gradient", name: "AI Gradient", colors: ["#0F0720", "#1A0F3C", "#6366F1", "#A78BFA", "#E0E7FF"], tags: ["brand", "saas", "purple", "gradient"] },
  { id: "social-media-brand", name: "Social Media", colors: ["#1A1A2E", "#E1306C", "#FCAF45", "#405DE6", "#5B51D8"], tags: ["brand", "social", "vibrant", "gradient"] },

  // ─── UI / App Design ────────────────────────────────────────────────────────
  { id: "ios-light", name: "iOS Light", colors: ["#FFFFFF", "#F2F2F7", "#007AFF", "#34C759", "#FF3B30"], tags: ["ui", "app", "minimal", "modern"] },
  { id: "ios-dark", name: "iOS Dark", colors: ["#000000", "#1C1C1E", "#0A84FF", "#30D158", "#FF453A"], tags: ["ui", "app", "dark", "modern"] },
  { id: "material-you", name: "Material You", colors: ["#FFFBFE", "#D0BCFF", "#6750A4", "#7D5260", "#EADDFF"], tags: ["ui", "app", "purple", "modern"] },
  { id: "dashboard-dark", name: "Dashboard Dark", colors: ["#0F1117", "#1A1D27", "#262A36", "#3B82F6", "#10B981"], tags: ["ui", "dashboard", "dark", "professional"] },
  { id: "dashboard-light", name: "Dashboard Light", colors: ["#FFFFFF", "#F8FAFC", "#E2E8F0", "#6366F1", "#EC4899"], tags: ["ui", "dashboard", "minimal", "modern"] },
  { id: "toast-system", name: "Toast System", colors: ["#1C1C1E", "#22C55E", "#EAB308", "#EF4444", "#3B82F6"], tags: ["ui", "status", "vibrant", "dark"] },
  { id: "glassmorphism", name: "Glassmorphism", colors: ["#0F0F23", "#1A1A3E", "#FFFFFF", "#C7D2FE", "#818CF8"], tags: ["ui", "modern", "blue", "gradient"] },
  { id: "neumorphism", name: "Neumorphism", colors: ["#E0E5EC", "#D1D9E6", "#F0F4F8", "#A3B1C6", "#8899AA"], tags: ["ui", "soft", "gray", "minimal"] },

  // ─── Editorial / Magazine ───────────────────────────────────────────────────
  { id: "editorial-serif", name: "Editorial Serif", colors: ["#1A1A1A", "#333333", "#8B0000", "#F5F5DC", "#FFFFF0"], tags: ["editorial", "elegant", "dark", "contrast"] },
  { id: "magazine-pop", name: "Magazine Pop", colors: ["#FF1744", "#FFD600", "#00E676", "#2979FF", "#1A1A1A"], tags: ["editorial", "bold", "vibrant", "modern"] },
  { id: "monograph", name: "Monograph", colors: ["#F8F5F0", "#E8E2D8", "#C0B8A8", "#605848", "#2A2420"], tags: ["editorial", "warm", "elegant", "minimal"] },
  { id: "broadsheet", name: "Broadsheet", colors: ["#1B1B1B", "#4A4A4A", "#8A8A8A", "#D4D4D4", "#FAFAFA"], tags: ["editorial", "gray", "professional", "minimal"] },
  { id: "art-deco-print", name: "Art Deco Print", colors: ["#1A1A2E", "#C9B037", "#D4AF37", "#F5E6C8", "#FAF0E6"], tags: ["editorial", "gold", "luxury", "vintage"] },

  // ─── Abstract / Creative ────────────────────────────────────────────────────
  { id: "holographic", name: "Holographic", colors: ["#FF6BFF", "#6BFFFF", "#FF6B6B", "#6BFF6B", "#FFE66B"], tags: ["creative", "vibrant", "gradient", "fun"] },
  { id: "oil-painting", name: "Oil Painting", colors: ["#2C1810", "#8B4513", "#CD853F", "#4682B4", "#F0E68C"], tags: ["creative", "artistic", "warm", "vintage"] },
  { id: "brutalism", name: "Brutalism", colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#FFFF00"], tags: ["creative", "bold", "contrast", "modern"] },
  { id: "zen-garden", name: "Zen Garden", colors: ["#F5F0EB", "#E8DDD0", "#C4B7A6", "#8B9E82", "#556B4E"], tags: ["creative", "natural", "soft", "minimal"] },
  { id: "aurora-borealis", name: "Aurora Borealis", colors: ["#041C32", "#04293A", "#064663", "#1DB954", "#1ED760"], tags: ["creative", "nature", "green", "dark"] },
  { id: "prism-light", name: "Prism Light", colors: ["#FF0080", "#FF8000", "#FFFF00", "#00FF80", "#0080FF"], tags: ["creative", "vibrant", "gradient", "bold"] },
  { id: "clay-studio", name: "Clay Studio", colors: ["#D4A574", "#C08552", "#A66C3E", "#8B572A", "#6E4020"], tags: ["creative", "earthy", "warm", "organic"] },
  { id: "film-noir", name: "Film Noir", colors: ["#0A0A0A", "#1A1A1A", "#333333", "#666666", "#C0C0C0"], tags: ["creative", "dark", "moody", "monochrome"] },

  // ─── Trending 2026 ─────────────────────────────────────────────────────────
  { id: "cloud-dancer", name: "Cloud Dancer", colors: ["#F5F3EE", "#E8E4DB", "#D4CFC3", "#B8B2A4", "#9C9688"], tags: ["trending", "2026", "neutral", "soft"] },
  { id: "mocha-mousse", name: "Mocha Mousse", colors: ["#A47764", "#8B6050", "#C49B88", "#DEC4B5", "#F0E2D8"], tags: ["trending", "2026", "warm", "earthy"] },
  { id: "espresso-martini", name: "Espresso Martini", colors: ["#1C110A", "#3B2314", "#5E3A22", "#8B6242", "#C8A882"], tags: ["trending", "2026", "brown", "dark"] },
  { id: "blue-green-tech", name: "Blue-Green Tech", colors: ["#0A1628", "#0D3B4D", "#0E7C7B", "#17BEBB", "#D4F4F0"], tags: ["trending", "2026", "teal", "modern"] },
  { id: "medical-mint", name: "Medical Mint", colors: ["#E8F8F5", "#A3E4D7", "#48C9B0", "#1ABC9C", "#0E8C6E"], tags: ["trending", "2026", "green", "fresh"] },
  { id: "controlled-neon", name: "Controlled Neon", colors: ["#0D0D12", "#1A1A24", "#2E2E3A", "#39FF14", "#FF00FF"], tags: ["trending", "2026", "neon", "dark"] },
  { id: "warm-limestone", name: "Warm Limestone", colors: ["#F2EDE4", "#E5DDD0", "#CFC3B0", "#B5A68F", "#968A72"], tags: ["trending", "2026", "neutral", "warm"] },
  { id: "cacao-nibs", name: "Cacao Nibs", colors: ["#1E0F08", "#3D2116", "#6B3E2A", "#A0664E", "#D4997A"], tags: ["trending", "2026", "brown", "earthy"] },
  { id: "acid-chrome", name: "Acid Chrome", colors: ["#0A0A0A", "#C0C0C0", "#E8E8E8", "#CCFF00", "#00FFCC"], tags: ["trending", "2026", "metallic", "vibrant"] },
  { id: "soft-futurism", name: "Soft Futurism", colors: ["#F0E6FF", "#D4BBFF", "#A78BFA", "#7C3AED", "#4C1D95"], tags: ["trending", "2026", "purple", "gradient"] },

  // ─── Dark Mode Essentials ──────────────────────────────────────────────────
  { id: "github-dark", name: "GitHub Dark", colors: ["#0D1117", "#161B22", "#21262D", "#C9D1D9", "#F0F6FC"], tags: ["dark-mode", "developer", "gray", "modern"] },
  { id: "discord-blurple", name: "Discord Vibes", colors: ["#1E1F22", "#2B2D31", "#313338", "#5865F2", "#FFFFFF"], tags: ["dark-mode", "social", "blue", "modern"] },
  { id: "spotify-green", name: "Spotify Green", colors: ["#121212", "#181818", "#282828", "#1DB954", "#B3B3B3"], tags: ["dark-mode", "music", "green", "minimal"] },
  { id: "linear-dark", name: "Linear Dark", colors: ["#0A0B0E", "#141519", "#1E1F24", "#5E6AD2", "#EDEEF0"], tags: ["dark-mode", "saas", "purple", "modern"] },
  { id: "notion-dark", name: "Notion Dark", colors: ["#191919", "#202020", "#2F2F2F", "#EBEBEB", "#9B9A97"], tags: ["dark-mode", "minimal", "gray", "professional"] },
  { id: "vercel-dark", name: "Vercel Dark", colors: ["#000000", "#111111", "#333333", "#EAEAEA", "#0070F3"], tags: ["dark-mode", "developer", "blue", "minimal"] },
  { id: "obsidian-dark", name: "Obsidian Dark", colors: ["#1A1A2E", "#202040", "#2A2A50", "#8B5CF6", "#E0E0E0"], tags: ["dark-mode", "purple", "moody", "modern"] },

  // ─── Material Design ───────────────────────────────────────────────────────
  { id: "material-red", name: "Material Red", colors: ["#FFEBEE", "#EF9A9A", "#F44336", "#D32F2F", "#B71C1C"], tags: ["material", "red", "vibrant", "ui"] },
  { id: "material-blue", name: "Material Blue", colors: ["#E3F2FD", "#90CAF9", "#2196F3", "#1565C0", "#0D47A1"], tags: ["material", "blue", "vibrant", "ui"] },
  { id: "material-green", name: "Material Green", colors: ["#E8F5E9", "#A5D6A7", "#4CAF50", "#2E7D32", "#1B5E20"], tags: ["material", "green", "vibrant", "ui"] },
  { id: "material-amber", name: "Material Amber", colors: ["#FFF8E1", "#FFE082", "#FFC107", "#FF8F00", "#FF6F00"], tags: ["material", "amber", "warm", "ui"] },
  { id: "material-purple", name: "Material Purple", colors: ["#F3E5F5", "#CE93D8", "#9C27B0", "#7B1FA2", "#4A148C"], tags: ["material", "purple", "vibrant", "ui"] },
  { id: "material-teal", name: "Material Teal", colors: ["#E0F2F1", "#80CBC4", "#009688", "#00796B", "#004D40"], tags: ["material", "teal", "cool", "ui"] },

  // ─── Accessibility-First ──────────────────────────────────────────────────
  { id: "high-contrast-warm", name: "High Contrast Warm", colors: ["#1A1A1A", "#D97706", "#F59E0B", "#FEF3C7", "#FFFFFF"], tags: ["accessible", "contrast", "warm", "professional"] },
  { id: "high-contrast-cool", name: "High Contrast Cool", colors: ["#0F172A", "#2563EB", "#60A5FA", "#DBEAFE", "#FFFFFF"], tags: ["accessible", "contrast", "cool", "professional"] },
  { id: "colorblind-safe", name: "Colorblind Safe", colors: ["#1A1A2E", "#E69F00", "#56B4E9", "#009E73", "#F0E442"], tags: ["accessible", "colorblind", "vibrant", "safe"] },
  { id: "dyslexia-friendly", name: "Dyslexia Friendly", colors: ["#FDF6E3", "#EEE8D5", "#586E75", "#268BD2", "#2AA198"], tags: ["accessible", "warm", "soft", "professional"] },

  // ─── Tailwind CSS ──────────────────────────────────────────────────────────
  { id: "tailwind-slate", name: "Tailwind Slate", colors: ["#F8FAFC", "#CBD5E1", "#64748B", "#334155", "#0F172A"], tags: ["tailwind", "gray", "minimal", "professional"] },
  { id: "tailwind-indigo", name: "Tailwind Indigo", colors: ["#EEF2FF", "#A5B4FC", "#6366F1", "#4338CA", "#312E81"], tags: ["tailwind", "purple", "vibrant", "ui"] },
  { id: "tailwind-emerald", name: "Tailwind Emerald", colors: ["#ECFDF5", "#6EE7B7", "#10B981", "#047857", "#064E3B"], tags: ["tailwind", "green", "fresh", "ui"] },
  { id: "tailwind-rose", name: "Tailwind Rose", colors: ["#FFF1F2", "#FDA4AF", "#F43F5E", "#BE123C", "#881337"], tags: ["tailwind", "pink", "vibrant", "ui"] },
  { id: "tailwind-sky", name: "Tailwind Sky", colors: ["#F0F9FF", "#7DD3FC", "#0EA5E9", "#0369A1", "#0C4A6E"], tags: ["tailwind", "blue", "fresh", "ui"] },
  { id: "tailwind-amber", name: "Tailwind Amber", colors: ["#FFFBEB", "#FCD34D", "#F59E0B", "#B45309", "#78350F"], tags: ["tailwind", "amber", "warm", "ui"] },

  // ─── Architecture / Interior ──────────────────────────────────────────────
  { id: "japandi", name: "Japandi", colors: ["#F5F0E8", "#D4C9B8", "#A89880", "#6B5E4D", "#3D352A"], tags: ["interior", "minimal", "warm", "organic"] },
  { id: "scandinavian", name: "Scandinavian", colors: ["#FFFFFF", "#F0EFEB", "#D5D0C7", "#9C9588", "#4A4540"], tags: ["interior", "minimal", "neutral", "soft"] },
  { id: "mid-century", name: "Mid-Century Modern", colors: ["#2B2D2C", "#CE6032", "#E8B75D", "#5A8F7B", "#3C5C6A"], tags: ["interior", "retro", "warm", "bold"] },
  { id: "art-deco-gold", name: "Art Deco", colors: ["#0C1B33", "#1A365D", "#D4AF37", "#F0D78C", "#FAF0D7"], tags: ["interior", "luxury", "gold", "dark"] },
  { id: "mediterranean", name: "Mediterranean", colors: ["#FFECD2", "#FCB69F", "#A0522D", "#0077B6", "#023E8A"], tags: ["interior", "warm", "blue", "earthy"] },
  { id: "wabi-sabi", name: "Wabi-Sabi", colors: ["#F0EBE3", "#E0D8CC", "#C4B8A8", "#8B7E6F", "#5C5347"], tags: ["interior", "earthy", "minimal", "organic"] },

  // ─── Photography ───────────────────────────────────────────────────────────
  { id: "golden-vintage", name: "Golden Vintage", colors: ["#F4E5C3", "#D4B483", "#A67C52", "#6B4423", "#2E1B0E"], tags: ["photography", "vintage", "warm", "earthy"] },
  { id: "moody-portrait", name: "Moody Portrait", colors: ["#0A0A0E", "#1A1A24", "#3A3A4A", "#8888A0", "#C0C0D0"], tags: ["photography", "dark", "moody", "cool"] },
  { id: "film-kodak", name: "Film Kodak", colors: ["#FFF8E7", "#FFE4B5", "#F4A460", "#CD853F", "#8B4513"], tags: ["photography", "film", "warm", "vintage"] },
  { id: "film-fuji", name: "Film Fuji", colors: ["#E8F5F0", "#A8D8C8", "#60B09A", "#2D8A6E", "#1A5240"], tags: ["photography", "film", "cool", "green"] },

  // ─── Wedding / Events ──────────────────────────────────────────────────────
  { id: "bridal-blush", name: "Bridal Blush", colors: ["#FFFAF5", "#FFEAE0", "#FFD5C8", "#E8A598", "#C47B6F"], tags: ["wedding", "pink", "soft", "romantic"] },
  { id: "garden-party", name: "Garden Party", colors: ["#F8F5F0", "#D4E5D0", "#A8C8A0", "#7BAA70", "#D4B896"], tags: ["wedding", "green", "soft", "natural"] },
  { id: "midnight-gala", name: "Midnight Gala", colors: ["#0A0A14", "#1A1A30", "#2D2D5A", "#D4AF37", "#F0E6C8"], tags: ["wedding", "dark", "gold", "luxury"] },

  // ─── Gradient Starters ─────────────────────────────────────────────────────
  { id: "sunset-mesh", name: "Sunset Mesh", colors: ["#FF6B6B", "#FFA07A", "#FFD93D", "#4ECDC4", "#556270"], tags: ["gradient", "warm", "vibrant", "mesh"] },
  { id: "ocean-mesh", name: "Ocean Mesh", colors: ["#667EEA", "#764BA2", "#F093FB", "#F5576C", "#4FACFE"], tags: ["gradient", "vibrant", "purple", "mesh"] },
  { id: "aurora-mesh", name: "Aurora Mesh", colors: ["#00C9FF", "#92FE9D", "#F7CE68", "#CF5CF6", "#0250C5"], tags: ["gradient", "vibrant", "cool", "mesh"] },
  { id: "peach-fuzz", name: "Peach Fuzz", colors: ["#FFBE98", "#FFD4B8", "#FFE8D6", "#FFF2E9", "#FFFAF5"], tags: ["gradient", "warm", "pastel", "soft"] },
  { id: "midnight-galaxy", name: "Midnight Galaxy", colors: ["#0F0C29", "#302B63", "#24243E", "#8B5CF6", "#EC4899"], tags: ["gradient", "dark", "purple", "vibrant"] },

  // ─── Brand-Inspired ────────────────────────────────────────────────────────
  { id: "stripe-ui", name: "Stripe UI", colors: ["#0A2540", "#425466", "#635BFF", "#00D4AA", "#F6F9FC"], tags: ["brand", "professional", "purple", "modern"] },
  { id: "figma-rainbow", name: "Figma Rainbow", colors: ["#F24E1E", "#FF7262", "#A259FF", "#1ABCFE", "#0ACF83"], tags: ["brand", "vibrant", "gradient", "modern"] },
  { id: "notion-light", name: "Notion Light", colors: ["#FFFFFF", "#F7F6F3", "#E3E2DE", "#37352F", "#2EAADC"], tags: ["brand", "minimal", "warm", "professional"] },
  { id: "slack-palette", name: "Slack Palette", colors: ["#1A1D21", "#36C5F0", "#2EB67D", "#ECB22E", "#E01E5A"], tags: ["brand", "vibrant", "modern", "fun"] },

  // ─── Monochrome ────────────────────────────────────────────────────────────
  { id: "pure-black", name: "Pure Black", colors: ["#000000", "#0A0A0A", "#141414", "#1E1E1E", "#282828"], tags: ["monochrome", "dark", "minimal", "elegant"] },
  { id: "warm-gray", name: "Warm Gray", colors: ["#F5F5F0", "#E8E6E0", "#C8C5BC", "#8A8780", "#4A4844"], tags: ["monochrome", "warm", "neutral", "minimal"] },
  { id: "cool-steel", name: "Cool Steel", colors: ["#F0F4F8", "#D1D9E6", "#99AAC0", "#5C718A", "#2E3F55"], tags: ["monochrome", "cool", "professional", "blue"] },
  { id: "charcoal-silk", name: "Charcoal Silk", colors: ["#F8F8F8", "#D0D0D0", "#888888", "#444444", "#1A1A1A"], tags: ["monochrome", "elegant", "gray", "professional"] },
];
