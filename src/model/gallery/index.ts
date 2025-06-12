import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem {
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
}

export interface IGallerySection extends Document {
  sectionId: string;
  name: string;
  heading: string;
  columnCount: number;
  columnLayout: "horizontal" | "vertical";
  columns: IGalleryItem[];
  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const galleryItemSchema = new Schema<IGalleryItem>({
  imageUrl: {
    type: String,
    required: true,
    default: "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-picture-icon-png-image_4013511.jpg",
  },
  buttonText: {
    type: String,
    required: true,
    default: "Click Me",
  },
  buttonUrl: {
    type: String,
    required: true,
    default: "https://example.com",
  },
});

const gallerySectionSchema = new Schema<IGallerySection>(
  {
    sectionId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "Gallery Section",
    },
    heading: {
      type: String,
      required: true,
      default: "Gallery Heading Here",
    },
    columnCount: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    columnLayout: {
      type: String,
      enum: ["horizontal", "vertical"],
      required: true,
      default: "horizontal",
    },
    columns: {
      type: [galleryItemSchema],
      required: true,
      validate: {
        validator(this: IGallerySection, val: IGalleryItem[]) {
          return val.length === this.columnCount;
        },
        message: (props: any) =>
          `columns.length (${props.value.length}) must match columnCount`,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const GallerySection: Model<IGallerySection> = mongoose.model<IGallerySection>(
  "GallerySection",
  gallerySectionSchema
);

export default GallerySection;
