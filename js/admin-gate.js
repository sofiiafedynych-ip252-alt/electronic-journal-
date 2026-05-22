document.addEventListener('DOMContentLoaded', () => {
    const addTopicForm = document.getElementById('add-topic-form');
    const feedbacksContainer = document.getElementById('feedbacks-list');
    const topicsAdminContainer = document.getElementById('topics-admin-list');

    // 1. РЕНДЕР ПОТОЧНИХ ТЕМ З КНОПКАМИ ВИДАЛЕННЯ
    function renderAdminTopics() {
        if (!topicsAdminContainer) return;
        const localTopics = JSON.parse(localStorage.getItem('journal-topics') || '[]');
        
        if (localTopics.length === 0) {
            topicsAdminContainer.innerHTML = '<p style="color: #64748b; font-style: italic;">Немає створених модулів.</p>';
            return;
        }

        topicsAdminContainer.innerHTML = localTopics.map((topic, index) => `
            <div style="background: #1e293b; padding: 15px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #334155;">
                <div>
                    <strong style="color: #fff;">${topic.title}</strong>
                    <span style="color: #38bdf8; font-size: 14px; margin-left: 10px;">(${topic.lessons} занять)</span>
                </div>
                <button class="delete-btn" data-index="${index}" style="background: #ef4444; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">Видалити</button>
            </div>
        `).join('');

        // Навішуємо події видалення
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                if (confirm('Ви дійсно хочете видалити цей тематичний модуль?')) {
                    let currentTopics = JSON.parse(localStorage.getItem('journal-topics') || '[]');
                    currentTopics.splice(idx, 1);
                    localStorage.setItem('journal-topics', JSON.stringify(currentTopics));
                    renderAdminTopics();
                }
            });
        });
    }

    // 2. ДОДАВАННЯ НОВОЇ ТЕМИ
    if (addTopicForm) {
        addTopicForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('topic-title');
            const descInput = document.getElementById('topic-description');
            const lessonsInput = document.getElementById('topic-lessons');

            if (!titleInput.value) return;

            const newTopic = {
                id: Date.now(),
                title: titleInput.value,
                description: descInput.value || "Без опису",
                lessons: parseInt(lessonsInput.value) || 4
            };

            let localTopics = JSON.parse(localStorage.getItem('journal-topics') || '[]');
            localTopics.push(newTopic);
            localStorage.setItem('journal-topics', JSON.stringify(localTopics));
            
            alert('Тематичний модуль успішно додано!');
            addTopicForm.reset();
            renderAdminTopics();
        });
    }

    // 3. ВИВЕДЕННЯ ПОВІДОМЛЕНЬ КОРИСТУВАЧІВ
    function renderIncomingFeedbacks() {
        if (!feedbacksContainer) return;
        const localFeedbacks = JSON.parse(localStorage.getItem('contacts-mirror') || '[]');

        if (localFeedbacks.length === 0) {
            feedbacksContainer.innerHTML = '<p style="color: #64748b; font-style: italic;">Повідомлень від користувачів поки що немає.</p>';
            return;
        }

        feedbacksContainer.innerHTML = localFeedbacks.map(fb => `
            <div style="background: #1e293b; padding: 15px; border-radius: 6px; margin-top: 12px; border: 1px solid #475569;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <strong style="color: #38bdf8;">${fb.name} (${fb.email})</strong>
                    <span style="color: #64748b; font-size: 12px;">${fb.date || ''}</span>
                </div>
                <p style="margin: 0; color: #cbd5e1; font-size: 14px;">${fb.message}</p>
            </div>
        `).join('');
    }

    renderAdminTopics();
    renderIncomingFeedbacks();
});