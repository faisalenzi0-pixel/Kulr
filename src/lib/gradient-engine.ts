import type { Gradient, GradientStop, GradientType } from "./types";

/**
 * Generate a CSS gradient string from a Gradient object.
 *
 * @example
 * generateGradientCSS({
 *   stops: [
 *     { color: "#8B5CF6", position: 0 },
 *     { color: "#EC4899", position: 50 },
 *     { color: "#F59E0B", position: 100 },
 *   ],
 *   type: "linear",
 *   angle: 135,
 * })
 * // => "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)"
 */
export function generateGradientCSS(gradient: Gradient): string {
  const sortedStops = [...gradient.stops].sort((a, b) => a.position - b.position);
  const stopsStr = sortedStops
    .map((stop) => `${stop.color} ${Math.round(stop.position)}%`)
    .join(", ");

  switch (gradient.type) {
    case "linear":
      return `linear-gradient(${gradient.angle}deg, ${stopsStr})`;
    case "radial":
      return `radial-gradient(circle, ${stopsStr})`;
    case "conic":
      return `conic-gradient(from ${gradient.angle}deg, ${stopsStr})`;
    default:
      return `linear-gradient(${gradient.angle}deg, ${stopsStr})`;
  }
}

/**
 * Convert an array of palette colors into a Gradient with evenly distributed stops.
 *
 * @param colors - Array of hex color strings
 * @param type - Gradient type (defaults to "linear")
 * @param angle - Gradient angle in degrees (defaults to 90)
 * @returns A Gradient object with evenly spaced stops
 */
export function paletteToGradient(
  colors: string[],
  type: GradientType = "linear",
  angle: number = 90
): Gradient {
  if (colors.length === 0) {
    return { stops: [], type, angle };
  }

  if (colors.length === 1) {
    return {
      stops: [
        { color: colors[0], position: 0 },
        { color: colors[0], position: 100 },
      ],
      type,
      angle,
    };
  }

  const stops: GradientStop[] = colors.map((color, i) => ({
    color,
    position: (i / (colors.length - 1)) * 100,
  }));

  return { stops, type, angle };
}

/**
 * Add a new color stop to a gradient at the specified position.
 * Returns a new Gradient; does not mutate the original.
 *
 * @param gradient - The existing gradient
 * @param color - Hex color string for the new stop
 * @param position - Position (0-100) for the new stop
 * @returns New Gradient with the added stop
 */
export function addGradientStop(
  gradient: Gradient,
  color: string,
  position: number
): Gradient {
  const clampedPosition = Math.max(0, Math.min(100, position));
  const newStop: GradientStop = { color, position: clampedPosition };
  return {
    ...gradient,
    stops: [...gradient.stops, newStop].sort((a, b) => a.position - b.position),
  };
}

/**
 * Remove a gradient stop by index.
 * Returns a new Gradient; does not mutate the original.
 * Will not remove if only 2 stops remain (minimum for a valid gradient).
 *
 * @param gradient - The existing gradient
 * @param index - Index of the stop to remove
 * @returns New Gradient with the stop removed, or the original if removal is invalid
 */
export function removeGradientStop(gradient: Gradient, index: number): Gradient {
  if (gradient.stops.length <= 2) {
    return gradient;
  }
  if (index < 0 || index >= gradient.stops.length) {
    return gradient;
  }
  return {
    ...gradient,
    stops: gradient.stops.filter((_, i) => i !== index),
  };
}

/**
 * Reverse the order of stops in a gradient.
 * Positions are mirrored (e.g., 0% becomes 100%, 30% becomes 70%).
 * Returns a new Gradient; does not mutate the original.
 *
 * @param gradient - The gradient to reverse
 * @returns New Gradient with reversed stop order and mirrored positions
 */
export function reverseGradient(gradient: Gradient): Gradient {
  const reversedStops = gradient.stops
    .map((stop) => ({
      color: stop.color,
      position: 100 - stop.position,
    }))
    .sort((a, b) => a.position - b.position);

  return {
    ...gradient,
    stops: reversedStops,
  };
}
