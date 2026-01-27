
module.exports = function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")       // replace &
    .replace(/[\s\W-]+/g, "-")  // spaces & special chars → -
    .replace(/^-+|-+$/g, "");   // trim - from start/end
};
