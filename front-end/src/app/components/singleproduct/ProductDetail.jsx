"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../homepage/Header";

export function ProductDetail({ params }) {
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8888/product/${id}`
          );
          setProduct(response.data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div>
      <Header />
      <div>hi</div>
      <h1>{product.name}</h1>
      {product.imgurl && <img src={product.imgurl} alt={product.name} />}
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}

// import React, { useState } from "react";
// // Initialize state with an empty object
// const [data, setData] = useState({});

// // Function to increment a specific counter
// const incrementCount = (countKey) => {
//   setData((prevData) => ({
//     ...prevData,
//     [countKey]: (prevData[countKey] || 0) + 1, // Incrementing the specified count, defaulting to 0 if undefined
//   }));
// };

// // Function to decrement a specific counter
// const decrementCount = (countKey) => {
//   setData((prevData) => ({
//     ...prevData,
//     [countKey]: (prevData[countKey] || 0) - 1, // Decrementing the specified count
//   }));
// };

// return (
//   <div>
//     {["count1", "count2", "count3"].map((countKey) => (
//       <div key={countKey}>
//         <h1>
//           {countKey}: {data[countKey] || 0}
//         </h1>
//         <button onClick={() => incrementCount(countKey)}>
//           Increment {countKey}
//         </button>
//         <button onClick={() => decrementCount(countKey)}>
//           Decrement {countKey}
//         </button>
//       </div>
//     ))}
//   </div>
// );
