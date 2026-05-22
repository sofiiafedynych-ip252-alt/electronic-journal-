document.addEventListener('DOMContentLoaded', () => {
    // 1. ШУКАЄМО ЕЛЕМЕНТИ СТАТИСТИКИ НА ГОЛОВНІЙ СТОРІНЦІ
    const totalModulesEl = document.getElementById('total-modules');
    const totalLessonsEl = document.getElementById('total-lessons');

    // 2. ФУНКЦІЯ РОЗРАХУНКУ СТАТИСТИКИ
    function updateDashboardStatistics() {
        // Беремо масив тем, який ми редагуємо в адмінці
        const localTopics = JSON.parse(localStorage.getItem('journal-topics') || '[]');

        // Якщо елементи є на сторінці — рахуємо цифри
        if (totalModulesEl) {
            totalModulesEl.textContent = localTopics.length;
        }

        if (totalLessonsEl) {
            // Додаємо всі заняття з усіх модулів разом
            const totalLessons = localTopics.reduce((sum, topic) => sum + (parseInt(topic.lessons) || 0), 0);
            totalLessonsEl.textContent = totalLessons;
        }
    }

    // 3. ЗАНЯТТЯ 16: MISSION ALERTS (Спливаючі сповіщення при вході)
    function showWelcomeAlert() {
        // Створюємо красиве сповіщення внизу екрана
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #10b981;
            color: #fff;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-weight: bold;
            transition: all 0.5s ease;
            transform: translateY(100px);
            opacity: 0;
            z-index: 1000;
        `;
        alertBox.textContent = '🚀 Систему синхронізації та статистики успішно активовано!';
        document.body.appendChild(alertBox);

        // Анімація появи
        setTimeout(() => {
            alertBox.style.transform = 'translateY(0)';
            alertBox.style.opacity = '1';
        }, 100);

        // Автоматично ховаємо через 4 секунди
        setTimeout(() => {
            alertBox.style.transform = 'translateY(100px)';
            alertBox.style.opacity = '0';
            setTimeout(() => alertBox.remove(), 500);
        }, 4000);
    }

    // Запускаємо логіку головної сторінки
    updateDashboardStatistics();
    showWelcomeAlert();
});