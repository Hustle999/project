import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { error } from "console";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const port = 8888;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const sql = neon(`${process.env.DATABASE_URL}`);

const products = "/";
const singleproduct = "/product/:id";
const editproduct = `/editproduct/:id`;
const addNewProduct = "/addproduct";
const deleteProduct = "/deleteproduct/:id";

// 1. GET /products - Retrieve all products
// 2. GET /products/{id} - Retrieve a specific product
// 3. POST /cart - Add a product to the cart
// 4. GET /cart - Retrieve the current cart
// 5. POST /orders - Place a new order
// 6. POST /products - Add a new product

app.get(products, async (request, response) => {
  const sqlResponse = await sql`SELECT * FROM products`;
  response.json({ data: sqlResponse, success: true });
});

app.get(singleproduct, async (request, response) => {
  const id = request.params.id; // Accessing the product ID
  try {
    const sqlResponse = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (sqlResponse.length === 0) {
      return response
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    response.json({ data: sqlResponse[0], success: true }); // Return the first item
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: "Server error" });
  }
});

app.post(addNewProduct, async (request, response) => {
  const { name, description, price, imgurl } = request.body; // Keep as is if you use imgurl in frontend

  // Basic validation
  if (!name || !description || !price || !imgurl) {
    return response.status(400).json({
      success: false,
      error: "Name, description, price, and img_url are required.",
    });
  }

  try {
    const sqlResponse = await sql`
      INSERT INTO products (name, description, price, imgurl)
      VALUES (${name}, ${description}, ${price}, ${imgurl})`;

    // Return the newly created product
    response.status(201).json({ data: sqlResponse, success: true });
  } catch (error) {
    console.error("Error inserting product:", error);
    response.status(500).json({ success: false, error: error.message });
  }
});

app.put(editproduct, async (request, response) => {
  const { id } = request.params;
  const { name, description, price, imgurl } = request.body;

  // Basic validation
  if (!name || !description || !price || !imgurl) {
    return response.status(400).json({
      success: false,
      error: "Name, description, price, and img_url are required.",
    });
  }

  try {
    const sqlResponse = await sql`
      UPDATE products
      SET name = ${name}, description = ${description}, price = ${price}, imgurl = ${imgurl}
      WHERE id = ${id}
      RETURNING *`;

    if (sqlResponse.length === 0) {
      return response
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    response.status(200).json({ data: sqlResponse[0], success: true });
  } catch (error) {
    console.error("Error updating product:", error);
    response.status(500).json({ success: false, error: error.message });
  }
});

app.delete(deleteProduct, async (request, response) => {
  const { id } = request.params;

  try {
    const sqlResponse = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *`;

    if (sqlResponse.length === 0) {
      return response
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    response
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    response.status(500).json({ success: false, error: error.message });
  }
});

// LOGIN AND REGISTER

app.post("/sign-in", (request, response) => {
  const { name, password } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: true,
        error: error,
      });
    }

    let savedData = data ? JSON.parse(data) : [];

    const registeredUser = savedData.filter(
      (user) => user.name === name && user.password === password
    );
    if (registeredUser.length > 0) {
      response.json({
        success: true,
        user: registeredUser[0],
      });
    } else {
      response.json({
        success: false,
      });
    }
  });
});

app.post("/sign-up", (request, response) => {
  const { name, email, password } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    let savedData = data ? JSON.parse(data) : [];

    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    console.log(data);

    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
    };
    savedData.push(newUser);

    fs.writeFile("./data/user.json", JSON.stringify(savedData), (error) => {
      if (error) {
        response.json({
          success: false,
          error: error,
        });
      } else {
        response.json({
          success: true,
          user: newUser,
        });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server ajillaj bn http://localhost:${port}`);
});
