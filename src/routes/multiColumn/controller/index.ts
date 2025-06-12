import { Response, Request } from "express";
import ColumnSection, { IColumn } from "../../../model/multiColumn";
import {
  sendResponse,
  dynamicSectionId,
  cleanRequestFields,
} from "../../../middlewares/helper";
import mongoose from "mongoose";

const IMAGE_URL =
  "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-picture-icon-png-image_4013511.jpg";

export const createColumnSection = async (req: Request, res: Response) => {
  try {
    const cleanedData = cleanRequestFields(req.body);
    const name = cleanedData.name || "Column Section";
    const heading = cleanedData.heading || "Section Heading Here";
    const columnLayout = cleanedData.columnLayout || "horizontal";

    const columnCount: number = cleanedData.columnCount ?? 2;

    const requestedColumns: IColumn[] = Array.isArray(cleanedData.columns)
      ? cleanedData.columns
      : [];

    let columns: IColumn[] = [...requestedColumns];
    if (columns.length < columnCount) {
      const missing = columnCount - columns.length;
      const defaultColumns: IColumn[] = Array.from(
        { length: missing },
        (_, i) => ({
          imageUrl: IMAGE_URL,
          text: `Column ${columns.length + i + 1}`,
        })
      );
      columns = [...columns, ...defaultColumns];
    }

    const sectionId = dynamicSectionId(`${columnCount}-${name}`);

    const newSection = new ColumnSection({
      sectionId,
      name,
      heading,
      columnLayout,
      columnCount,
      columns,
    });

    await newSection.save();

    return sendResponse(
      res,
      201,
      true,
      "Section created successfully",
      newSection
    );
  } catch (error) {
    // console.error("Error creating multi-column section:", error);
    return sendResponse(
      res,
      500,
      false,
      "Section creation failed",
      error instanceof Error ? error.message : error
    );
  }
};

export const getAllColumnSections = async (req: Request, res: Response) => {
  try {
    const allSections = await ColumnSection.find({ isDeleted: false }).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "Sections fetched successfully", allSections);
  } catch (error) {
    return sendResponse(res, 500, false, "Error fetching section", error instanceof Error ? error.message : error);
  }
};

export const getColumnSectionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || id.trim() === "") {
      return sendResponse(res, 400, false, "ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid ID format");
    }
    const section = await ColumnSection.findOne({ _id: id, isDeleted: false });
    if (!section) { return sendResponse(res, 404, false, "Section not found or deleted"); }
    sendResponse(res, 200, true, "Section retrieved successfully", section);
  } catch (error) {
    return sendResponse( res, 500, false, "Error fetching section", error instanceof Error ? error.message : error );
  }
};

export const updateColumnSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cleanedData = cleanRequestFields(req.body);

  if (!id || id.trim() === "") {
    return sendResponse(res, 400, false, "ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID");
  }
  try {
    const section = await ColumnSection.findOne({ _id: id, isDeleted: false });
    if (!section) {
      return sendResponse(res, 404, false, "Section not found or deleted");
    }

    if ("sectionId" in cleanedData) {
      delete cleanedData.sectionId;
    }

    const name = cleanedData.name || section.name;
    const heading = cleanedData.heading || section.heading;
    const columnLayout = cleanedData.columnLayout || section.columnLayout;
    const columnCount: number = cleanedData.columnCount ?? section.columnCount;

    const requestedColumns: IColumn[] = Array.isArray(cleanedData.columns)
      ? cleanedData.columns
      : section.columns;

    let columns: IColumn[] = [...requestedColumns];

    if (columns.length < columnCount) {
      const missing = columnCount - columns.length;
      // const defaultColumns: IColumn[] = Array.from(
      //   { length: missing },
      //   (_, i) => ({
      //     imageUrl:
      //       "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-picture-icon-png-image_4013511.jpg",
      //     text: `Column ${columns.length + i + 1}`,
      //   })
      // );
      const defaultColumns = Array.from({ length: missing }, (_, i) => ({
        text: `Column ${columns.length + i + 1}`,
      })) as IColumn[];
      columns = [...columns, ...defaultColumns];
    }

    section.name = name;
    section.heading = heading;
    section.columnLayout = columnLayout;
    section.columnCount = columnCount;
    section.columns = columns;

    await section.save();

    return sendResponse(
      res,
      200,
      true,
      "Section updated successfully",
      section
    );
  } catch (error) {
    // console.error("Error updating section:", error);
    return sendResponse(
      res,
      500,
      false,
      "Section update failed",
      error instanceof Error ? error.message : error
    );
  }
};

export const softDeleteColumnSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || id.trim() === "") {
    return sendResponse(res, 400, false, "ID is required");
  }
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID");
  }

  try {
    const section = await ColumnSection.findById(id);
    if (!section || section.isDeleted) return sendResponse(res, 404, false, "Section not found");
    section.isDeleted = true;
    section.deletedAt = new Date();
    await section.save();
    return sendResponse(res, 200, true, "Section soft-deleted");
  } catch (error) {
    return sendResponse(res, 500, false, "Soft delete failed", error instanceof Error ? error.message : error);
  }
};

// export const getDeletedColumnSections = async (_req: Request, res: Response) => {
//   try {
//     const deletedSections = await ColumnSection.find({ isDeleted: true }).sort({ deletedAt: -1 });
//     return sendResponse(res, 200, true, "Deleted sections fetched", deletedSections);
//   } catch (error) {
//     return sendResponse(res, 500, false, "Fetch failed", error instanceof Error ? error.message : error);
//   }
// };

export const restoreDeletedColumnSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID");
  }
  try {
    const section = await ColumnSection.findOne({ _id: id, isDeleted: true });
    if (!section) return sendResponse(res, 404, false, "Section not found");
    section.isDeleted = false;
    section.deletedAt = null;
    await section.save();
    return sendResponse(res, 200, true, "Deleted section restored", section);
  } catch (error) {
    return sendResponse(res, 500, false, "Restore failed", error instanceof Error ? error.message : error);
  }
};

