const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    // payment: {},
    CashOnDelevary: {
      type: String,
    },
    TransactionId: {
      type: String,
    },
    BkashNumber: {
      type: String,
    },

    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
