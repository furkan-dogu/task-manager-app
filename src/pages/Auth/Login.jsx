import { useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";
import AuthLayout from "../../layouts/AuthLayout";
import { Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../helpers/validateEmail";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useAuthCalls();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    login({ email, password });
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <AuthLayout>
        <div className="lg:w-[70%] sm:h-[calc(100%-64px)] h-auto flex flex-col justify-center py-[25%] sm:py-0">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Hoş Geldiniz
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-400 mt-[5px] mb-6">
            Giriş yapmak için lütfen bilgilerinizi girin
          </p>

          <form onSubmit={handleSubmit}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="E-posta Adresi"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Şifre"
              placeholder="Min 8 Karakter"
              type="password"
            />

            {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              GİRİŞ
            </button>

            <p className="text-[13px] text-slate-800 dark:text-slate-500 mt-3">
              Hesabınız yok mu?{" "}
              <Link
                className="font-medium text-primary underline"
                to={"/register"}
              >
                Kayıt Ol
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    );
  }
};

export default Login;
