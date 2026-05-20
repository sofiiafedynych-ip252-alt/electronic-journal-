import { fetchTopicsFromDB } from './supabase.js';
import { TopicCard } from './components/TopicCard.js'; // Імпортуємо наш новий компонент!

document.addEventListener('DOMContentLoaded', () => {
    const topicsListContainer = document.getElementById('topics-list');
    const searchInput = document.getElementById('search-input');
    const sortBtn = document.getElementById('sort-btn');

    let allTopics = [];
    let isSortedAsc = true;

    // Революційно чистий рендеринг через компоненти
    function renderTopics(topicsToRender) {
        if (!topicsListContainer) return;
        topicsListContainer.innerHTML = '';

        if (topicsToRender.length === 0) {
            topicsListContainer.innerHTML = `<div style="color: #94a3b8; text-align: center; padding: 20px;">Нічого не знайдено за вашим запитом.</div>`;
            return;
        }

        // Збираємо всі картки разом за допомогою нашого компонента
        const htmlContent = topicsToRender.map(topic => TopicCard(topic)).join('');
        topicsListContainer.innerHTML = htmlContent;
    }

    async function initDashboard() {
        if (topicsListContainer) {
            topicsListContainer.innerHTML = `<div style="color: #38bdf8; text-align: center; padding: 20px;">Синхронізація з хмарою...</div>`;
        }

        const dbTopics = await fetchTopicsFromDB();

        if (dbTopics && dbTopics.length > 0) {
            allTopics = dbTopics;
            localStorage.setItem('journal-topics', JSON.stringify(allTopics));
            renderTopics(allTopics);
        } else {
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
                    if (topicsListContainer) topicsListContainer.innerHTML = `<div>Помилка завантаження даних</div>`;
                }
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const text = e.target.value.toLowerCase();
            const filtered = allTopics.filter(t => t.title.toLowerCase().includes(text) || t.description.toLowerCase().includes(text));
            renderTopics(filtered);
        });
    }

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