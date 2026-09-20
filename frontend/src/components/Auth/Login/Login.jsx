import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InfoTooltip from "../../popup/InfoTooltip/InfoTooltip";

export default function Login({ handleLogin }) {
  //inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //validador de boton
  const invalidate = email.trim() == "" || password.trim() == "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invalidate) {
      return;
    }
    handleLogin(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Login</h2>
      <form
        className="auth__form"
        id="auth-register-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="auth__input auth__input_type_email"
          id="register-email"
          name="register-email"
          placeholder="Correo electrónico"
          type="email"
          minLength="11"
          maxLength="254"
          onChange={handleEmailChange}
        />
        <div className="auth__input-container">
          <input
            className="auth__input auth__input_type_password"
            id="register-password"
            name="register-password"
            placeholder="Contraseña"
            minLength="8"
            maxLength="256"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className="auth__input-button"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "ocultar" : "mostrar"}
          </button>
        </div>

        <button
          className={`button auth__button ${invalidate ? "auth__button_disabled" : ""}`}
          type="submit"
        >
          Iniciar sesión
        </button>
        <div className="auth__sign-container">
          <p className="auth__sign-text">¿Aún no eres miembro?</p>
          <Link to="/signup" className="auth__sign-link">
            Registrate aquí
          </Link>
        </div>
      </form>
    </div>
  );
}
