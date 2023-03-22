import { Router } from "express";
import { addCard } from "../controller/payment/add-card-customer";
import { chargeCustomer } from "../controller/payment/charge-customer";
import { createCustomer } from "../controller/payment/create-customer";
import { product } from "../controller/payment/create-product";
import { subscribe } from "../controller/payment/create-subscription";
import { getCustomer } from "../controller/payment/get-customer";
export const router = Router();

router.post("/create-customer", createCustomer);
router.get("/get-customer/:id", getCustomer);
router.post("/add-card", addCard);
router.post("/charge-customer", chargeCustomer);
router.post("/create-product", product);
router.post("/create-subscription", subscribe);
