"use client";

import Link from "next/link";

export const Register = () => {
  const url = "https://project-data-api.onrender.com/sign-up";
  const onsubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: e.target.Username.value,
      mail: e.target.Email.value,
      password: e.target.Password.value,
    };
    const password = e.target.Password.value;
    const rePassword = e.target.RePassword.value;
    if (password !== rePassword) {
      alert("Password is not matched");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, options);
    const data = response.json();
  };

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
        <form className="flex flex-col w-[384px] gap-4" onSubmit={onsubmit}>
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            name="Username"
            placeholder="Username"
            type="text"
          />
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            name="Email"
            placeholder="E-mail"
            type="E-mail"
          />
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            name="Password"
            placeholder="Password"
            type="password"
          />
          <input
            className="w-full bg-slate-100 border rounded-lg p-3"
            name="RePassword"
            placeholder="Re-Password"
            type="password"
          />
          <Link href={"/"}>
            <button className="w-full bg-blue-600 rounded-2xl p-3 text-white font-semibold">
              Sign up
            </button>
          </Link>
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
