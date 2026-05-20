document.addEventListener('DOMContentLoaded', () => {
    const topicsListContainer = document.getElementById('topics-list');
    const searchInput = document.getElementById('search-input');
    const sortBtn = document.getElementById('sort-btn');

    let allTopics = [];
    let isSortedAsc = true;

    // Вбудована функція генерації картки (без імпорту)
    function createTopicCardHTML(topic) {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 15px; border-radius: 8px; margin-bottom: 12px; border: 1px solid #334155;">
                <div>
                    <h3 style="margin: 0 0 5px 0;">
                        <a href="topic-detail.html?id=${topic.id}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">
                            ${topic.title}
                        </a>
                    </h3>
                    <p style="margin: 0; color: #94a3b8; font-size: 14px;">${topic.description}</p>
                </div>
                <span style="background-color: #0f172a; color: #38bdf8; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #38bdf8;">
                    ${topic.lessons} занять
                </span>
            </div>
        `;
    }

    function renderTopics(topicsToRender) {
        if (!topicsListContainer) return;
        topicsListContainer.innerHTML = '';

        if (topicsToRender.length === 0) {
            topicsListContainer.innerHTML = `<div style="color: #94a3b8; text-align: center; padding: 20px;">Нічого не знайдено за вашим запитом.</div>`;
            return;
        }

        const htmlContent = topicsToRender.map(topic => createTopicCardHTML(topic)).join('');
        topicsListContainer.innerHTML = htmlContent;
    }

    async function initDashboard() {
        // Очищаємо localStorage, щоб примусово скинути старі забаговані шляхи
        localStorage.removeItem('journal-topics');
        
        try {
            // Пробуємо стандартний відносний шлях
            let response = await fetch('./public/data/topics.json');
            if (!response.ok) {
                // Якщо Vite підняв public як корінь, пробуємо альтернативний шлях
                response = await fetch('/data/topics.json');
            }
            
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