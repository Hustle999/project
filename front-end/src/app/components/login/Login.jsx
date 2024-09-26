"use client";

import Link from "next/link";

export const Login = () => {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="w-[25px] h-[25px]">
            <img src="./Vector.png" alt="" />
          </div>
          <div className="font-semibold text-2xl">Geld</div>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <div className="font-semibold text-2xl">Welcome Back</div>
          <div>Welcome back, Please enter your details</div>
        </div>
        <form className="flex flex-col w-[384px] gap-4">
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            placeholder="E-mail"
            type="text"
          />
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            placeholder="Password"
            type="password"
          />
          <button className="w-full bg-blue-600 rounded-2xl p-3 text-white font-semibold">
            Log in
          </button>
        </form>
        <div className="flex gap-3">
          <div>Don't have account?</div>
          <Link href="register">
            <div className="text-blue-600">Sign up</div>
          </Link>
        </div>
      </div>
      <div className="bg-blue-600"></div>
    </main>
  );
};
