// Імпортуємо потрібні функції з нашого модуля роботи з даними
import { getUsers, saveUsers, getCurrentUser, getJournalTopics, saveJournalTopics, getAdminMessages } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Створюємо адміна за замовчуванням, використовуючи модуль
    let users = getUsers();
    if (!users.some(u => u.email === "teacher@journal.com")) {
        users.push({ email: "teacher@journal.com", password: "admin", role: "admin" });
        saveUsers(users);
    }

    const currentUser = getCurrentUser();

    // ГЕЙТ ДОСТУПУ
    if (!currentUser || currentUser.role !== 'admin') {
        const mainSection = document.querySelector('main');
        if (mainSection) {
            mainSection.innerHTML = `
                <div style="background-color: #ef4444; color: white; padding: 25px; border-radius: 8px; text-align: center;">
                    <h2>🛑 Доступ обмежено!</h2>
                    <p>Будь ласка, увійдіть як викладач (teacher@journal.com / admin).</p>
                    <a href="sign-in.html" style="display: inline-block; margin-top: 15px; background-color: white; color: #ef4444; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">Увійти</a>
                </div>
            `;
        }
        return;
    }

    // ЛОГІКА CRUD ДЛЯ ТЕМ ЖУРНАЛУ
    const addForm = document.getElementById('add-topic-form');
    const adminTopicsList = document.getElementById('admin-topics-list');
    const messagesList = document.getElementById('messages-list');

    function renderAdminTopics() {
        if (!adminTopicsList) return;
        const topics = getJournalTopics(); // Використовуємо модуль
        adminTopicsList.innerHTML = '';

        topics.forEach((topic, index) => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justify = 'space-between';
            li.style.alignItems = 'center';
            li.style.marginBottom = '10px';
            li.innerHTML = `
                <span><strong>${topic.title}</strong> (${topic.lessons} занять)</span>
                <button class="delete-btn" data-index="${index}" style="background-color: #ef4444; padding: 5px 10px; font-size: 12px; border: none; border-radius: 4px; color: white; cursor: pointer;">Видалити</button>
            `;
            adminTopicsList.appendChild(li);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                let currentTopics = getJournalTopics();
                currentTopics.splice(idx, 1);
                saveJournalTopics(currentTopics); // Використовуємо модуль
                renderAdminTopics();
            });
        });
    }

    // РЕНДЕР ПОВІДОМЛЕНЬ
    function renderMessages() {
        if (!messagesList) return;
        const messages = getAdminMessages(); // Використовуємо модуль
        messagesList.innerHTML = '';

        if (messages.length === 0) {
            messagesList.innerHTML = '<p style="color: #94a3b8;">Повідомлень від студентів немає.</p>';
            return;
        }

        messages.forEach(msg => {
            const div = document.createElement('div');
            div.style.backgroundColor = '#334155';
            div.style.padding = '15px';
            div.style.borderRadius = '6px';
            div.style.marginBottom = '15px';
            div.innerHTML = `
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #38bdf8;">📅 ${msg.date} | Від: <strong>${msg.name}</strong> (${msg.email})</p>
                <p style="margin: 0; color: white;">${msg.message}</p>
            `;
            messagesList.appendChild(div);
        });
    }

    if (addForm) {
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('new-title').value;
            const desc = document.getElementById('new-desc').value;
            const lessons = parseInt(document.getElementById('new-lessons').value);

            let currentTopics = getJournalTopics();
            currentTopics.push({ id: Date.now(), title: title, description: desc, lessons: lessons });

            saveJournalTopics(currentTopics); // Використовуємо модуль
            addForm.reset();
            renderAdminTopics();
            alert('Тему успішно додано у журнал!');
        });
    }

    renderAdminTopics();
    renderMessages();
});