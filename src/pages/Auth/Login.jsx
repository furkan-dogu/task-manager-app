import { useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";
import AuthLayout from "../../layouts/AuthLayout";
import { Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../helpers/validateEmail";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useAuthCalls();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError(null)

    login({ email, password });
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] sm:h-[calc(100%-64px)] h-auto flex flex-col justify-center py-[25%] sm:py-0">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to login
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className='text-xs text-red-500 pb-2.5'>{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to={"/signup"}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
