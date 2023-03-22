import { responseHandler } from "../../response/responseHandler";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

export const getCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve(req.params.id);
    console.log(customer);
    return responseHandler(
      res,
      200,
      "Customer details sent successfully",
      true,
      customer
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
