import mongoose from "mongoose";

const imageTextSectionSchema = new mongoose.Schema({
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
});

const ImageTextSection = mongoose.model("ImageTextSection", imageTextSectionSchema);

export default ImageTextSection;
