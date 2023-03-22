import { responseHandler } from "../../response/responseHandler";
import Stripe from "stripe";
import { Payment } from "../../model/stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

const createProduct = async ({ product_name, product_description }) => {
  try {
    const product = await stripe.products.create({
      name: product_name,
      description: product_description,
    });
    return product;
  } catch (error) {
    console.log(error);
  }
};

const createPrice = async (
  { currency, price, interval, interval_count },
  { id }
) => {
  try {
    const productPrice = await stripe.prices.create({
      unit_amount: price,
      currency: currency,
      recurring: {
        interval: interval,
        interval_count: interval_count,
      },
      product: id,
    });
    return productPrice;
  } catch (err) {
    console.log(err);
  }
};

export const product = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    const price = await createPrice(req.body, product);
    return responseHandler(res, 200, "Product created  Successfully", true, {
      product,
      price,
    });
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
