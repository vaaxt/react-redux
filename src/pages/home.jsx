import { useSelector } from "react-redux";

const Home = () => {
    const theme  = useSelector(state => state.ui.theme)

    return(
        <main style={{
            padding: "40px",
            minHeight: "60px",
            background: theme === "light"? "#fff": "#222",
            color: theme === 'light' ? "#000": "#fff"
        }}>

            <h2>Главная страница</h2>
            <p>Добро пожаловать на сайт REDUX!</p>

        </main>
    )
}

export default Home



