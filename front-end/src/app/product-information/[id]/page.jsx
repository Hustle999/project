"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail({ params }) {
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

  if (loading)
    return (
      <span className="w-full h-screen flex justify-center items-center loading loading-bars"></span>
    );
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="">
      <h1>{product.name}</h1>
      {product.imgurl && <img src={product.imgurl} alt={product.name} />}
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
