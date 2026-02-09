import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import InstrumentsList from "./pages/instrumentsList.jsx";
import InstrumentDetail from "./pages/instrumentsDetail.jsx";
import Home from "./pages/home.jsx";

function App() {
  return (
    <BrowserRouter>
  <Header />
  
  <Routes>
    <Route path="/" element={<InstrumentsList />} />
    <Route path="/instruments/:id" element={<InstrumentDetail />} />
  </Routes>
  
  <Footer />
</BrowserRouter>

  );
}

export default App;









