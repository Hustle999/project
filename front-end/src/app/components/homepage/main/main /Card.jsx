export const Card = () => {
  return (
    <div className="bg-white rounded-2xl -z-1">
      <figure>
        <img
          className="rounded-t-2xl"
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="flex flex-col p-5 gap-5">
        <div className="flex justify-between text-2xl font-semibold">
          <div>Тавчик</div>
          <div>59.99$</div>
        </div>
        <p>2024 оны шинэ загвар. Загварын хувьд...</p>
        <div className="flex justify-between">
          <button className="btn btn-primary">Information</button>
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
};
