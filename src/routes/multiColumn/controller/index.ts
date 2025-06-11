import { Response, Request } from "express";
import MultiColumnSection, { IColumn } from "../../../model/multiColumn";
import {
  sendResponse,
  dynamicSectionId,
  cleanRequestFields,
} from "../../../middlewares/helper";

const IMAGE_URL = "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-picture-icon-png-image_4013511.jpg";

export const createMultiColumn = async (req: Request, res: Response) => {
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
    return sendResponse(res, 500, false, "Section creation failed", error);
  }
};
