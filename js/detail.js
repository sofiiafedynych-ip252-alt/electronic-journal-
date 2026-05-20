document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.getElementById('detail-container');
    const gradesTableBody = document.getElementById('grades-table-body');

    // 1. Отримуємо ID теми з URL-параметрів (наприклад: topic-detail.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = parseInt(urlParams.get('id'));

    // 2. Беремо теми з localStorage
    const topics = JSON.parse(localStorage.getItem('journal-topics')) || [];
    const currentTopic = topics.find(t => t.id === topicId);

    if (currentTopic && detailContainer) {
        // Виводимо інформацію про тему
        detailContainer.innerHTML = `
            <h1 style="color: #ffffff; margin-bottom: 10px;">${currentTopic.title}</h1>
            <p style="font-size: 16px; color: #e2e8f0; background-color: #334155; padding: 15px; border-radius: 6px;">
                <strong>Опис модуля:</strong> ${currentTopic.description}
            </p>
            <p style="color: #38bdf8;"><strong>Обсяг курсу:</strong> ${currentTopic.lessons} занять / лабораторних робіт</p>
        `;

        // 3. Генеруємо фейкові оцінки для демонстрації (імітація відомості групи ІП-252)
        const students = ["Алексєєв В.", "Бойко М.", "Васильєв Д.", "Гриценко О.", "Федунич С."];
        if (gradesTableBody) {
            gradesTableBody.innerHTML = '';
            students.forEach(student => {
                const labGrade = Math.floor(Math.random() * (50 - 30 + 1)) + 30; // 30-50 балів
                const testGrade = Math.floor(Math.random() * (50 - 30 + 1)) + 30; // 30-50 балів
                const total = labGrade + testGrade;

                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid #475569';
                tr.innerHTML = `
                    <td style="padding: 12px; color: white;"><strong>${student}</strong></td>
                    <td style="padding: 12px; color: #94a3b8;">${labGrade} / 50</td>
                    <td style="padding: 12px; color: #94a3b8;">${testGrade} / 50</td>
                    <td style="padding: 12px; color: #10b981; font-weight: bold;">${total} балів</td>
                `;
                gradesTableBody.appendChild(tr);
            });
        }
    } else if (detailContainer) {
        detailContainer.innerHTML = `<p style="color: #ef4444;">❌ Модуль не знайдено або ID вказано неправильно.</p>`;
    }
});