export const toSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')  // any run of non-alphanumeric chars becomes one hyphen
    .replace(/(^-|-$)+/g, '');    // trim leading/trailing hyphens