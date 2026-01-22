import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: String,
      required: [true, "Owner is required"],
    },

    name: {
      type: String,
    },

    type: {
      type: String,
    },

    description: {
      type: String,
    },

    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },

    beds: {
      type: Number,
    },

    baths: {
      type: Number,
    },

    square_feet: {
      type: Number,
    },

    amenities: [{ type: String }],

    rates: {
      weekly: {
        type: Number,
      },
      nightly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
    },

    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },

    images: [{ type: String }],

    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
