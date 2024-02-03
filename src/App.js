import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { baseCurrencyThunk } from "./redux/operetion";
import { setBaseCurrency } from "./redux/slice";

const Home = lazy(() => import("./pages/Home"));
const Rates = lazy(() => import("./pages/Rates"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos) {
      const crd = pos.coords;
      dispatch(baseCurrencyThunk(crd));
    }
    function error(error) {
      dispatch(setBaseCurrency("USD"));
      console.warn(`ERROR ${error.code}:${error.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
