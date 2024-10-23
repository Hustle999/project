"use client";
import Link from "next/link";

import { Cart } from "./main/components/Svgrepo";

export const Header = () => {
  return (
    <div className="flex flex-col w-full fixed z-10 bg-white">
      <header className="flex justify-between px-[100px] py-4 ">
        <Link className="flex gap-8 items-center" href={"/homepage"}>
          <img width={30} height={30} src="/Vector.png" alt="" />
          <div>Dashboard</div>
          <div>Products</div>
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-1 text-white ">
            <div>- Your Cart</div>
            <div className="w-6 h-6">
              <Cart />
            </div>
          </div>
          <div className="">
            <img
              className="rounded-full"
              width={50}
              height={50}
              src="../ProfilePic.jpeg"
              alt=""
            />
          </div>
        </div>
      </header>
    </div>
  );
};
