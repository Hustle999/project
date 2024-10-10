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
const addItem = "/addItem/cart";
const cartList = "/cart/lists";
const order = "/order";
const addNewProduct = "/addproduct";

// 1. GET /products - Retrieve all products
// 2. GET /products/{id} - Retrieve a specific product
// 3. POST /cart - Add a product to the cart
// 4. GET /cart - Retrieve the current cart
// 5. POST /orders - Place a new order
// 6. POST /products - Add a new product (admin only)

app.get(products, async (request, response) => {
  const sqlResponse = await sql`SELECT * FROM products`;
  response.json({ data: sqlResponse, success: true });
});

app.get(singleproduct, async (request, response) => {
  const id = 1;
  const sqlResponse = await sql`SELECT * FROM products where id =${id}`;
  response.json({ data: sqlResponse, success: true });
});

// LOGIN AND REGISTER

app.post("/sign-in", (request, response) => {
  const { name, password } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
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
