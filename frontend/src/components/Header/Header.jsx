import { useContext } from "react";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Header() {
  //location
  const location = useLocation();
  const { handleLogOut } = useContext(CurrentUserContext);

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />
      <div className="header__auth">
        {location.pathname === "/signup" && (
          <Link className="header__auth-link" to="/signin">
            Iniciar sesión
          </Link>
        )}
        {location.pathname === "/signin" && (
          <Link className="header__auth-link" to="/signup">
            Registrarse
          </Link>
        )}
        {location.pathname === "/" && (
          <Link
            className="header__auth-link"
            onClick={handleLogOut}
            to="/signin"
          >
            Cerrar sesión
          </Link>
        )}
      </div>
    </header>
  );
}
