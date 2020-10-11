const express = require("express");
const router = express.Router();

//Author Jasper Jiao
// This is a sample test API key. Sign in to see examples pre-filled with your key.
// const stripe = require("stripe")(
//   "sk_test_51H8aQ9IGlOWie6gE3xoaua9UO3uB4VcpQUWPeNOBvrAXnzZJuqpbe7gXOvVEzag3jT302kzpmpPsKuNcZWVSVQ7k00CAPEgJoe"
// );
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
