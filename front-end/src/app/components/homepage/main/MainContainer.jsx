import { HeaderMain } from "./main /HeaderMain";
import { ProductsList } from "./main /ProductsList";

export const MainContainer = () => {
  return (
    <div className="bg-slate-100 h-full">
      <HeaderMain />
      <ProductsList />
    </div>
  );
};
