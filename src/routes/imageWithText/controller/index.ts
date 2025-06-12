import ImageTextSection from "../../../model/imageWithText/index";
import {
  sendResponse,
  dynamicSectionId,
  cleanRequestFields,
} from "../../../middlewares/helper";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const createImageWithText = async (req: Request, res: Response) => {
  try {
    const cleanedData = cleanRequestFields(req.body);
    const sectionId = dynamicSectionId(cleanedData.name || "image-with-text");

    const newSection = new ImageTextSection({ sectionId, ...cleanedData });

    await newSection.save();

    return sendResponse(
      res,
      201,
      true,
      "Section created successfully",
      newSection
    );
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Section creation failed", error);
  }
};

export const getAllImageWithTextSections = async (
  req: Request,
  res: Response
) => {
  try {
    const sections = await ImageTextSection.find();
    return sendResponse(
      res,
      200,
      true,
      "Sections retrieved successfully",
      sections
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Error fetching sections", error);
  }
};

export const getImageWithTextById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse(res, 400, false, "ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID format");
  }

  try {
    const section = await ImageTextSection.findById(id);
    if (!section) {
      return sendResponse(res, 404, false, "Section not found");
    }

    return sendResponse(
      res,
      200,
      true,
      "Section retrieved successfully",
      section
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

export const updateImageWithText = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse(res, 400, false, "Section Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID format");
  }

  try {
    const cleanedData = cleanRequestFields(req.body);
    delete cleanedData.sectionId;
    const updatedSection = await ImageTextSection.findByIdAndUpdate(
      id,
      { $set: cleanedData },
      { new: true, runValidators: true }
    );

    if (!updatedSection) {
      return sendResponse(res, 404, false, "Section not found");
    }

    return sendResponse(
      res,
      200,
      true,
      "Section updated successfully",
      updatedSection
    );
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Error updating section",
      error instanceof Error ? error.message : error
    );
  }
};

export const deleteImageWithText = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse(res, 400, false, "Section Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse(res, 400, false, "Invalid ID format");
  }
  try {
    const deletedSection = await ImageTextSection.findByIdAndDelete(id);
    if (!deletedSection) {
      return sendResponse(res, 404, false, "Section not found");
    }
    return sendResponse(res, 200, true, "Section deleted successfully");
  } catch (error) {
    return sendResponse(res, 500, false, "Error deleting section", error);
  }
};
