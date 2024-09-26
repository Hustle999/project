"use client";
import Link from "next/link";
import { Register } from "../components/register/Register";

export const SignUp = () => {
  return (
    <main>
      <Link href="/">
        <button>
          <Register />;
        </button>
      </Link>
    </main>
  );
};
export default SignUp;
