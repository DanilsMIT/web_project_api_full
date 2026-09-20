import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function AuthLayout() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
