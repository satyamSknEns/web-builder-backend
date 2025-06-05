export const sendResponse = (res, status, success, message, data = null) => {
  if (!data) {
    res.status(status).json({ success, message });
  } else {
    res.status(status).json({ success, message, data });
  }
};

export const dynamicSectionId = (title) => {
  return `section_${Date.now()}_` + title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "_")
    .replace(/^-+|-+$/g, "");
}

export const cleanRequestFields = (data) => {
  const cleaned = {};
  for (const key in data) {
    const value = data[key];
    cleaned[key] = typeof value === "string" && value.trim() === "" ? undefined : value;
  }
  return cleaned;
};
