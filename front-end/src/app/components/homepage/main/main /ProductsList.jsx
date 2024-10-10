import { Card } from "./Card";

export const ProductsList = () => {
  return (
    <div className="px-[100px] py-10">
      <div className="grid 2xl:grid-cols-4 gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <Card />
      </div>
    </div>
  );
};
