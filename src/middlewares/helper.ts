import { Response } from "express";
export const sendResponse = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data: any = null
) => {
  if (!data) {
    res.status(status).json({ success, message });
  } else {
    res.status(status).json({ success, message, data });
  }
};

export const dynamicSectionId = (title: string) => {
  return (
    `section_${Date.now()}_` +
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "_")
      .replace(/^-+|-+$/g, "")
  );
};

export const cleanRequestFields = (
  data: Record<string, any>
): Record<string, any> => {
  const cleaned: Record<string, any> = {};
  for (const key in data) {
    const value = data[key];
    cleaned[key] =
      typeof value === "string" && value.trim() === "" ? undefined : value;
  }
  return cleaned;
};
