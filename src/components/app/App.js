import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "../../i18n";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";
import {
  MainPage,

  GoodsPage,
  OneGoodPage,
  TeamPage,
  TeamMemberPage,
  OrderPage,
  FinishPage,
  AccountPage,
  Page404,
} from "./../../pages";

function App() {
  const [list, setList] = useState([]);
  const location = useLocation();

  return (
    <>
      <div className="global_container">
        <div className="content">
          <Header />

          <Routes>
            <Route path="/" element={<MainPage />} />
      
            <Route
              path="/goods"
              element={<GoodsPage list={list} setList={setList} />}
            />
            <Route path="/onegood/:id" element={<OneGoodPage list={list} />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/login" element={<AccountPage />} />
            <Route path="/register" element={<AccountPage />} />
            <Route path="/order" element={<AccountPage />} />
            <Route path="/finish" element={<FinishPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        {location.pathname === "/login" ||
        location.pathname.includes("/register") ||
        location.pathname.includes("/404") ? (
          ""
        ) : (
          <Footer />
        )}
      </div>
    </>
  );
}

export default App;
