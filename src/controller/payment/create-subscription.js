import { responseHandler } from "../../response/responseHandler";
import Stripe from "stripe";
import dotenv from "dotenv";
import { cardDetails } from "./charge-customer";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

const createSubscription = async (
  { price, trial_period_days },
  payMethId,
  { id }
) => {
  try {
    let data = {
      customer: id,
      items: [{ price: price }],
      trial_period_days: trial_period_days,
      off_session: true,
      payment_settings: {
        payment_method_types: ["card"],
      },
      collection_method: "charge_automatically",
      payment_behavior: "allow_incomplete",
      default_payment_method: payMethId.id,
    };
    const subscribe = await stripe.subscriptions.create(data);
    return subscribe;
  } catch (err) {
    console.log(err);
  }
};

const createCustomer = async ({ name, email }) => {
  const customers = {
    name: name,
    email: email,
  };
  const customer = await stripe.customers.create(customers);
  return customer;
};

export const subscribe = async (req, res) => {
  try {
    const payMeth = await cardDetails();
    const customer = await createCustomer(req.body);
    const subscription = await createSubscription(
      req.body,
      payMeth.id,
      customer
    );
    return responseHandler(
      res,
      200,
      "Subscribed  Successfully",
      true,
      subscription
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
