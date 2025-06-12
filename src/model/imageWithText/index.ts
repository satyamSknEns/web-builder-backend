import mongoose, { Document, Schema, Model } from "mongoose";

export interface IImageTextSection extends Document {
  sectionId: string;
  name: string;
  heading: string;
  imageUrl: string;
  title: string;
  description: string;
  imageAlignment: "left" | "right";
  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const imageTextSectionSchema: Schema<IImageTextSection> = new mongoose.Schema(
  {
    sectionId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "Image With Text Section",
    },
    heading: {
      type: String,
      required: true,
      default: "Write here heading of the section",
    },
    imageUrl: {
      type: String,
      required: true,
      default: "https://example.com/default-image.jpg",
    },
    title: {
      type: String,
      required: true,
      default: "Image with text",
    },
    description: {
      type: String,
      required: true,
      default: "Add description here for this section.",
    },
    imageAlignment: {
      type: String,
      enum: ["left", "right"],
      default: "left",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

const ImageTextSection: Model<IImageTextSection> =
  mongoose.model<IImageTextSection>("ImageTextSection", imageTextSectionSchema);

export default ImageTextSection;
