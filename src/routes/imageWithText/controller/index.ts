import ImageTextSection from "../../../model/imageWithText/index";
import {
  sendResponse,
  dynamicSectionId,
  cleanRequestFields,
} from "../../../middlewares/helper";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const createImageText = async (req: Request, res: Response) => {
  try {
    const cleanedData = cleanRequestFields(req.body);
    const sectionId = dynamicSectionId(cleanedData.name || "image-with-text");

    const newSection = new ImageTextSection({ sectionId, ...cleanedData });

    await newSection.save();

    return sendResponse( res, 201, true, "Section created successfully", newSection );
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Section creation failed", error);
  }
};

export const getAllImageTextSections = async (
  req: Request,
  res: Response
) => {
  try {
    const sections = await ImageTextSection.find({ isDeleted: false }).sort({ createdAt: -1 });
    return sendResponse( res, 200, true, "Sections retrieved successfully", sections );
  } catch (error) {
    return sendResponse(res, 500, false, "Error fetching sections", error);
  }
};

export const getImageTextSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || id.trim() === "") { return sendResponse(res, 400, false, "ID is required"); }

  if (!mongoose.Types.ObjectId.isValid(id)) { return sendResponse(res, 400, false, "Invalid ID format"); }

  try {
    const section = await ImageTextSection.findById({ _id: id, isDeleted: false });
    if (!section) { return sendResponse(res, 404, false, "Section not found or deleted"); }

    return sendResponse( res, 200, true, "Section retrieved successfully", section );
  } catch (error) {
    return sendResponse( res, 500, false, "Error fetching section", error instanceof Error ? error.message : error );
  }
};

export const updateImageTextSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || id.trim() === "") { return sendResponse(res, 400, false, "ID is required"); }

  if (!mongoose.Types.ObjectId.isValid(id)) { return sendResponse(res, 400, false, "Invalid ID format"); }

  try {
    const cleanedData = cleanRequestFields(req.body);
    delete cleanedData.sectionId;
    const updatedSection = await ImageTextSection.findByIdAndUpdate(
      { _id: id, isDeleted: false },
      { $set: cleanedData },
      { new: true, runValidators: true }
    );

    if (!updatedSection) { return sendResponse(res, 404, false, "Section not found"); }

    return sendResponse( res, 200, true, "Section updated successfully", updatedSection );
  } catch (error) {
    return sendResponse( res, 500, false, "Error updating section", error instanceof Error ? error.message : error );
  }
};

export const softDeleteImageTextSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || id.trim() === "") { return sendResponse(res, 400, false, "ID is required"); }

  if (!mongoose.Types.ObjectId.isValid(id)) { return sendResponse(res, 400, false, "Invalid ID"); }

  try {
    const section = await ImageTextSection.findById(id);
    if (!section || section.isDeleted) return sendResponse(res, 404, false, "Section not found");
    section.isDeleted = true;
    section.deletedAt = new Date();
    await section.save();
    return sendResponse(res, 200, true, "Section soft deleted");
  } catch (error) {
    return sendResponse(res, 500, false, "Soft delete failed", error instanceof Error ? error.message : error);
  }
};

export const restoreDeletedImageTextSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || id.trim() === "") { return sendResponse(res, 400, false, "ID is required"); }
  if (!mongoose.Types.ObjectId.isValid(id)) { return sendResponse(res, 400, false, "Invalid ID"); }

  try {
    const section = await ImageTextSection.findOne({ _id: id, isDeleted: true });
    if (!section) return sendResponse(res, 404, false, "Section not found");
    section.isDeleted = false;
    section.deletedAt = null;
    await section.save();
    return sendResponse(res, 200, true, "Deleted section restored", section);
  } catch (error) {
    return sendResponse(res, 500, false, "Restore failed", error instanceof Error ? error.message : error);
  }
};
