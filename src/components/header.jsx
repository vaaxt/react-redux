import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../features/ui/uiSlice";
import { logout } from "../features/auth/authSlice";
import "../styles/header.css";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, user } = useSelector(state => state.auth);
    
    console.log("Header state - isAuth:", isAuth, "user:", user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return(
        <header className="header"> 
            <div className="header-inner container">
                <div className="logo">Мой сайт на редукс</div>

                <nav className="nav">
                    <a href="/">Главная</a>
                    <a href="/">О нас</a>
                    <a href="/">Контакты</a>
                </nav>

                <div className="header-right">
                    <button
                        className="theme-btn"
                        onClick={ () => dispatch(toggleTheme()) } 
                    >
                        Сменить тему
                    </button>

                    {isAuth ? (
                        <div className="user-menu">
                            <span className="user-email">👤 {user?.email}</span>
                            <button 
                                onClick={handleLogout}
                                className="logout-btn"
                            >
                                Выход
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <a href="/login" className="btn-login">Вход</a>
                            <a href="/register" className="btn-register">Регистрация</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
