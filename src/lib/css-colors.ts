// Complete CSS Named Colors + Popular Design Colors
// Used by /colors page for SEO: targets "color names", "hex color codes", "list of colors"

export interface NamedColor {
  name: string;
  hex: string;
  category: string; // red, orange, yellow, green, cyan, blue, purple, pink, brown, gray, white
}

export const CSS_NAMED_COLORS: NamedColor[] = [
  // ─── Reds ──────────────────────────────────────────
  { name: "Red", hex: "#FF0000", category: "red" },
  { name: "Dark Red", hex: "#8B0000", category: "red" },
  { name: "Firebrick", hex: "#B22222", category: "red" },
  { name: "Crimson", hex: "#DC143C", category: "red" },
  { name: "Indian Red", hex: "#CD5C5C", category: "red" },
  { name: "Tomato", hex: "#FF6347", category: "red" },
  { name: "Maroon", hex: "#800000", category: "red" },

  // ─── Oranges ───────────────────────────────────────
  { name: "Orange Red", hex: "#FF4500", category: "orange" },
  { name: "Orange", hex: "#FFA500", category: "orange" },
  { name: "Dark Orange", hex: "#FF8C00", category: "orange" },
  { name: "Coral", hex: "#FF7F50", category: "orange" },
  { name: "Salmon", hex: "#FA8072", category: "orange" },
  { name: "Light Salmon", hex: "#FFA07A", category: "orange" },
  { name: "Dark Salmon", hex: "#E9967A", category: "orange" },
  { name: "Light Coral", hex: "#F08080", category: "orange" },

  // ─── Yellows ───────────────────────────────────────
  { name: "Gold", hex: "#FFD700", category: "yellow" },
  { name: "Yellow", hex: "#FFFF00", category: "yellow" },
  { name: "Light Yellow", hex: "#FFFFE0", category: "yellow" },
  { name: "Lemon Chiffon", hex: "#FFFACD", category: "yellow" },
  { name: "Light Goldenrod Yellow", hex: "#FAFAD2", category: "yellow" },
  { name: "Papaya Whip", hex: "#FFEFD5", category: "yellow" },
  { name: "Moccasin", hex: "#FFE4B5", category: "yellow" },
  { name: "Peach Puff", hex: "#FFDAB9", category: "yellow" },
  { name: "Pale Goldenrod", hex: "#EEE8AA", category: "yellow" },
  { name: "Khaki", hex: "#F0E68C", category: "yellow" },
  { name: "Dark Khaki", hex: "#BDB76B", category: "yellow" },
  { name: "Goldenrod", hex: "#DAA520", category: "yellow" },
  { name: "Dark Goldenrod", hex: "#B8860B", category: "yellow" },

  // ─── Greens ────────────────────────────────────────
  { name: "Green", hex: "#008000", category: "green" },
  { name: "Lime", hex: "#00FF00", category: "green" },
  { name: "Lime Green", hex: "#32CD32", category: "green" },
  { name: "Lawn Green", hex: "#7CFC00", category: "green" },
  { name: "Chartreuse", hex: "#7FFF00", category: "green" },
  { name: "Green Yellow", hex: "#ADFF2F", category: "green" },
  { name: "Spring Green", hex: "#00FF7F", category: "green" },
  { name: "Medium Spring Green", hex: "#00FA9A", category: "green" },
  { name: "Light Green", hex: "#90EE90", category: "green" },
  { name: "Pale Green", hex: "#98FB98", category: "green" },
  { name: "Dark Sea Green", hex: "#8FBC8F", category: "green" },
  { name: "Medium Sea Green", hex: "#3CB371", category: "green" },
  { name: "Sea Green", hex: "#2E8B57", category: "green" },
  { name: "Forest Green", hex: "#228B22", category: "green" },
  { name: "Dark Green", hex: "#006400", category: "green" },
  { name: "Yellow Green", hex: "#9ACD32", category: "green" },
  { name: "Olive Drab", hex: "#6B8E23", category: "green" },
  { name: "Olive", hex: "#808000", category: "green" },
  { name: "Dark Olive Green", hex: "#556B2F", category: "green" },

  // ─── Cyans ─────────────────────────────────────────
  { name: "Aqua", hex: "#00FFFF", category: "cyan" },
  { name: "Cyan", hex: "#00FFFF", category: "cyan" },
  { name: "Light Cyan", hex: "#E0FFFF", category: "cyan" },
  { name: "Pale Turquoise", hex: "#AFEEEE", category: "cyan" },
  { name: "Aquamarine", hex: "#7FFFD4", category: "cyan" },
  { name: "Turquoise", hex: "#40E0D0", category: "cyan" },
  { name: "Medium Turquoise", hex: "#48D1CC", category: "cyan" },
  { name: "Dark Turquoise", hex: "#00CED1", category: "cyan" },
  { name: "Light Sea Green", hex: "#20B2AA", category: "cyan" },
  { name: "Cadet Blue", hex: "#5F9EA0", category: "cyan" },
  { name: "Dark Cyan", hex: "#008B8B", category: "cyan" },
  { name: "Teal", hex: "#008080", category: "cyan" },
  { name: "Medium Aquamarine", hex: "#66CDAA", category: "cyan" },

  // ─── Blues ─────────────────────────────────────────
  { name: "Blue", hex: "#0000FF", category: "blue" },
  { name: "Medium Blue", hex: "#0000CD", category: "blue" },
  { name: "Dark Blue", hex: "#00008B", category: "blue" },
  { name: "Navy", hex: "#000080", category: "blue" },
  { name: "Midnight Blue", hex: "#191970", category: "blue" },
  { name: "Royal Blue", hex: "#4169E1", category: "blue" },
  { name: "Steel Blue", hex: "#4682B4", category: "blue" },
  { name: "Dodger Blue", hex: "#1E90FF", category: "blue" },
  { name: "Deep Sky Blue", hex: "#00BFFF", category: "blue" },
  { name: "Cornflower Blue", hex: "#6495ED", category: "blue" },
  { name: "Sky Blue", hex: "#87CEEB", category: "blue" },
  { name: "Light Sky Blue", hex: "#87CEFA", category: "blue" },
  { name: "Light Blue", hex: "#ADD8E6", category: "blue" },
  { name: "Powder Blue", hex: "#B0E0E6", category: "blue" },
  { name: "Light Steel Blue", hex: "#B0C4DE", category: "blue" },
  { name: "Alice Blue", hex: "#F0F8FF", category: "blue" },

  // ─── Purples ───────────────────────────────────────
  { name: "Purple", hex: "#800080", category: "purple" },
  { name: "Indigo", hex: "#4B0082", category: "purple" },
  { name: "Dark Violet", hex: "#9400D3", category: "purple" },
  { name: "Dark Orchid", hex: "#9932CC", category: "purple" },
  { name: "Medium Orchid", hex: "#BA55D3", category: "purple" },
  { name: "Orchid", hex: "#DA70D6", category: "purple" },
  { name: "Violet", hex: "#EE82EE", category: "purple" },
  { name: "Plum", hex: "#DDA0DD", category: "purple" },
  { name: "Thistle", hex: "#D8BFD8", category: "purple" },
  { name: "Lavender", hex: "#E6E6FA", category: "purple" },
  { name: "Blue Violet", hex: "#8A2BE2", category: "purple" },
  { name: "Medium Purple", hex: "#9370DB", category: "purple" },
  { name: "Medium Slate Blue", hex: "#7B68EE", category: "purple" },
  { name: "Slate Blue", hex: "#6A5ACD", category: "purple" },
  { name: "Dark Slate Blue", hex: "#483D8B", category: "purple" },
  { name: "Rebecca Purple", hex: "#663399", category: "purple" },

  // ─── Pinks ─────────────────────────────────────────
  { name: "Pink", hex: "#FFC0CB", category: "pink" },
  { name: "Light Pink", hex: "#FFB6C1", category: "pink" },
  { name: "Hot Pink", hex: "#FF69B4", category: "pink" },
  { name: "Deep Pink", hex: "#FF1493", category: "pink" },
  { name: "Medium Violet Red", hex: "#C71585", category: "pink" },
  { name: "Pale Violet Red", hex: "#DB7093", category: "pink" },
  { name: "Magenta", hex: "#FF00FF", category: "pink" },
  { name: "Fuchsia", hex: "#FF00FF", category: "pink" },

  // ─── Browns ────────────────────────────────────────
  { name: "Saddle Brown", hex: "#8B4513", category: "brown" },
  { name: "Sienna", hex: "#A0522D", category: "brown" },
  { name: "Chocolate", hex: "#D2691E", category: "brown" },
  { name: "Peru", hex: "#CD853F", category: "brown" },
  { name: "Sandy Brown", hex: "#F4A460", category: "brown" },
  { name: "Burlywood", hex: "#DEB887", category: "brown" },
  { name: "Tan", hex: "#D2B48C", category: "brown" },
  { name: "Rosy Brown", hex: "#BC8F8F", category: "brown" },
  { name: "Wheat", hex: "#F5DEB3", category: "brown" },
  { name: "Navajo White", hex: "#FFDEAD", category: "brown" },
  { name: "Bisque", hex: "#FFE4C4", category: "brown" },
  { name: "Blanched Almond", hex: "#FFEBCD", category: "brown" },
  { name: "Cornsilk", hex: "#FFF8DC", category: "brown" },

  // ─── Whites ────────────────────────────────────────
  { name: "White", hex: "#FFFFFF", category: "white" },
  { name: "Snow", hex: "#FFFAFA", category: "white" },
  { name: "Honeydew", hex: "#F0FFF0", category: "white" },
  { name: "Mint Cream", hex: "#F5FFFA", category: "white" },
  { name: "Azure", hex: "#F0FFFF", category: "white" },
  { name: "Ghost White", hex: "#F8F8FF", category: "white" },
  { name: "White Smoke", hex: "#F5F5F5", category: "white" },
  { name: "Seashell", hex: "#FFF5EE", category: "white" },
  { name: "Beige", hex: "#F5F5DC", category: "white" },
  { name: "Old Lace", hex: "#FDF5E6", category: "white" },
  { name: "Floral White", hex: "#FFFAF0", category: "white" },
  { name: "Ivory", hex: "#FFFFF0", category: "white" },
  { name: "Antique White", hex: "#FAEBD7", category: "white" },
  { name: "Linen", hex: "#FAF0E6", category: "white" },
  { name: "Lavender Blush", hex: "#FFF0F5", category: "white" },
  { name: "Misty Rose", hex: "#FFE4E1", category: "white" },

  // ─── Grays ─────────────────────────────────────────
  { name: "Black", hex: "#000000", category: "gray" },
  { name: "Dark Slate Gray", hex: "#2F4F4F", category: "gray" },
  { name: "Dim Gray", hex: "#696969", category: "gray" },
  { name: "Slate Gray", hex: "#708090", category: "gray" },
  { name: "Light Slate Gray", hex: "#778899", category: "gray" },
  { name: "Gray", hex: "#808080", category: "gray" },
  { name: "Dark Gray", hex: "#A9A9A9", category: "gray" },
  { name: "Silver", hex: "#C0C0C0", category: "gray" },
  { name: "Light Gray", hex: "#D3D3D3", category: "gray" },
  { name: "Gainsboro", hex: "#DCDCDC", category: "gray" },

  // ─── Popular Design Colors (not in CSS spec) ──────
  { name: "Emerald", hex: "#50C878", category: "green" },
  { name: "Sage", hex: "#B2AC88", category: "green" },
  { name: "Mint", hex: "#98FF98", category: "green" },
  { name: "Seafoam", hex: "#93E9BE", category: "green" },
  { name: "Mauve", hex: "#E0B0FF", category: "purple" },
  { name: "Periwinkle", hex: "#CCCCFF", category: "purple" },
  { name: "Lilac", hex: "#C8A2C8", category: "purple" },
  { name: "Wisteria", hex: "#C9A0DC", category: "purple" },
  { name: "Amethyst", hex: "#9966CC", category: "purple" },
  { name: "Champagne", hex: "#F7E7CE", category: "yellow" },
  { name: "Mustard", hex: "#FFDB58", category: "yellow" },
  { name: "Saffron", hex: "#F4C430", category: "yellow" },
  { name: "Blush", hex: "#DE5D83", category: "pink" },
  { name: "Rose Gold", hex: "#B76E79", category: "pink" },
  { name: "Cerise", hex: "#DE3163", category: "pink" },
  { name: "Ruby", hex: "#E0115F", category: "red" },
  { name: "Scarlet", hex: "#FF2400", category: "red" },
  { name: "Burgundy", hex: "#800020", category: "red" },
  { name: "Wine", hex: "#722F37", category: "red" },
  { name: "Cobalt", hex: "#0047AB", category: "blue" },
  { name: "Cerulean", hex: "#007BA7", category: "blue" },
  { name: "Sapphire", hex: "#0F52BA", category: "blue" },
  { name: "Baby Blue", hex: "#89CFF0", category: "blue" },
  { name: "Denim", hex: "#1560BD", category: "blue" },
  { name: "Taupe", hex: "#483C32", category: "brown" },
  { name: "Espresso", hex: "#4E312D", category: "brown" },
  { name: "Copper", hex: "#B87333", category: "brown" },
  { name: "Bronze", hex: "#CD7F32", category: "brown" },
  { name: "Rust", hex: "#B7410E", category: "orange" },
  { name: "Terracotta", hex: "#E2725B", category: "orange" },
  { name: "Peach", hex: "#FFE5B4", category: "orange" },
  { name: "Apricot", hex: "#FBCEB1", category: "orange" },
  { name: "Charcoal", hex: "#36454F", category: "gray" },
  { name: "Ash", hex: "#B2BEB5", category: "gray" },
  { name: "Ivory", hex: "#FFFFF0", category: "white" },
  { name: "Cream", hex: "#FFFDD0", category: "white" },
  { name: "Off White", hex: "#FAF9F6", category: "white" },
];

export const COLOR_CATEGORIES = [
  { id: "all", label: "All", count: 0 },
  { id: "red", label: "Red", swatch: "#EF4444" },
  { id: "orange", label: "Orange", swatch: "#F97316" },
  { id: "yellow", label: "Yellow", swatch: "#EAB308" },
  { id: "green", label: "Green", swatch: "#22C55E" },
  { id: "cyan", label: "Cyan", swatch: "#06B6D4" },
  { id: "blue", label: "Blue", swatch: "#3B82F6" },
  { id: "purple", label: "Purple", swatch: "#8B5CF6" },
  { id: "pink", label: "Pink", swatch: "#EC4899" },
  { id: "brown", label: "Brown", swatch: "#A16207" },
  { id: "gray", label: "Gray", swatch: "#6B7280" },
  { id: "white", label: "White", swatch: "#E5E7EB" },
];

// Deduplicate by hex (some CSS colors share hex codes like aqua/cyan, fuchsia/magenta)
const seen = new Set<string>();
export const UNIQUE_COLORS: NamedColor[] = CSS_NAMED_COLORS.filter((c) => {
  const key = c.hex.toUpperCase();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});
