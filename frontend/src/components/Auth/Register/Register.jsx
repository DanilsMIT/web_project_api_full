import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InfoTooltip from "../../popup/InfoTooltip/InfoTooltip";

export default function Register({ handleRegister }) {
  //inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //errores
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.trim() == "") {
      setPassword("");
    } else if (!passwordRegex.test(e.target.value)) {
      setPasswordError(
        "La contraseña debe tener 8 caracteres, una mayúscula, un número y un carácter especial.",
      );
    } else {
      setPasswordError("");
    }
  };

  //validador de boton
  const invalidate =
    emailError !== "" ||
    passwordError !== "" ||
    email.trim() == "" ||
    password.trim() == "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invalidate) {
      return;
    }
    handleRegister(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Registrate</h2>
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
          minLength="11"
          maxLength="254"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <span className="auth__input-error_active auth__input-error">
          {emailError}
        </span>
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
        <span className="auth__input-error_active auth__input-error">
          {passwordError}
        </span>
        <button
          className={`button auth__button ${invalidate ? "auth__button_disabled" : ""}`}
          type="submit"
        >
          Registrarse
        </button>
        <div className="auth__sign-container">
          <p className="auth__sign-text">¿Ya eres miembro?</p>
          <Link to="/signin" className="auth__sign-link">
            Inicia sesión aquí
          </Link>
        </div>
      </form>
    </div>
  );
}
