const { Schema, SchemaTypes } = require("mongoose");

const CartSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  products: [
    {
      productId: { type: SchemaTypes.ObjectId, required: true },
      quantity: { type: Number, default: 1, required: true },
    },
  ],
});
