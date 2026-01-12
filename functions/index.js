// const { onRequest } = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// Initialize Stripe securely (Read from .env)
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

// Create Payment Intent
app.post("/payments/create", async (req, res) => {
  try {
    const total = Number(req.query.total);

    if (!Number.isInteger(total) || total <= 0) {
      return res.status(400).json({
        message: "Invalid total amount",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// API export
exports.api = functions.https.onRequest(app);
