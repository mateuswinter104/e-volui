export default function getColor(variableName: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
}
