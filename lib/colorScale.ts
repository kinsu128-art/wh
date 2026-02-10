export const getColorByQuantity = (quantity: number, min: number, max: number): string => {
  if (min === max) {
    return 'rgb(255, 223, 186)';
  }

  const ratio = (quantity - min) / (max - min);
  const clampedRatio = Math.max(0, Math.min(1, ratio));

  const lightOrange = { r: 255, g: 223, b: 186 };
  const darkOrange = { r: 255, g: 140, b: 0 };

  const r = Math.round(lightOrange.r + (darkOrange.r - lightOrange.r) * clampedRatio);
  const g = Math.round(lightOrange.g + (darkOrange.g - lightOrange.g) * clampedRatio);
  const b = Math.round(lightOrange.b + (darkOrange.b - lightOrange.b) * clampedRatio);

  return `rgb(${r}, ${g}, ${b})`;
};
