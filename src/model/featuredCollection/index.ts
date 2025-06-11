import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Size",
  },
  options: {
    type: [String],
    required: true,
    default: ["M"],
  },
});

const productSchema = new mongoose.Schema({
  productImages: {
    type: [String],
    required: true,
    default: ["https://example.com/default-product.jpg"],
  },
  title: {
    type: String,
    required: true,
    default: "Product Title",
  },
  description: {
    type: String,
    required: true,
    default: "Add a short description about the product here.",
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  comparePrice: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  availableQuantity: {
    type: Number,
    default: 0,
  },
  variants: {
    type: [variantSchema],
    default: [], 
  },
});

const featuredCollectionSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "Featured Collection Section",
  },
  heading: {
    type: String,
    required: true,
    default: "Featured Products",
  },
  products: {
    type: [productSchema],
    default: [],
  },
});

const FeaturedCollection = mongoose.model("FeaturedCollection", featuredCollectionSchema);

export default FeaturedCollection;
