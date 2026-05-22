document.addEventListener('DOMContentLoaded', () => {
    // 1. Отримуємо ID модуля з параметрів URL-адреси
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('id');

    // Шукаємо текстові блоки на сторінці для заміни даних
    const titleEl = document.getElementById('detail-title');
    const descEl = document.getElementById('detail-desc');
    const lessonsEl = document.getElementById('detail-lessons');
    const progressBar = document.getElementById('progress-bar');

    if (!topicId) {
        if (titleEl) titleEl.textContent = "Помилка: Модуль не знайдено";
        if (descEl) descEl.textContent = "Будь ласка, перейдіть на сторінку журналу та оберіть тему знову.";
        return;
    }

    // 2. Шукаємо потрібний модуль у localStorage
    const localTopics = JSON.parse(localStorage.getItem('journal-topics') || '[]');
    const currentTopic = localTopics.find(topic => topic.id == topicId);

    // 3. Якщо такий модуль існує — динамічно підставляємо дані
    if (currentTopic) {
        if (titleEl) titleEl.textContent = currentTopic.title;
        if (descEl) descEl.textContent = currentTopic.description || "Опис для цього модуля поки що відсутній.";
        if (lessonsEl) lessonsEl.textContent = `Всього заплановано: ${currentTopic.lessons || 4} занять`;
        
        // Робимо красиву анімацію прогрес-бару (графіка занять)
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 200);
        }
    } else {
        if (titleEl) titleEl.textContent = "Модуль відсутній";
        if (descEl) descEl.textContent = "Запитуваний модуль був видалений з бази даних адмін-панелі.";
    }
});