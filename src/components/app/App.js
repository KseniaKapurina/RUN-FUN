import { useContext } from "react";
import { CustomContext } from "../../Context";
import { Route, Routes, useLocation } from "react-router-dom";
import "../../i18n";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";
import {
  MainPage,
  GoodsPage,
  OneGoodPage,
  OrderPage,
  FinishPage,
  AccountPage,
  Page404,
} from "./../../pages";

function App() {
  const { addSuccess } = useContext(CustomContext);
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/login") ? (
        ""
      ) : (
        <Header />
      )}
      {addSuccess && <div className="notification">Товар успешно добавлен</div>}

      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/goods" element={<GoodsPage />} />
        <Route path="/onegood/:id" element={<OneGoodPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/login" element={<AccountPage />} />
        <Route path="/register" element={<AccountPage />} />
        <Route path="/order" element={<AccountPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>

      {location.pathname === "/login" ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/404") ? (
        ""
      ) : (
        <Footer />
      )}
    </>
  );
}

export default App;
