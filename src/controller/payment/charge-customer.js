import { responseHandler } from "../../response/responseHandler";
import Stripe from "stripe";
import { Payment } from "../../model/stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

const getCustomerById = async (customerID) => {
  const customer = await stripe.customers.retrieve(customerID);
  return customer;
};

export const cardDetails = () => {
  let cardForPay = {
    type: "card",
    card: {
      number: "4000003560000008",
      exp_month: "1",
      exp_year: 2025,
      cvc: "215",
    },
  };

  const card = stripe.paymentMethods.create(cardForPay);
  return card;
};

const paymentDetails = async (customerID) => {
  let details = {
    amount: "200",
    currency: "usd",
    payment_method_types: ["card"],
    customer: customerID,
    setup_future_usage: "off_session",
    confirm: true,
    description: "First payment",
  };
  const pay = await stripe.paymentIntents.create(details);
  return pay;
};

export const chargeCustomer = async (req, res) => {
  try {
    const customer = await getCustomerById(req.body.customerId);
    const payment = await paymentDetails(customer.id);
    const db = await new Payment({
      customer_name: customer.name,
      customer_email: customer.email,
      customer_id: customer.id,
      payment_id: payment.id,
    });
    await db.save();
    return responseHandler(res, 200, "Paid  Successfully", true, payment);
  } catch (err) {
    console.log(err);
    return responseHandler(res, 500, err.message, false);
  }
};
