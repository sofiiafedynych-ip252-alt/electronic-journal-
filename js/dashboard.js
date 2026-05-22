document.addEventListener('DOMContentLoaded', () => {
    const topicsContainer = document.getElementById('topics-container') 
                         || document.getElementById('journal-grid')
                         || document.querySelector('.grid, .dashboard-grid, main div');

    function renderDashboardTopics() {
        if (!topicsContainer) return;

        const localTopics = JSON.parse(localStorage.getItem('journal-topics') || '[]');

        if (localTopics.length === 0) {
            topicsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b; font-style: italic;">
                    Журнал порожній. Додайте тематичні модулі в панелі Адмінки.
                </div>
            `;
            return;
        }

        topicsContainer.innerHTML = '';

        localTopics.forEach((topic, index) => {
            const card = document.createElement('div');
            
            card.style.cssText = `
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 8px;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            `;

            // УВАГА: тут змінено шлях на /topic-detail.html замість /detail.html
            card.innerHTML = `
                <div>
                    <span style="color: #64748b; font-size: 11px; font-weight: bold; text-transform: uppercase;">Модуль ${index + 1}</span>
                    <h3 style="margin: 8px 0 5px 0; color: #fff; font-size: 18px;">${topic.title}</h3>
                    <p style="color: #94a3b8; font-size: 14px; line-height: 1.5; margin: 0 0 15px 0;">${topic.description || 'Опис відсутній'}</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid #334155;">
                    <span style="color: #38bdf8; font-size: 14px; font-weight: 500;">⏱ ${topic.lessons} занять</span>
                    <a href="/topic-detail.html?id=${topic.id}" style="background: #334155; color: #fff; text-decoration: none; padding: 6px 12px; border-radius: 4px; font-size: 13px; font-weight: 500;">Читати далі →</a>
                </div>
            `;

            topicsContainer.appendChild(card);
        });
    }

    renderDashboardTopics();
});