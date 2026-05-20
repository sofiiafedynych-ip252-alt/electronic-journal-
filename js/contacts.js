document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Отримуємо значення з полів форми
            const name = document.getElementById('fb-name').value.trim();
            const email = document.getElementById('fb-email').value.trim();
            const message = document.getElementById('fb-message').value.trim();

            // Базова валідація
            if (!name || !email || !message) {
                alert('Будь ласка, заповніть усі поля форми.');
                return;
            }

            // Створюємо об'єкт нового повідомлення
            const newMessage = {
                id: Date.now(),
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleString('uk-UA')
            };

            // Завантажуємо існуючі повідомлення з localStorage або створюємо новий масив
            let messages = JSON.parse(localStorage.getItem('admin-messages')) || [];
            messages.push(newMessage);

            // Зберігаємо оновлений масив назад у сховище
            localStorage.setItem('admin-messages', JSON.stringify(messages));

            // Сповіщаємо користувача та очищаємо форму
            alert('Дякуємо! Ваше повідомлення успішно надіслано викладачу.');
            feedbackForm.reset();
        });
    }
});