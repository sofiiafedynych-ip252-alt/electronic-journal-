// Модуль для централізованого керування даними в localStorage

// Функції для користувачів (Users)
export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
}

export function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export function removeCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Функції для тем журналу (Topics)
export function getJournalTopics() {
    return JSON.parse(localStorage.getItem('journal-topics')) || [];
}

export function saveJournalTopics(topics) {
    localStorage.setItem('journal-topics', JSON.stringify(topics));
}

// Функції для повідомлень (Feedback Messages)
export function getAdminMessages() {
    return JSON.parse(localStorage.getItem('admin-messages')) || [];
}

export function saveAdminMessages(messages) {
    localStorage.setItem('admin-messages', JSON.stringify(messages));
}