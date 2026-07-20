import mongoose from "mongoose";

const templeSchema = new mongoose.Schema(
  {
    templeName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    categories: [
      {
        type: String,
        enum: [
          "pilgrimage",
          "architecture",
          "heritage",
          "jyotirlinga",
          "char-dham",
          "shakti-peeth",
        ],
      },
    ],

    pilgrimageCircuits: [
      {
        type: String,
        enum: [
          "Char Dham",
          "Chota Char Dham",
          "Jyotirlinga",
          "Shakti Peeth",
          "Sapta Puri",
          "Panch Kedar",
          "Pancha Bhoota Sthalams",
          "Divya Desam",
          "Ashtavinayak",
          "Kanwar Yatra",
          "Amarnath Yatra",
          "Kumbh Mela Circuit",
        ],
      },
    ],

    state: {
      type: String,
      require: true,
      trim: true,
    },

    city: {
      type: String,
      require: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    deity: {
      type: String,
      require: true,
      trim: true,
    },

    history: {
      type: String,
    },

    architectureStyle: {
      type: String,
    },

    dynasty: {
      type: String,
    },

    builtYear: {
      type: String,
    },

    darshanTimings: {
      type: String,
    },

    visitorGuidelines: {
      type: String,
    },

    dressCode: {
      type: String,
    },

    festivals: [String],

    rituals: [String],

    images: [String],

    featured: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 4.5,
    },
  },
  {
    timestamps: true,
  },
);

const Temple = mongoose.model("Temple", templeSchema);

export default Temple;
