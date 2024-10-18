// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:8888/");
//         setProducts(response.data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading)
//     return (
//       <span className="flex justify-center items-center loading loading-bars loading-lg"></span>
//     );
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <ul className="grid 2xl:grid-cols-4 gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center">
//       {products.map((product) => {
//         return (
//           <Link href={"productreview"}>
//             <li
//               className="rounded-2xl p-5 bg-white drop-shadow-2xl"
//               key={product.id}
//             >
//               {product.imgurl && (
//                 <div className="flex justify-center">
//                   <img
//                     className="rounded-2xl"
//                     src={product.imgurl}
//                     alt={product.name}
//                     style={{ width: "500px", height: "300px" }}
//                   />
//                 </div>
//               )}
//               <div className="flex flex-col mt-5 gap-10 justify-between">
//                 <div className="flex flex-col gap-4">
//                   <h2 className="text-2xl">{product.name}</h2>
//                   <p className="text-base truncate-to-3-lines">
//                     {product.description}
//                   </p>
//                 </div>
//                 <p className="text-lg">Price: $ {product.price}</p>
//               </div>
//             </li>
//           </Link>
//         );
//       })}
//     </ul>
//   );
// };

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading)
    return (
      <span className="flex justify-center items-center loading loading-bars loading-lg"></span>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <ul className="grid 2xl:grid-cols-4 gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center">
      {products.map((product) => (
        <Link key={product.id} href={`/product-information/${product.id}`}>
          <li className="rounded-2xl p-5 bg-white drop-shadow-2xl">
            {product.imgurl && (
              <div className="flex justify-center">
                <img
                  className="rounded-2xl"
                  src={product.imgurl}
                  alt={product.name}
                  style={{ width: "500px", height: "300px" }}
                />
              </div>
            )}
            <div className="flex flex-col mt-5 gap-10 justify-between">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl">{product.name}</h2>
                <p className="text-base truncate-to-3-lines">
                  {product.description}
                </p>
              </div>
              <p className="text-lg">Price: ${product.price}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};
