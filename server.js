import express from "express";
import cors from "cors";
import { seedProducts, initProductsTable } from "./config/sqlUtils.js";
import router from "./routes/routes.js";

// ----------------------------- setting up server ---------------------------------\\
const app = express();
const PORT = process.env.PORT || 8000;

// ----------------------------- setting up server ---------------------------------\\

initProductsTable();
seedProducts();

// ------------------------- setting up server settings ---------------------------\\
app.use(express.json());
app.use(cors());
app.use("/api/products", router);
// ----------------------------- setting up endpoints --------------------------------\\

app.get("/api", (req, res) => {
  res.json({ message: "hello from the server-side!" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
