export const pluralize = (count: number, noun: string, suffix = "s") =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;

export const display = (value: string) => {
  const result = value
    .replace(/([A-Z][a-z])/g, " $1")
    .trim()
    .toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
};
