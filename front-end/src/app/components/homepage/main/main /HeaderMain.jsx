// export const HeaderMain = () => {
//   return (
//     <div className="flex justify-between items-end pt-24 px-[100px] ">
//       <p className="text-5xl font-semibold">Our Products</p>
//       <div className="flex gap-5">
//         <button
//           className="px-3 h-10 flex justify-center items-center rounded-xl text-white bg-blue-600"
//           onClick={() => document.getElementById("my_modal_1").showModal()}
//         >
//           Create Product
//         </button>
//         <dialog id="my_modal_1" className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">
//               Please insert your product data following the texts
//             </h3>
//             <div className="flex flex-col pt-5 gap-5">
//               <div className="flex flex-col gap-2">
//                 <p className="font-semibold">Name of your product</p>
//                 <input
//                   className="bg-slate-200 w-full rounded-lg py-2 px-1"
//                   type="text"
//                   placeholder="Example: Toyota Prius-20 ..."
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <p className="font-semibold">URL of your product picture</p>
//                 <input
//                   className="bg-slate-200 w-full rounded-lg py-2 px-1"
//                   type="text"
//                   placeholder="Example: http://media.com ..."
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <p className="font-semibold">Descripption of your product</p>
//                 <input
//                   className="bg-slate-200 w-full rounded-lg py-2 px-1"
//                   type="text"
//                   placeholder="Example: About your product..."
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <p className="font-semibold">Price of your product</p>
//                 <input
//                   className="bg-slate-200 w-full rounded-lg py-2 px-1"
//                   type="text"
//                   placeholder="Example: 23000"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-between pt-10">
//               <form method="dialog">
//                 {/* if there is a button in form, it will close the modal */}
//                 <button className="bg-blue-600 px-4 w-[120px] py-2 text-white rounded-xl">Create</button>
//               </form>
//               <form method="dialog">
//                 {/* if there is a button in form, it will close the modal */}
//                 <button className="bg-slate-700 px-4 w-[120px] py-2 text-white rounded-xl">Close</button>
//               </form>
//             </div>
//           </div>
//         </dialog>
//         <p className="px-5 h-10 flex justify-center items-center rounded-xl text-white bg-blue-600">
//           View All
//         </p>
//       </div>
//     </div>
//   );
// };
'use client';
import React, { useState } from 'react';

export const HeaderMain = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState(''); // For image URL
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price, // Ensure price is a number
      imgurl: url, // Use 'imgurl' to match the backend
    };

    try {
      const response = await fetch('http://localhost:8888/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();
      if (result.success) {
        alert('Product added successfully!');
        // Reset form fields
        setName('');
        setUrl('');
        setDescription('');
        setPrice('');
        setModalOpen(false); // Close modal after success
      } else {
        alert('Error adding product: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  return (
    <div className="flex justify-between items-end pt-24 px-[100px]">
      <p className="text-5xl font-semibold">Our Products</p>
      <div className="flex gap-5">
        <button
          className="px-3 h-10 flex justify-center items-center rounded-xl text-white bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          Create Product
        </button>

        {modalOpen && (
          <dialog open className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Please insert your product data following the texts
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col pt-5 gap-5">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Name of your product</p>
                  <input
                    className="bg-slate-200 w-full rounded-lg py-2 px-1"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Example: Toyota Prius-20 ..."
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">URL of your product picture</p>
                  <input
                    className="bg-slate-200 w-full rounded-lg py-2 px-1"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Example: http://media.com ..."
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Description of your product</p>
                  <input
                    className="bg-slate-200 w-full rounded-lg py-2 px-1"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Example: About your product..."
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Price of your product</p>
                  <input
                    className="bg-slate-200 w-full rounded-lg py-2 px-1"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Example: 23000"
                    required
                  />
                </div>
                <div className="flex justify-between pt-10">
                  <button type="submit" className="bg-blue-600 px-4 w-[120px] py-2 text-white rounded-xl">
                    Create
                  </button>
                  <button type="button" className="bg-slate-700 px-4 w-[120px] py-2 text-white rounded-xl" onClick={() => setModalOpen(false)}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}

        <p className="px-5 h-10 flex justify-center items-center rounded-xl text-white bg-blue-600">
          View All
        </p>
      </div>
    </div>
  );
};