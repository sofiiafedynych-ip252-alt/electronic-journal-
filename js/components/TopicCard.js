/**
 * Компонент картки теми журналу (TopicCard)
 * Повертає готовий HTML-рядок для вставки в DOM
 */
export function TopicCard(topic) {
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