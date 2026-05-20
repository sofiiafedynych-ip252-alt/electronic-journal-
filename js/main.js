// Чекаємо, поки вся сторінка завантажиться
document.addEventListener('DOMContentLoaded', () => {
    // Знаходимо контейнер, куди ми вставимо нашу картку
    const container = document.getElementById('stats-container');
    
    if (container) {
        // Створюємо HTML-структуру для картки статистики
        const cardHtml = `
            <div style="background-color: #334155; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #38bdf8;">
                <h3 style="color: #38bdf8; margin-top: 0;">📊 Поточна статистика журналу</h3>
                <p style="margin: 5px 0;"><strong>Усього тем у курсі:</strong> 4 модулі</p>
                <p style="margin: 5px 0;"><strong>Зареєстровано студентів:</strong> 25 (Група ІП-252)</p>
                <p style="margin: 5px 0;"><strong>Статус системи:</strong> Готова до виставлення оцінок</p>
            </div>
        `;
        
        // Вставляємо картку в наш HTML
        container.innerHTML = cardHtml;
    }
});