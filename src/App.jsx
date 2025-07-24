import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;
