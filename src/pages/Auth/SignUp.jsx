import { useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../helpers/validateEmail";
import AuthLayout from "../../layouts/AuthLayout";

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

  const handleChange = (field) => (e) => {
    const value = e.target?.files ? e.target.files[0] : e.target.value
    setData({ ...data, [field]: value })
  }

  const handleSignUp = (e) => {
    e.preventDefault();

    const { name, email, password, profileImageUrl, adminInviteToken } = data

    if (!name) {
      setError("Please enter a full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
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
  }

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={data.profileImageUrl} setImage={(file) => setData({ ...data, profileImageUrl: file })} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={data.name}
              onChange={handleChange("name")}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={data.email}
              onChange={handleChange("email")}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              value={data.password}
              onChange={handleChange("password")}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
            <Input
              value={data.adminInviteToken}
              onChange={handleChange("adminInviteToken")}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text"
            />
          </div>
          {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already an account?{" "}
            <Link className="font-medium text-primary underline" to={"/"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
