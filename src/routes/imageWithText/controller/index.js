import ImageWithText from "../../../model/imageWithText/index.js";
import { sendResponse, dynamicSectionId, cleanRequestFields } from "../../../middlewares/helper.js";

export const createImageWithText = async (req, res) => {
  // console.log("req.body__", req.body);
  try {
    const cleanedData = cleanRequestFields(req.body);
    // console.log("cleanedData",cleanedData);
    const sectionId = dynamicSectionId(cleanedData.name || "image-with-text");

    const newSection = new ImageWithText({
      sectionId,
      ...cleanedData,
    });

    await newSection.save();

    return sendResponse(res, 201, true, "Section created successfully", newSection);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Section creation failed", error);
  }
};

export const getAllImageWithTextSections = async (req, res) => {
  try {
    const sections = await ImageWithText.find();
    return sendResponse(res, 200, true, "Sections retrieved successfully", sections);
  } catch (error) {
    return sendResponse(res, 500, false, "Error fetching sections", error);
  }
};

export const getImageWithTextById = async (req, res) => {
  try {
    const section = await ImageWithText.findById(req.params.id);
    if (!section) {
      return sendResponse(res, 404, false, "Section not found");
    }
    return sendResponse(res, 200, true, "Section retrieved successfully", section);
  } catch (error) {
    return sendResponse(res, 500, false, "Error fetching section", error);
  }
};

export const updateImageWithText = async (req, res) => {
  try {
    const { heading, imageUrl, textHeading, description, alignment } = req.body;
    const updatedSection = await ImageWithText.findByIdAndUpdate(
      req.params.id,
      { heading, imageUrl, textHeading, description, alignment },
      { new: true }
    );

    if (!updatedSection) {
      return sendResponse(res, 404, false, "Section not found");
    }
    return sendResponse(res, 200, true, "Section updated successfully", updatedSection);
  } catch (error) {
    return sendResponse(res, 500, false, "Error updating section", error);
  }
};

export const deleteImageWithText = async (req, res) => {
  try {
    const deletedSection = await ImageWithText.findByIdAndDelete(req.params.id);
    if (!deletedSection) {
      return sendResponse(res, 404, false, "Section not found");
    }
    return sendResponse(res, 200, true, "Section deleted successfully");
  } catch (error) {
    return sendResponse(res, 500, false, "Error deleting section", error);
  }
};
