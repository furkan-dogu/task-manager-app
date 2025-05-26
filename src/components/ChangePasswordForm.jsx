import { useState } from "react";
import Input from "./Inputs/Input";
import useAuthCalls from "../hooks/useAuthCalls";

const ChangePasswordForm = () => {
  const { updateUserPassword } = useAuthCalls();
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);

  const clearInputs = () => {
    setNewPassword("");
    setRepeatPassword("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Lütfen yeni şifreyi girin");
      return;
    }

    if (!repeatPassword) {
      setError("Lütfen yeni şifreyi tekrar girin");
      return;
    }

    if (newPassword !== repeatPassword) {
      setError("Yeni Şifreler uyuşmuyor");
      return;
    }

    if (newPassword.length < 8 || repeatPassword.length < 8) {
      setError("Şifre en az 8 karakterden oluşmalıdır.");
      return;
    }

    setError(null);

    if (newPassword === repeatPassword) {
      updateUserPassword(newPassword);
    }

    clearInputs();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto my-4">
      <Input 
        type="password" 
        onChange={(e) => setNewPassword(e.target.value)}
        label="Yeni Şifre"
        placeholder="Min 8 Karakter"   
        value={newPassword}   
      />
      <Input 
        type="password" 
        onChange={(e) => setRepeatPassword(e.target.value)}
        label="Yeni Şifre (Tekrar)"
        placeholder="Min 8 Karakter"   
        value={repeatPassword}   
      />
      {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}
      <button type="submit" className="btn-primary">Şifreyi Güncelle</button>
    </form>
  );
};

export default ChangePasswordForm;
