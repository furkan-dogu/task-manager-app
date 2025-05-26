import { useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../helpers/validateEmail";
import AuthLayout from "../../layouts/AuthLayout";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profileImageUrl: null,
    adminInviteToken: "",
  });
  const [error, setError] = useState(null);

  const { register } = useAuthCalls();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (field) => (e) => {
    const value = e.target?.files ? e.target.files[0] : e.target.value;
    setData({ ...data, [field]: value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const { name, email, password, profileImageUrl, adminInviteToken } = data;

    if (!name) {
      setError("Lütfen ad soyad giriniz.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    if (!password) {
      setError("Lütfen şifreyi girin.");
      return;
    }

    if (password.length < 8) {
      setError("Şifre en az 8 karakterden oluşmalıdır.");
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("adminInviteToken", adminInviteToken);
    if (profileImageUrl) {
      formData.append("profileImageUrl", profileImageUrl);
    }

    register(formData);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <AuthLayout>
        <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Hesap Oluşturun
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-400 mt-[5px] mb-6">
            Aşağıya bilgilerinizi girerek bugün bize katılın.
          </p>

          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector
              image={data.profileImageUrl}
              setImage={(file) => setData({ ...data, profileImageUrl: file })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={data.name}
                onChange={handleChange("name")}
                label="Ad Soyad"
                placeholder="John"
                type="text"
              />
              <Input
                value={data.email}
                onChange={handleChange("email")}
                label="E-posta Adresi"
                placeholder="john@example.com"
                type="text"
              />
              <Input
                value={data.password}
                onChange={handleChange("password")}
                label="Şifre"
                placeholder="Min 8 Karakter"
                type="password"
              />
              <Input
                value={data.adminInviteToken}
                onChange={handleChange("adminInviteToken")}
                label="Admin Invite Token"
                placeholder="6 Haneli Kod"
                type="text"
              />
            </div>
            {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              KAYIT OL
            </button>

            <p className="text-[13px] text-slate-800 dark:text-slate-500 mt-3">
              Zaten bir hesabınız var mı?{" "}
              <Link className="font-medium text-primary underline" to={"/"}>
                Giriş
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    );
  }
};

export default SignUp;
