import { useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/home.css";

const Home = () => {
    const theme = useSelector(state => state.ui.theme);
    
    useEffect(() => {
        console.log("Тема изменилась:", theme);
        document.body.className = theme;
    }, [theme]);

    console.log("Текущая тема в компоненте:", theme);

    return (
        <main className="home container">
            <h2>Главная страница</h2>
            <p>Добро пожаловать</p>
        </main>
    )
};

export default Home;


