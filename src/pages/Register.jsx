import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Register = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuth } = useSelector(state => state.auth);

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [localErrors, setLocalErrors] = useState({});

    // Валидация password перед отправкой
    const validateForm = () => {
        const errors = {};

        if (!form.email.trim()) {
            errors.email = "Email не может быть пустым";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errors.email = "Введите корректный email";
        }

        if (!form.password) {
            errors.password = "Пароль не может быть пустым";
        } else if (form.password.length < 6) {
            errors.password = "Пароль должен содержать минимум 6 символов";
        } else if (!/[a-zA-Z]/.test(form.password)) {
            errors.password = "Пароль должен содержать букву";
        } else if (!/\d/.test(form.password)) {
            errors.password = "Пароль должен содержать цифру";
        }

        if (form.password !== form.confirmPassword) {
            errors.confirmPassword = "Пароли не совпадают";
        }

        setLocalErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        // Очищаем ошибку этого поля при изменении
        if (localErrors[name]) {
            setLocalErrors({
                ...localErrors,
                [name]: ""
            });
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        if (error) {
            dispatch(clearError());
        }

        dispatch(register(form));
    };

    // Перенаправляем после успешной регистрации
    if (isAuth) {
        navigate("/");
        return null;
    }

    return(
        <div className="auth-container">
            <h2>Создать аккаунт</h2>

            {error && (
                <div className="auth-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="auth-form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className={localErrors.email ? "error" : ""}
                    />
                    {localErrors.email && (
                        <span className="auth-field-error">
                            {localErrors.email}
                        </span>
                    )}
                </div>

                <div className="auth-form-group">
                    <label>Пароль</label>
                    <input 
                        name="password"
                        type="password"
                        placeholder="Придумайте сильный пароль"
                        value={form.password}
                        onChange={handleChange}
                        className={localErrors.password ? "error" : ""}
                    />
                    {localErrors.password && (
                        <span className="auth-field-error">
                            {localErrors.password}
                        </span>
                    )}
                    {!localErrors.password && form.password && (
                        <div className="auth-password-hint">
                            <strong>Требования:</strong>
                            ✓ Минимум 6 символов
                            <br/>
                            ✓ Содержит букву и цифру
                        </div>
                    )}
                </div>

                <div className="auth-form-group">
                    <label>Повторите пароль</label>
                    <input 
                        name="confirmPassword"
                        type="password"
                        placeholder="Повторите пароль"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={localErrors.confirmPassword ? "error" : ""}
                    />
                    {localErrors.confirmPassword && (
                        <span className="auth-field-error">
                            {localErrors.confirmPassword}
                        </span>
                    )}
                </div>

                <button type="submit" className="auth-submit-btn">
                    Зарегистрироваться
                </button>
            </form>

            <div className="auth-link">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </div>
        </div>
    );
};

export default Register;
