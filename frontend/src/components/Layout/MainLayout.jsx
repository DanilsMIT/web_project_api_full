import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function MainLayout() {
  return (
    <div className="page">
      <Header />
      <main className="page__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
