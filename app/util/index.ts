
/**
 * Clamps a numeric or string value within a specified range.
 * If the value is not a valid number or empty, it defaults to the maximum value.
 *
 * @param {string | number} value - The value to be clamped.
 * @param {number | string} min - The minimum allowed value.
 * @param {number | string} max - The maximum allowed value.
 * @returns {string} - The clamped value as a string.
 */
export const clampAndValidateStringValue = (
  value: string,
  min: number | string,
  max: number | string
): string => {
  // Parse the input value to an integer
  let clampedValue = parseInt(value)

  // Parse the min and max values if they are provided as strings
  if (typeof min === 'string') {
    min = parseInt(min)
  }

  if (typeof max === 'string') {
    max = parseInt(max)
  }

  // If the input value is not provided or not a valid number, default to the maximum value
  if (!value || isNaN(clampedValue)) {
    clampedValue = max
  }

  // Ensure the clamped value is within the specified range
  if (clampedValue < min) {
    clampedValue = min
  } else if (clampedValue > max) {
    clampedValue = max
  }

  // Return the clamped value as a string
  return clampedValue.toString()
}