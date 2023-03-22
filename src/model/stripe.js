import mongoose from "mongoose";

export const Payment = mongoose.model("payment", {
  customer_name: {
    type: String,
  },
  customer_email: {
    type: String,
  },
  customer_id: {
    type: String,
  },
  payment_id: {
    type: String,
  },
});
