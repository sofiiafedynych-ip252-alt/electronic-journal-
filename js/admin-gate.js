document.addEventListener('DOMContentLoaded', () => {
    const adminTopicsContainer = document.querySelector('.admin-topics-list') || document.getElementById('topics-list') || document.body;
    const addTopicForm = document.getElementById('add-topic-form');

    let allTopics = [];

    // Функція рендерингу для Адмінки (READ + DELETE з CRUD)
    function renderAdminTopics() {
        const listElement = document.getElementById('admin-topics-render-list') || adminTopicsContainer;
        if (!listElement) return;
        
        // Якщо це загальний контейнер, очистимо його, але збережемо заголовок
        listElement.innerHTML = '';

        if (allTopics.length === 0) {
            listElement.innerHTML = `<p style="color: #94a3b8;">Список тем порожній.</p>`;
            return;
        }

        allTopics.forEach(topic => {
            const item = document.createElement('div');
            item.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 15px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #334155;";
            item.innerHTML = `
                <span style="color: #fff; font-weight: 500;">
                    ${topic.title} <span style="color: #38bdf8;">(${topic.lessons} занять)</span>
                </span>
                <button class="delete-btn" data-id="${topic.id}" style="background-color: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: 600;">
                    Видалити
                </button>
            `;
            listElement.appendChild(item);
        });

        // Навішуємо події видалення (DELETE)
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = parseInt(e.target.getAttribute('data-id'));
                deleteTopic(idToDelete);
            });
        });
    }

    // Функція додавання теми (CREATE)
    if (addTopicForm) {
        addTopicForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('topic-title')?.value;
            const lessons = parseInt(document.getElementById('topic-lessons')?.value || 0);
            const description = document.getElementById('topic-description')?.value || "Без опису";

            if (!title) return;

            const newTopic = {
                id: Date.now(),
                title,
                description,
                lessons
            };

            allTopics.push(newTopic);
            localStorage.setItem('journal-topics', JSON.stringify(allTopics));
            renderAdminTopics();
            addTopicForm.reset();
            console.log('CRUD: Створено нову тему успішно.');
        });
    }

    // Функція видалення теми (DELETE)
    function deleteTopic(id) {
        allTopics = allTopics.filter(t => t.id !== id);
        localStorage.setItem('journal-topics', JSON.stringify(allTopics));
        renderAdminTopics();
        console.log(`CRUD: Тему з ID ${id} видалено.`);
    }

    // Ініціалізація даних
    function initAdmin() {
        const localTopics = localStorage.getItem('journal-topics');
        if (localTopics) {
            allTopics = JSON.parse(localTopics);
        } else {
            allTopics = [
                { id: 1, title: "Тематичний модуль 1. Основи роботи з Git та GitHub", lessons: 4 },
                { id: 2, title: "Тематичний модуль 2. Створення структури проєкту та HTML5-навігація", lessons: 4 },
                { id: 3, title: "Тематичний модуль 3. Стилізація інтерфейсу за допомогою CSS та адаптивність", lessons: 4 },
                { id: 4, title: "Тематичний модуль 4. Динамічний рендер елементів за допомогою JavaScript", lessons: 4 }
            ];
            localStorage.setItem('journal-topics', JSON.stringify(allTopics));
        }
        renderAdminTopics();
    }

    initAdmin();
});