import { TopicCard } from './components/TopicCard.js';

document.addEventListener('DOMContentLoaded', () => {
    const topicsListContainer = document.getElementById('topics-list');
    const searchInput = document.getElementById('search-input');
    const sortBtn = document.getElementById('sort-btn');

    let allTopics = [];
    let isSortedAsc = true;

    // Рендеринг за допомогою нашого компонента TopicCard
    function renderTopics(topicsToRender) {
        if (!topicsListContainer) return;
        topicsListContainer.innerHTML = '';

        if (topicsToRender.length === 0) {
            topicsListContainer.innerHTML = `<div style="color: #94a3b8; text-align: center; padding: 20px;">Нічого не знайдено за вашим запитом.</div>`;
            return;
        }

        // Сучасний мапінг масиву в HTML-компоненти
        const htmlContent = topicsToRender.map(topic => TopicCard(topic)).join('');
        topicsListContainer.innerHTML = htmlContent;
    }

    // Автономне завантаження локальної бази даних
    async function initDashboard() {
        // Перевіряємо localStorage або завантажуємо початковий JSON
        const localTopics = localStorage.getItem('journal-topics');
        
        if (localTopics && JSON.parse(localTopics).length > 0) {
            allTopics = JSON.parse(localTopics);
            renderTopics(allTopics);
        } else {
            try {
                // Використовуємо відносний шлях для Vite, щоб працювало всюди
                const response = await fetch('./public/data/topics.json');
                allTopics = await response.json();
                localStorage.setItem('journal-topics', JSON.stringify(allTopics));
                renderTopics(allTopics);
            } catch (error) {
                console.error("Помилка завантаження файлу тем:", error);
                if (topicsListContainer) {
                    topicsListContainer.innerHTML = `<div style="color: #ef4444; text-align: center; padding: 20px;">Помилка завантаження каталогу тем.</div>`;
                }
            }
        }
    }

    // Пошук
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const text = e.target.value.toLowerCase();
            const filtered = allTopics.filter(t => 
                t.title.toLowerCase().includes(text) || 
                t.description.toLowerCase().includes(text)
            );
            renderTopics(filtered);
        });
    }

    // Сортування
    if (sortBtn) {
        sortBtn.addEventListener('click', () => {
            isSortedAsc = !isSortedAsc;
            const sorted = [...allTopics].sort((a, b) => isSortedAsc ? a.lessons - b.lessons : b.lessons - a.lessons);
            sortBtn.innerText = isSortedAsc ? "Сортувати: Мін занять" : "Сортувати: Макс занять";
            renderTopics(sorted);
        });
    }

    initDashboard();
});