import { hexToRgb } from "./color-convert";

const NAMED_COLORS: [string, string][] = [
  ["#FF0000", "Red"], ["#FF4500", "Orange Red"], ["#FF6347", "Tomato"],
  ["#FF7F50", "Coral"], ["#FFA500", "Orange"], ["#FFD700", "Gold"],
  ["#FFFF00", "Yellow"], ["#ADFF2F", "Green Yellow"], ["#7FFF00", "Chartreuse"],
  ["#00FF00", "Green"], ["#00FA9A", "Medium Spring"], ["#00CED1", "Dark Turquoise"],
  ["#00BFFF", "Deep Sky Blue"], ["#1E90FF", "Dodger Blue"], ["#0000FF", "Blue"],
  ["#4169E1", "Royal Blue"], ["#6A5ACD", "Slate Blue"], ["#8A2BE2", "Blue Violet"],
  ["#9400D3", "Dark Violet"], ["#FF00FF", "Magenta"], ["#FF1493", "Deep Pink"],
  ["#FF69B4", "Hot Pink"], ["#FFB6C1", "Light Pink"], ["#FFC0CB", "Pink"],
  ["#DC143C", "Crimson"], ["#B22222", "Firebrick"], ["#8B0000", "Dark Red"],
  ["#CD853F", "Peru"], ["#D2691E", "Chocolate"], ["#8B4513", "Saddle Brown"],
  ["#A0522D", "Sienna"], ["#DEB887", "Burlywood"], ["#F5DEB3", "Wheat"],
  ["#FAEBD7", "Antique White"], ["#FFF8DC", "Cornsilk"], ["#FFFAF0", "Floral White"],
  ["#F0FFF0", "Honeydew"], ["#F0F8FF", "Alice Blue"], ["#E6E6FA", "Lavender"],
  ["#D8BFD8", "Thistle"], ["#DDA0DD", "Plum"], ["#EE82EE", "Violet"],
  ["#BA55D3", "Medium Orchid"], ["#9370DB", "Medium Purple"], ["#7B68EE", "Medium Slate Blue"],
  ["#6495ED", "Cornflower Blue"], ["#87CEEB", "Sky Blue"], ["#ADD8E6", "Light Blue"],
  ["#B0E0E6", "Powder Blue"], ["#AFEEEE", "Pale Turquoise"], ["#48D1CC", "Medium Turquoise"],
  ["#20B2AA", "Light Sea Green"], ["#008B8B", "Dark Cyan"], ["#008080", "Teal"],
  ["#2E8B57", "Sea Green"], ["#3CB371", "Medium Sea Green"], ["#90EE90", "Light Green"],
  ["#98FB98", "Pale Green"], ["#228B22", "Forest Green"], ["#006400", "Dark Green"],
  ["#808000", "Olive"], ["#6B8E23", "Olive Drab"], ["#BDB76B", "Dark Khaki"],
  ["#F0E68C", "Khaki"], ["#EEE8AA", "Pale Goldenrod"], ["#DAA520", "Goldenrod"],
  ["#B8860B", "Dark Goldenrod"], ["#FF8C00", "Dark Orange"], ["#E9967A", "Dark Salmon"],
  ["#FA8072", "Salmon"], ["#FFA07A", "Light Salmon"], ["#F08080", "Light Coral"],
  ["#CD5C5C", "Indian Red"], ["#BC8F8F", "Rosy Brown"], ["#C0C0C0", "Silver"],
  ["#A9A9A9", "Dark Gray"], ["#808080", "Gray"], ["#696969", "Dim Gray"],
  ["#2F4F4F", "Dark Slate Gray"], ["#708090", "Slate Gray"], ["#778899", "Light Slate Gray"],
  ["#B0C4DE", "Light Steel Blue"], ["#4682B4", "Steel Blue"], ["#5F9EA0", "Cadet Blue"],
  ["#000000", "Black"], ["#FFFFFF", "White"], ["#F5F5F5", "White Smoke"],
  ["#DCDCDC", "Gainsboro"], ["#D3D3D3", "Light Gray"],
  ["#E0BBE4", "Mauve"], ["#957DAD", "Amethyst"], ["#D291BC", "Rose"],
  ["#FEC8D8", "Blush"], ["#FFDFD3", "Peach"], ["#B5EAD7", "Sage"],
  ["#C7CEEA", "Periwinkle"], ["#F7DC6F", "Mustard"], ["#85C1E9", "Cerulean"],
  ["#F0B27A", "Sandy"], ["#A3E4D7", "Mint"], ["#F9E79F", "Lemon"],
  ["#D7BDE2", "Wisteria"], ["#AED6F1", "Baby Blue"], ["#FADBD8", "Misty Rose"],
  ["#D5F5E3", "Seafoam"], ["#FCF3CF", "Cream"], ["#E8DAEF", "Lilac"],
];

function colorDistance(hex1: string, hex2: string): number {
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

export function getColorName(hex: string): string {
  let best = "Unknown";
  let bestDist = Infinity;
  for (const [namedHex, name] of NAMED_COLORS) {
    const d = colorDistance(hex.toUpperCase(), namedHex);
    if (d < bestDist) { bestDist = d; best = name; }
  }
  return best;
}

export function searchColors(query: string): { name: string; hex: string }[] {
  const q = query.toLowerCase();
  return NAMED_COLORS
    .filter(([, name]) => name.toLowerCase().includes(q))
    .map(([hex, name]) => ({ name, hex }));
}
