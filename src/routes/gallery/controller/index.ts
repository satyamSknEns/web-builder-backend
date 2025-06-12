import { Request, Response } from "express";
import mongoose from "mongoose";
import GallerySection, { IGalleryItem } from "../../../model/gallery/index";
import {
  sendResponse,
  dynamicSectionId,
  cleanRequestFields,
} from "../../../middlewares/helper";

const IMAGE_URL =
  "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-picture-icon-png-image_4013511.jpg";

export const createGallerySection = async (req: Request, res: Response) => {
  try {
    const cleanedData = cleanRequestFields(req.body);
    const name = cleanedData.name || "Gallery Section";
    const heading = cleanedData.heading || "Gallery Heading Here";
    const columnLayout = cleanedData.columnLayout || "horizontal";
    const columnCount: number = cleanedData.columnCount ?? 2;

    const requestedColumns: IGalleryItem[] = Array.isArray(cleanedData.columns)
      ? cleanedData.columns
      : [];

    let columns: IGalleryItem[] = [...requestedColumns];

    if (columns.length < columnCount) {
      const missing = columnCount - columns.length;
      const defaultColumns: IGalleryItem[] = Array.from({ length: missing }, () => ({
        imageUrl: IMAGE_URL,
        buttonText: "Click Me",
        buttonUrl: "https://example.com",
      }));
      columns = [...columns, ...defaultColumns];
    }

    const sectionId = dynamicSectionId(`${columnCount}-${name}`);

    const newSection = new GallerySection({
      sectionId,
      name,
      heading,
      columnLayout,
      columnCount,
      columns,
    });

    await newSection.save();
    return sendResponse(res, 201, true, "Gallery section created", newSection);
  } catch (error) {
    return sendResponse(res, 500, false, "Creation failed", error instanceof Error ? error.message : error);
  }
};

export const getAllGallerySections = async (_req: Request, res: Response) => {
  try {
    const sections = await GallerySection.find({ isDeleted: false }).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "Sections fetched", sections);
  } catch (error) {
    return sendResponse(res, 500, false, "Fetch failed", error instanceof Error ? error.message : error);
  }
};

export const getGallerySectionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || id.trim() === "") {
    return sendResponse(res, 400, false, "ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID");
  }

  try {
    const section = await GallerySection.findOne({ _id: id, isDeleted: false });
    if (!section) return sendResponse(res, 404, false, "Section not found or deleted");
    return sendResponse(res, 200, true, "Section retrieved", section);
  } catch (error) {
    return sendResponse(res, 500, false, "Fetch failed", error instanceof Error ? error.message : error);
  }
};

export const updateGallerySectionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || id.trim() === "") {
    return sendResponse(res, 400, false, "ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID");
  }
  
  try {
    const cleanedData = cleanRequestFields(req.body);
    const section = await GallerySection.findOne({ _id: id, isDeleted: false });
    if (!section) return sendResponse(res, 404, false, "Section not found");

    const name = cleanedData.name || section.name;
    const heading = cleanedData.heading || section.heading;
    const columnLayout = cleanedData.columnLayout || section.columnLayout;
    const columnCount: number = cleanedData.columnCount ?? section.columnCount;
    const requestedColumns: IGalleryItem[] = Array.isArray(cleanedData.columns)
      ? cleanedData.columns
      : section.columns;

    let columns = [...requestedColumns];

    if (columns.length < columnCount) {
      const missing = columnCount - columns.length;
      const defaultColumns = Array.from({ length: missing }, () => ({
        imageUrl: IMAGE_URL,
        buttonText: "Click Me",
        buttonUrl: "https://example.com",
      }));
      columns = [...columns, ...defaultColumns];
    }

    section.name = name;
    section.heading = heading;
    section.columnLayout = columnLayout;
    section.columnCount = columnCount;
    section.columns = columns;

    await section.save();
    return sendResponse(res, 200, true, "Section updated", section);
  } catch (error) {
    return sendResponse(res, 500, false, "Update failed", error instanceof Error ? error.message : error);
  }
};

export const softDeleteGallerySectionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID");
  }
  try {
    const section = await GallerySection.findById(id);
    if (!section || section.isDeleted) return sendResponse(res, 404, false, "Section not found");
    section.isDeleted = true;
    section.deletedAt = new Date();
    await section.save();
    return sendResponse(res, 200, true, "Section soft-deleted");
  } catch (error) {
    return sendResponse(res, 500, false, "Soft delete failed", error instanceof Error ? error.message : error);
  }
};

// export const getDeletedSections = async (_req: Request, res: Response) => {
//   try {
//     const deletedSections = await GallerySection.find({ isDeleted: true }).sort({ deletedAt: -1 });
//     return sendResponse(res, 200, true, "Deleted sections fetched", deletedSections);
//   } catch (error) {
//     return sendResponse(res, 500, false, "Fetch failed", error instanceof Error ? error.message : error);
//   }
// };

export const restoreDeletedGallerySectionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID");
  }
  try {
    const section = await GallerySection.findOne({ _id: id, isDeleted: true });
    if (!section) return sendResponse(res, 404, false, "Section not found");
    section.isDeleted = false;
    section.deletedAt = null;
    await section.save();
    return sendResponse(res, 200, true, "Deleted section restored", section);
  } catch (error) {
    return sendResponse(res, 500, false, "Restore failed", error instanceof Error ? error.message : error);
  }
};

/*export const batchSoftDeleteSections = async (req: Request, res: Response) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || !ids.every((id: any) => mongoose.Types.ObjectId.isValid(id))) {
    return sendResponse(res, 400, false, "Invalid IDs list");
  }
  try {
    const result = await GallerySection.updateMany(
      { _id: { $in: ids }, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date() } }
    );
    return sendResponse(res, 200, true, `${result.modifiedCount} sections soft-deleted`);
  } catch (error) {
    return sendResponse(res, 500, false, "Batch delete failed", error instanceof Error ? error.message : error);
  }
};*/

/*export const batchRestoreDeletedSections = async (req: Request, res: Response) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || !ids.every((id: any) => mongoose.Types.ObjectId.isValid(id))) {
    return sendResponse(res, 400, false, "Invalid IDs list");
  }
  try {
    const result = await GallerySection.updateMany(
      { _id: { $in: ids }, isDeleted: true },
      { $set: { isDeleted: false }, $unset: { deletedAt: "" } }
    );
    return sendResponse(res, 200, true, `${result.modifiedCount} sections restored`);
  } catch (error) {
    return sendResponse(res, 500, false, "Batch restore failed", error instanceof Error ? error.message : error);
  }
};
*/