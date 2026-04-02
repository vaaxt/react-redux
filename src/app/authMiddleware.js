// Функция валидации email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Функция валидации пароля
const validatePassword = (password) => {
  // Минимум 6 символов, должна быть хотя бы одна цифра и буква
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

// Получение всех зарегистрированных пользователей
const getAllUsers = () => {
  const usersData = localStorage.getItem("users");
  return usersData ? JSON.parse(usersData) : [];
};

// Сохранение пользователей
const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const authMiddleware = (store) => (next) => (action) => {
  
  // Ловим регистрацию
  if (action.type === "auth/register") {
    const { email, password, confirmPassword } = action.payload;
    
    // Валидация email
    if (!email || !validateEmail(email)) {
      console.error("Ошибка: Введите корректный email");
      return next({
        type: "auth/setError",
        payload: "Введите корректный email"
      });
    }

    // Валидация пароля
    if (!password || !validatePassword(password)) {
      console.error("Ошибка: Пароль должен содержать минимум 6 символов, букву и цифру");
      return next({
        type: "auth/setError",
        payload: "Пароль должен содержать минимум 6 символов, букву и цифру"
      });
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      console.error("Ошибка: Пароли не совпадают");
      return next({
        type: "auth/setError",
        payload: "Пароли не совпадают"
      });
    }

    // Проверка наличия пользователя с таким email
    const users = getAllUsers();
    if (users.some(user => user.email === email)) {
      console.error("Ошибка: Пользователь с таким email уже зарегистрирован");
      return next({
        type: "auth/setError",
        payload: "Пользователь с таким email уже зарегистрирован"
      });
    }

    // Создание нового пользователя
    const newUser = {
      id: Date.now(),
      email,
      password, // В реальном приложении нужно хешировать!
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    console.log("Регистрация успешна:", email);
    
    // Передаём только безопасные данные в store
    return next({
      ...action,
      payload: {
        id: newUser.id,
        email: newUser.email
      }
    });
  }

  // Ловим логин
  if (action.type === "auth/login") {
    const { email, password } = action.payload;

    // Валидация email при входе
    if (!email || !validateEmail(email)) {
      console.error("Ошибка: Введите корректный email");
      return next({
        type: "auth/setError",
        payload: "Введите корректный email"
      });
    }

    // Валидация пароля при входе
    if (!password) {
      console.error("Ошибка: Введите пароль");
      return next({
        type: "auth/setError",
        payload: "Пароль не может быть пустым"
      });
    }

    // Поиск пользователя в базе (localStorage)
    const users = getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      console.error("Ошибка: Пользователь не найден");
      return next({
        type: "auth/setError",
        payload: "Пользователь не найден"
      });
    }

    // Проверка пароля
    if (user.password !== password) {
      console.error("Ошибка: Неверный пароль");
      return next({
        type: "auth/setError",
        payload: "Неверный пароль"
      });
    }

    console.log("Успешный вход:", email);
    
    // Одновляем localStorage текущего пользователя
    localStorage.setItem("currentUser", JSON.stringify({
      id: user.id,
      email: user.email,
      loginTime: new Date().toISOString()
    }));

    // Передаём только безопасные данные в store
    return next({
      ...action,
      payload: {
        id: user.id,
        email: user.email
      }
    });
  }

  // Обработка logout
  if (action.type === "auth/logout") {
    localStorage.removeItem("currentUser");
    console.log("Выход из системы");
  }

  return next(action);
};