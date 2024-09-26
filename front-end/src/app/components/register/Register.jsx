"use client";

import Link from "next/link";

export const Register = () => {
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
          <div className="font-semibold text-2xl">Create Geld account</div>
          <div>Sign up below to create your Wallet account</div>
        </div>
        <form className="flex flex-col w-[384px] gap-4">
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            placeholder="Username"
            type="text"
          />
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            placeholder="E-mail"
            type="password"
          />
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            placeholder="Password"
            type="password"
          />
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            placeholder="Re-Password"
            type="password"
          />
          <button className="w-full bg-blue-600 rounded-2xl p-3 text-white font-semibold">
            Sign up
          </button>
        </form>
        <div className="flex gap-3">
          <div>Already have account?</div>
          <Link href="/">
            <div className="text-blue-600">Log in</div>
          </Link>
        </div>
      </div>
      <div className="bg-blue-600"></div>
    </main>
  );
};
