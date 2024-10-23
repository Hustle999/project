"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8888/");
        setProducts(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: selectedProduct.price,
      imgurl: selectedProduct.imgurl,
    };
  
    try {
      const response = await axios.put(`http://localhost:8888/editproduct/${selectedProduct.id}`, updatedProduct);
      if (response.data.success) {
        // Update the products list with the modified product
        setProducts((prevProducts) =>
          prevProducts.map((prod) => (prod.id === selectedProduct.id ? response.data.data : prod))
        );
        alert('Product updated successfully!');
      } else {
        alert('Error updating product: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    } finally {
      setModalOpen(false);
      setSelectedProduct(null); // Clear the selected product
    }
  };

  if (loading)
    return (
      <span className="flex justify-center items-center loading loading-bars loading-lg"></span>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ul className="grid 2xl:grid-cols-4 gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center">
        {products.map((product) => (
          <li key={product.id} className="flex flex-col rounded-2xl p-5 bg-white drop-shadow-2xl h-[600px]">
            {product.imgurl && (
              <Link href={`/product-information/${product.id}`}>
                <div className="flex justify-center">
                  <img
                    className="rounded-2xl"
                    src={product.imgurl}
                    alt={product.name}
                    style={{ width: "500px", height: "300px" }}
                  />
                </div>
              </Link>
            )}
            <div className="flex flex-col justify-between mt-5 h-full">
              <Link href={`/product-information/${product.id}`}>
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl">{product.name}</h2>
                  <p className="text-base truncate-to-3-lines">
                    {product.description}
                  </p>
                </div>
              </Link>
              <div className="flex justify-between items-center">
                <p className="text-lg">Price: ${product.price}</p>
                <div className="flex gap-5">
                  <button className="bg-blue-600 text-white p-2 rounded-md">
                    Add to cart
                  </button>
                  <button 
                    className="bg-blue-600 text-white px-5 py-2 rounded-md" 
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && selectedProduct && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            <form onSubmit={handleSubmit} className="flex flex-col pt-5 gap-5">
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Name of your product</p>
                <input
                  className="bg-slate-200 w-full rounded-lg py-2 px-1"
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">URL of your product picture</p>
                <input
                  className="bg-slate-200 w-full rounded-lg py-2 px-1"
                  type="text"
                  value={selectedProduct.imgurl}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, imgurl: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Description of your product</p>
                <input
                  className="bg-slate-200 w-full rounded-lg py-2 px-1"
                  type="text"
                  value={selectedProduct.description}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Price of your product</p>
                <input
                  className="bg-slate-200 w-full rounded-lg py-2 px-1"
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-between pt-10">
                <button type="submit" className="bg-blue-600 px-4 w-[120px] py-2 text-white rounded-xl">
                  Update
                </button>
                <button type="button" className="bg-slate-700 px-4 w-[120px] py-2 text-white rounded-xl" onClick={() => setModalOpen(false)}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};