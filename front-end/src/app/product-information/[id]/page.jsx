"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/app/components/homepage/Header";

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
      <div className="flex w-full flex-col justify-between h-[600px] gap-4">
        <div className="skeleton h-[300px] w-full"></div>
        <div className="skeleton h-20 w-28"></div>
        <div className="skeleton h-20 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center pt-[200px] px-[100px]  bg-slate-100 h-screen">
        <div>
          <h1 className="flex justify-center text-6xl">{product.name}</h1>
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div className="flex m-auto h-[500px]">
              {product.imgurl && (
                <img
                  className="rounded-2xl"
                  src={product.imgurl}
                  alt={product.name}
                />
              )}
            </div>
            <div className="flex flex-col justify-between pr-[300px]">
              <div className="flex flex-col gap-10">
                <p className="text-2xl font-semibold">Description</p>
                <p className="text-2xl text-slate-600">{product.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">
                  Price: $ {product.price}
                </p>
                <button className="bg-blue-600 text-white p-2 rounded-md">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
