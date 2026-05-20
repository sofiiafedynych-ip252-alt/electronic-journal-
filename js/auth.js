document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const toggleAuthLink = document.getElementById('toggle-auth');
    const authStatusDiv = document.getElementById('auth-status');

    let isLoginMode = true; // Перемикач: true = Вхід, false = Реєстрація

    // 1. ПЕРЕВІРКА: Чи користувач вже увійшов?
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (authStatusDiv) {
        if (currentUser) {
            // Якщо увійшов, показуємо вітання і кнопку виходу
            authStatusDiv.innerHTML = `
                <div style="background-color: #10b981; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; color: white;">👋 Вітаємо, <strong>${currentUser.email}</strong>!</p>
                    <button id="logout-btn" style="background-color: #ef4444; color: white; margin-top: 10px; padding: 5px 10px; font-size: 14px;">Вийти з акаунту</button>
                </div>
            `;
            if (authForm) authForm.style.display = 'none'; // Ховаємо форму

            // Логіка кнопки "Вийти"
            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                window.location.reload(); // Перезавантажуємо сторінку
            });
        }
    }

    // 2. ПЕРЕМИКАННЯ МІЖ ВХОДОМ І РЕЄСТРАЦІЄЮ
    if (toggleAuthLink) {
        toggleAuthLink.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;

            if (isLoginMode) {
                formTitle.innerText = "Авторизація (Вхід)";
                submitBtn.innerText = "Увійти";
                toggleAuthLink.innerText = "Немає акаунту? Зареєструватися";
            } else {
                formTitle.innerText = "Реєстрація нового користувача";
                submitBtn.innerText = "Створити акаунт";
                toggleAuthLink.innerText = "Вже є акаунт? Увійти";
            }
        });
    }

    // 3. ОБРОБКА ВІДПРАВКИ ФОРМИ (ВХІД АБО РЕЄСТРАЦІЯ)
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Отримуємо список всіх користувачів або створюємо новий масив
            let users = JSON.parse(localStorage.getItem('users')) || [];

            if (isLoginMode) {
                // ЛОГІКА ВХОДУ
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    alert('Вхід успішний!');
                    window.location.href = 'dashboard.html'; // Перенаправляємо в журнал
                } else {
                    alert('Невірний email або пароль!');
                }
            } else {
                // ЛОГІКА РЕЄСТРАЦІЇ
                const userExists = users.some(u => u.email === email);
                if (userExists) {
                    alert('Користувач з таким email вже існує!');
                    return;
                }

                // Створюємо нового користувача (за замовчуванням роль "student")
                const newUser = {
                    email: email,
                    password: password,
                    role: "student" 
                };

                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Акаунт успішно створено! Тепер ви можете увійти.');
                
                // Автоматично повертаємо на форму входу
                isLoginMode = true;
                formTitle.innerText = "Авторизація (Вхід)";
                submitBtn.innerText = "Увійти";
                toggleAuthLink.innerText = "Немає акаунту? Зареєструватися";
                authForm.reset();
            }
        });
    }
});