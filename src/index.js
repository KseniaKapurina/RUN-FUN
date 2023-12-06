import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Context } from "./Context";

import { fadeIn } from "react-animations";

import "./style/style.scss";

const App = lazy(() => import("./components/app/App"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const DelayedFallback = () => {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowFallback(false);
    }, 4000);

    return () => clearTimeout(delayTimeout);
  }, []);

  return showFallback ? <div className="fallback">Loading....</div> : null;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<DelayedFallback />}>
    <Router>
      <Context>
        <App />
      </Context>
      <ScrollToTop />
    </Router>
  </Suspense>
);
