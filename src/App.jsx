import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/auth/authSlice";

import Header from "./components/Header";
import Footer from "./components/Footer";
import InstrumentsList from "./pages/instrumentsList.jsx";
import InstrumentDetail from "./pages/instrumentsDetail.jsx";
import Home from "./pages/home.jsx";
import Counter from "./pages/counter.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  const dispatch = useDispatch();

  // Проверяем наличие сохранённой сессии при загрузке приложения
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    console.log("Проверка сессии. currentUser:", currentUser); // для отладки
    
    if (currentUser) {
      try {
        const user = JSON.parse(currentUser);
        console.log("Восстанавливается пользователь:", user);
        dispatch(login(user));
      } catch (error) {
        console.error("Ошибка восстановления сессии:", error);
        localStorage.removeItem("currentUser");
      }
    } else {
      console.log("Сессия не найдена, пользователь не авторизован");
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
  <Header />
  
  <Routes>
    <Route path="/" element={<InstrumentsList />} />
    <Route path="/instruments/:id" element={<InstrumentDetail />} />
    <Route path="/counter" element={<Counter />}  />
    <Route path="/register" element={<Register />}  />
    <Route path="/login" element={<Login />}  />
  </Routes>
  
  <Footer />
</BrowserRouter>

  );
}

export default App;









