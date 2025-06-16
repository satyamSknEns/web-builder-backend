import { Request, Response } from "express";
import { sendResponse } from "../../../middlewares/helper";
import mongoose from "mongoose";

export const getAllSections = async (req: Request, res: Response) => {
    try {
        if (!mongoose.connection || !mongoose.connection.db) {
            return sendResponse(res, 500, false, "Database not connected");
        }

        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map((col) => col.name);

        return sendResponse(res, 200, true, "Section list fetched successfully", collectionNames);
    } catch (error) {
        return sendResponse(res, 500, false, "Fetch failed with error", error instanceof Error ? error.message : error);
    }
};
