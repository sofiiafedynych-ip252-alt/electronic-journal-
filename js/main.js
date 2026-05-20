document.addEventListener('DOMContentLoaded', () => {
    // Елементи для виведення статистики
    const totalModulesEl = document.getElementById('total-modules');
    const totalLessonsEl = document.getElementById('total-lessons');
    const alertContainer = document.getElementById('alert-container');

    // 1. ЛОГІКА MISSION ALERTS (Сповіщення)
    function showMissionAlert(message, type = 'info') {
        // Створюємо контейнер для алертів, якщо його немає в HTML
        let container = document.getElementById('mission-alert-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'mission-alert-container';
            container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000; display: flex; flex-direction: column; gap: 10px;';
            document.body.appendChild(container);
        }

        // Створюємо сам алерт
        const alert = document.createElement('div');
        const bgColors = {
            info: '#38bdf8',
            warning: '#f59e0b',
            success: '#4ade80'
        };

        alert.style.cssText = `
            background-color: #1e293b;
            color: ${bgColors[type] || '#fff'};
            border-left: 4px solid ${bgColors[type] || '#fff'};
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            font-family: sans-serif;
            font-size: 14px;
            font-weight: 500;
            min-width: 250px;
            transform: translateX(120%);
            transition: transform 0.4s ease;
        `;
        
        alert.innerText = message;
        container.appendChild(alert);

        // Анімація появи
        setTimeout(() => {
            alert.style.transform = 'translateX(0)';
        }, 100);

        // Автоматичне видалення через 4 секунди
        setTimeout(() => {
            alert.style.transform = 'translateX(120%)';
            setTimeout(() => alert.remove(), 400);
        }, 4000);
    }

    // Показываємо вітальне сповіщення при завантаженні
    setTimeout(() => {
        showMissionAlert('Систему електронного журналу успішно ініціалізовано!', 'success');
    }, 500);

    setTimeout(() => {
        showMissionAlert('Увага: Наближається дедлайн здачі фінального білду (Заняття 20)!', 'warning');
    }, 2000);


    // 2. ЛОГІКА СТАТИСТИКИ НА ГОЛОВНІЙ
    function calculateStatistics() {
        // Пробуємо витягнути теми з localStorage
        const localTopics = localStorage.getItem('journal-topics');
        
        let modulesCount = 0;
        let lessonsCount = 0;

        if (localTopics) {
            const topics = JSON.parse(localTopics);
            modulesCount = topics.length;
            lessonsCount = topics.reduce((sum, topic) => sum + (topic.lessons || 0), 0);
        } else {
            // Фолбек, якщо користувач ще не заходив у вкладку "Журнал"
            modulesCount = 4;
            lessonsCount = 23; // приблизна сума занять за замовчуванням
        }

        // Виводимо дані в блоки на сторінці, якщо вони існують
        if (totalModulesEl) totalModulesEl.innerText = modulesCount;
        if (totalLessonsEl) totalLessonsEl.innerText = lessonsCount;
        
        console.log(`Статистика оновлена: Модулів - ${modulesCount}, Занять - ${lessonsCount}`);
    }

    calculateStatistics();
});