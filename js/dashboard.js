import { fetchTopicsFromDB } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const topicsListContainer = document.getElementById('topics-list');
    const searchInput = document.getElementById('search-input');
    const sortBtn = document.getElementById('sort-btn');

    let allTopics = [];
    let isSortedAsc = true;

    // Функція для виведення тем на екран (рендер)
    function renderTopics(topicsToRender) {
        if (!topicsListContainer) return;
        topicsListContainer.innerHTML = '';

        if (topicsToRender.length === 0) {
            topicsListContainer.innerHTML = `<li style="color: #94a3b8; text-align: center;">Нічого не знайдено.</li>`;
            return;
        }

        topicsToRender.forEach(topic => {
            const topicItem = document.createElement('li');
            topicItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h3 style="margin: 0 0 5px 0;">
                            <a href="topic-detail.html?id=${topic.id}" style="color: #38bdf8; text-decoration: none;">
                                ${topic.title}
                            </a>
                        </h3>
                        <p style="margin: 0; color: #94a3b8; font-size: 14px;">${topic.description}</p>
                    </div>
                    <span style="background-color: #1e293b; color: #38bdf8; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold;">
                        ${topic.lessons} занять
                    </span>
                </div>
            `;
            topicsListContainer.appendChild(topicItem);
        });
    }

    // Головна функція ініціалізації з підтримкою Supabase
    async function initDashboard() {
        if (topicsListContainer) {
            topicsListContainer.innerHTML = `<li style="color: #38bdf8; text-align: center;">Синхронізація з хмарною базою даних Supabase...</li>`;
        }

        // 1. Пробуємо отримати свіжі дані з хмари Supabase
        const dbTopics = await fetchTopicsFromDB();

        if (dbTopics && dbTopics.length > 0) {
            console.log('Дані успішно завантажено з Supabase PostgreSQL!');
            allTopics = dbTopics;
            localStorage.setItem('journal-topics', JSON.stringify(allTopics));
            renderTopics(allTopics);
        } else {
            // 2. Фолбек (підстраховка) — якщо в базі порожньо, беремо з localStorage або локального JSON
            console.log('Хмара порожня або недоступна. Перемикаємось на локальне сховище...');
            const localTopics = localStorage.getItem('journal-topics');
            
            if (localTopics) {
                allTopics = JSON.parse(localTopics);
                renderTopics(allTopics);
            } else {
                try {
                    const response = await fetch('public/data/topics.json');
                    allTopics = await response.json();
                    localStorage.setItem('journal-topics', JSON.stringify(allTopics));
                    renderTopics(allTopics);
                } catch (error) {
                    console.error(error);
                    if (topicsListContainer) topicsListContainer.innerHTML = `<li style="color: #ef4444;">Помилка завантаження даних</li>`;
                }
            }
        }
    }

    // Пошук/фільтрація
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const text = e.target.value.toLowerCase();
            const filtered = allTopics.filter(t => t.title.toLowerCase().includes(text) || t.description.toLowerCase().includes(text));
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