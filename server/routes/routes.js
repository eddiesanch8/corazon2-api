import express from "express";
import { getProducts } from "../config/sqlUtils.js";

//Problem : given an array of integers, write a function to find the second largest number in the array

const router = express.Router();

router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    const products = await getProducts(category);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
