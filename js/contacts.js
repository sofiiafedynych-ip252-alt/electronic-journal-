document.addEventListener('DOMContentLoaded', () => {
    // 1. ШУКАЄМО ФОРМУ ЗВОРOТНОГО ЗВ'ЯЗКУ
    const feedbackForm = document.getElementById('feedback-form') || document.querySelector('form');

    if (!feedbackForm) {
        console.error("Форму зворотного зв'язку не знайдено на сторінці contacts.html");
        return;
    }

    // 2. ОБРОБКА ВІДПРАВКИ ФОРМИ
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Зупиняємо перезавантаження сторінки

        // Шукаємо поля введення
        const nameInput = document.getElementById('user-name') || document.querySelector('input[type="text"]');
        const emailInput = document.getElementById('user-email') || document.querySelector('input[type="email"]');
        const messageInput = document.getElementById('user-message') || document.querySelector('textarea');

        // Рядок для збору помилок
        let errors = [];

        // ВАЛІДАЦІЯ ПОЛІВ
        if (!nameInput || nameInput.value.trim().length < 2) {
            errors.push("Ім'я повинно містити не менше 2 символів.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
            errors.push("Будь ласка, вкажіть коректну адресу електронної пошти.");
        }

        if (!messageInput || messageInput.value.trim().length < 10) {
            errors.push("Повідомлення занадто коротке (мінімум 10 символів).");
        }

        // Якщо є помилки — виводимо їх і зупиняємо процес
        if (errors.length > 0) {
            alert("Помилка заповнення форми:\n\n" + errors.join("\n"));
            return;
        }

        // 3. ЗБЕРЕЖЕННЯ ПОВІДОМЛЕННЯ (Якщо валідація успішна)
        const newFeedback = {
            id: Date.now(),
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            date: new Date().toLocaleString('uk-UA') // Додаємо дату відправки
        };

        // Беремо старі повідомлення або створюємо новий масив
        let localFeedbacks = JSON.parse(localStorage.getItem('contacts-mirror') || '[]');
        localFeedbacks.push(newFeedback);
        
        // Зберігаємо в localStorage для адмінки
        localStorage.setItem('contacts-mirror', JSON.stringify(localFeedbacks));

        // Сповіщаємо користувача та очищаємо форму
        alert("✨ Дякуємо! Ваше повідомлення успішно надіслано адміністратору журналу.");
        feedbackForm.reset();
    });
});