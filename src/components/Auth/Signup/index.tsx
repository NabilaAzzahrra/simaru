import Link from "next/link";
import { SignUpForm } from "../SignupForm";

export default function Signin() {
  return (
    <>
      <div>
        <SignUpForm />
      </div>

      <div className="mt-6 text-center">
        <p>
          have account?{" "}
          <Link href="/sign-in" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
