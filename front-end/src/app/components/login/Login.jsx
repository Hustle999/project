"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Login = () => {
  const url = "http://localhost:8888/sign-in";
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: e.target.name.value,
      password: e.target.password.value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      setSuccess(true);
      router.push("/homepage"); // Redirect to homepage on success
    } else {
      setSuccess(false);
      alert("Бүртгэлтэй хэрэглэгч биш байна");
    }
  };

  const handleLogin = () => {
    setSuccess(false);
  };

  useEffect(() => {}, [success]);

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
        <form
          className="flex flex-col w-[384px] gap-4"
          action=""
          onSubmit={onSubmit}
        >
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            name="name"
            placeholder="Name"
            type="text"
          />
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            name="password"
            placeholder="Password"
            type="password"
          />
          <button
            onClick={handleLogin}
            type="submit"
            className="w-full bg-blue-600 rounded-2xl p-3 text-white font-semibold"
          >
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
