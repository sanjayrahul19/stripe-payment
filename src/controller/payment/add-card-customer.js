import { responseHandler } from "../../response/responseHandler";
import Stripe from "stripe";
import { Payment } from "../../model/stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

export const createToken = async (req, res) => {
  try {
    let tokenCard = {};
    tokenCard.card = {
      number: "4242 4242 4242 4242",
      exp_month: 1,
      exp_year: 2025,
      cvc: "215",
    };
    console.log(tokenCard, "tokencard");
    const token = await stripe.tokens.create(tokenCard);
    return token;
  } catch (err) {
    console.log(err);
  }
};

export const addCard = async (req, res) => {
  try {
    const token = await createToken();
    console.log(token, "token");
    const card = await stripe.customers.createSource(req.body.customerId, {
      source: token.id,
    });
    console.log(card, "card");
    return responseHandler(
      res,
      200,
      "Card added to customer  Successfully",
      true,
      card
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
1;
