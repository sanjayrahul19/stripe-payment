import { responseHandler } from "../../response/responseHandler";
import Stripe from "stripe";
import { Payment } from "../../model/stripe";
import { createToken } from "./add-card-customer";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

export const createCustomer = async (req, res) => {
  try {
    const token = await createToken();
    const customer = {
      name: req.body.name,
      email: req.body.email,
      address: {
        postal_code: "default",
      },
      source: token.id,
    };
    const customers = await stripe.customers.create(customer);
    const db = await new Payment({
      customer_id: customers.id,
      customer_name: customers.name,
      customer_email: customers.email,
    });
    await db.save();
    return responseHandler(res, 200, "Customer created successfully", true, db);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
