import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuth } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [localErrors, setLocalErrors] = useState({});

  // Валидация формы перед отправкой
  const validateForm = () => {
    const errors = {};

    if (!form.email.trim()) {
      errors.email = "Email не может быть пустым";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Введите корректный email";
    }

    if (!form.password) {
      errors.password = "Пароль не может быть пустым";
    }

    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (error) {
      dispatch(clearError());
    }

    dispatch(login(form));
  };

  // Перенаправляем после успешного входа
  if (isAuth) {
    navigate("/");
    return null;
  }

  return (
    <div className="auth-container">
      <h2>Вход в аккаунт</h2>

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
            type="password"
            name="password"
            placeholder="Введите ваш пароль"
            value={form.password}
            onChange={handleChange}
            className={localErrors.password ? "error" : ""}
          />
          {localErrors.password && (
            <span className="auth-field-error">
              {localErrors.password}
            </span>
          )}
        </div>

        <button type="submit" className="auth-submit-btn">
          Войти
        </button>
      </form>

      <div className="auth-link">
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
};

export default Login;

