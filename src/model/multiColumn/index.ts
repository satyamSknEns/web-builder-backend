import mongoose, { Schema, Document, Model } from "mongoose";

export interface IColumn {
  imageUrl: string;
  text: string;
}

export interface IMultiColumnSection extends Document {
  sectionId: string;
  name: string;
  heading: string;
  columnCount: number;
  columnLayout: "horizontal" | "vertical";
  columns: IColumn[];
  createdAt: Date;
  updatedAt: Date;
}

const columnSchema = new Schema<IColumn>({
  imageUrl: {
    type: String,
    required: true,
    default: "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-picture-icon-png-image_4013511.jpg",
  },
  text: {
    type: String,
    required: true,
    default: "Column text",
  },
});

const columnSectionSchema = new Schema<IMultiColumnSection>(
  {
    sectionId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "Column Section",
    },
    heading: {
      type: String,
      required: true,
      default: "Section Heading Here",
    },
    columnCount: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    columnLayout: {
      type: String,
      enum: ["horizontal", "vertical"],
      required: true,
      default: "horizontal",
    },
    columns: {
      type: [columnSchema],
      required: true,
      validate: {
        validator(this: IMultiColumnSection, val: IColumn[]) {
          return val.length === this.columnCount;
        },
        message: (props: any) =>
          `columns.length (${props.value.length}) must match columnCount`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const MultiColumnSection: Model<IMultiColumnSection> = mongoose.model<IMultiColumnSection>(
  "MultiColumnSection",
  columnSectionSchema
);

export default MultiColumnSection;
