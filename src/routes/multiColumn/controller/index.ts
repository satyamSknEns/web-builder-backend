import { Response, Request } from "express";
import MultiColumnSection, { IColumn } from "../../../model/multiColumn";
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

    const newSection = new MultiColumnSection({
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

export const getAllSections = async (req: Request, res: Response) => {
  try {
    const allSections = await MultiColumnSection.find().sort({ createdAt: -1 });
    return sendResponse(
      res,
      200,
      true,
      "Sections fetched successfully",
      allSections
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Error fetching section",
      error instanceof Error ? error.message : error
    );
  }
};

export const getSectionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || id.trim() === "") {
      return sendResponse(res, 400, false, "ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid ID format");
    }
    const section = await MultiColumnSection.findById(id);
    if (!section) {
      sendResponse(res, 404, false, "Section not found");
    }
    sendResponse(res, 200, true, "Section retrieved successfully", section);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Error fetching section",
      error instanceof Error ? error.message : error
    );
  }
};

export const updateSectionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cleanedData = cleanRequestFields(req.body);

    if (!id || id.trim() === "") {
      return sendResponse(res, 400, false, "Section ID is required");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid ID format");
    }
    const section = await MultiColumnSection.findById(id);
    if (!section) {
      return sendResponse(res, 404, false, "Section not found");
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

export const deleteSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return sendResponse(res, 400, false, "Section Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID format");
  }
  try {
    const deletedSection = await MultiColumnSection.findByIdAndDelete(id);
    if (!deletedSection) {
      return sendResponse(res, 404, false, "Section not found");
    }

    sendResponse(
      res,
      200,
      true,
      "Section deleted successfully",
      deletedSection
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Section deletion failed",
      error instanceof Error ? error.message : error
    );
  }
};
