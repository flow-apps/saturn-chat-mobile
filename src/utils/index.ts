export function verifyBetweenValues(
  value: number,
  min: number,
  max: number,
  equal?: boolean
) {
  if (equal) return value >= min && value <= max

  return value > min && value < max
}
